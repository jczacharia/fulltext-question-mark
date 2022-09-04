/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { MikroORM, wrap } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Test } from './app/test.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const orm = app.get(MikroORM);
  await orm.getSchemaGenerator().ensureDatabase();
  await orm.getSchemaGenerator().dropSchema();
  await orm.getSchemaGenerator().updateSchema();

  const em = orm.em.fork();

  const test = em.create(Test, {});

  await em.persistAndFlush(test);

  const testGet = await em.findOneOrFail(Test, 1);

  wrap(testGet).assign({
    clientFirstName: 'Janet?',
    clientLastName: 'Smith',
  });

  await em.persistAndFlush(testGet);

  const testGet2 = await em.findOneOrFail(Test, 1);
  console.log(testGet2);

  await app.listen(3000);
}

bootstrap();

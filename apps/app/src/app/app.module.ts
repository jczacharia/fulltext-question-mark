import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CaseHistorySubscriber } from './subscriber';
import { TestHistory } from './test-history.entity';
import { Test } from './test.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: 'mikro-orm-nest-ts',
      type: 'postgresql',
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: '1Qazxsw2',
      entities: [Test, TestHistory],
    }),
  ],
  providers: [CaseHistorySubscriber],
})
export class AppModule {}

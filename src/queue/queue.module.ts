import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { ConfigService } from '@/shared/config/config.service'

import { BullQueueRepository } from './bull-queue.repository'
import { queueNames } from './queue.constants'
import { QueueRepository } from './queue.repository'

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
        },
      }),
    }),
    ...queueNames.map((name) => BullModule.registerQueue({ name })),
  ],
  providers: [{ provide: QueueRepository, useClass: BullQueueRepository }],
  exports: [QueueRepository],
})
export class QueueModule {}

import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue as BullQueue } from 'bull'

import { QueueRepository } from './queue.repository'

@Injectable()
export class BullQueueRepository implements QueueRepository {
  constructor(
    @InjectQueue('reports')
    private readonly reportsQueue: BullQueue,
  ) {}

  async add<T>(name: string, data: T): Promise<void> {
    // TODO Map queue by event name
    await this.reportsQueue.add(name, data)
  }
}

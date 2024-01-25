import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

import { Config } from './config.schema'

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService<Config, true>) {}

  get<K extends keyof Config>(key: K): Config[K] {
    return this.config.get(key)
  }
}

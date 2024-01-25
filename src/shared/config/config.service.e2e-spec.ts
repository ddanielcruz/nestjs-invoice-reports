import { Test, TestingModule } from '@nestjs/testing'

import { ConfigModule } from './config.module'
import { ConfigService } from './config.service'

describe('ConfigService', () => {
  let sut: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile()

    sut = module.get<ConfigService>(ConfigService)
  })

  it('should return the value of the environment variable', () => {
    expect(sut.get('PORT')).toBeTruthy()
    expect(sut.get('NODE_ENV')).toBeTruthy()
  })
})

import { Test, TestingModule } from '@nestjs/testing'

import { EnvModule } from './env.module'
import { EnvService } from './env.service'

describe('EnvService', () => {
  let service: EnvService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvModule],
    }).compile()

    service = module.get<EnvService>(EnvService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return the value of the environment variable', () => {
    expect(service.get('PORT')).toBeTruthy()
    expect(service.get('NODE_ENV')).toBeTruthy()
  })
})

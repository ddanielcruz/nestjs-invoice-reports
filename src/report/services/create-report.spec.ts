import { QueueEvent } from '@/queue/queue.constants'
import { QueueRepository } from '@/queue/queue.repository'
import { makeReport } from '@/test/factories/report-factory'
import { InMemoryReportsRepository } from '@/test/repositories/in-memory-reports-repository'

import { CreateReport, CreateReportRequest } from './create-report'
import { ReportsRepository } from '../report.repository'

class QueueRepositoryStub implements QueueRepository {
  async add(): Promise<void> {}
}

describe('CreateReport', () => {
  let sut: CreateReport
  let reportsRepository: ReportsRepository
  let queueRepository: QueueRepository

  const validRequest: CreateReportRequest = {
    userId: 'any-user-id',
    url: 'https://example.com',
  }

  beforeEach(() => {
    reportsRepository = new InMemoryReportsRepository()
    queueRepository = new QueueRepositoryStub()
    sut = new CreateReport(reportsRepository, queueRepository)
  })

  it('creates a new report', async () => {
    const createSpy = jest.spyOn(reportsRepository, 'create')
    await sut.execute(validRequest)
    expect(createSpy).toHaveBeenCalledWith(validRequest)
  })

  it('queues report to be processed', async () => {
    const report = makeReport()
    jest.spyOn(reportsRepository, 'create').mockResolvedValueOnce(report)
    const addSpy = jest.spyOn(queueRepository, 'add')
    await sut.execute(validRequest)
    expect(addSpy).toHaveBeenCalledWith(QueueEvent.ProcessReport, {
      reportId: report.id,
    })
  })

  it('returns the created report on success', async () => {
    const report = makeReport()
    jest.spyOn(reportsRepository, 'create').mockResolvedValueOnce(report)
    const response = await sut.execute(validRequest)
    expect(response).toEqual({ report })
  })
})

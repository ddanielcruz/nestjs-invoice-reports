export enum ReportStatus {
  pending = 'pending',
  processing = 'processing',
  completed = 'completed',
  failed = 'failed',
}

export interface Report {
  id: string
  userId: string
  url: string
  status: ReportStatus
  createdAt: Date
}

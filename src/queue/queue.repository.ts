// TOD Add type safety for events and payloads
export abstract class QueueRepository {
  abstract add<T extends object = object>(name: string, data: T): Promise<void>
}

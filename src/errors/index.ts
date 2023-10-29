export class NetworkError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
  }
}
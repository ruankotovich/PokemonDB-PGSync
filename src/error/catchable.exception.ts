export default class CatchableException extends Error {
  public name: string;

  public status: number;

  constructor(message: string, { name = 'CatchableException', status = 400 }: {name?: string; status?: number} = { name: 'CatchableException', status: 400 }) {
    super(message);
    this.name = name;
    this.status = status || 400;
  }
}

export default class clientError extends Error {
  constructor(message: string, name: string = "clientError") {
    super(message);
    this.name = name;
  }
}

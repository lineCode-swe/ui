export class Position {

  constructor(
    private readonly x: number,
    private readonly y: number,
  ) {}

  toString(): string {
    return '(' + this.x + ';' + this.y + ')';
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}

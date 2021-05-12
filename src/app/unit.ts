import {Position} from "./position";
import {UnitStatus} from "./unit-status.enum";

export class Unit {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly base: Position,
    private status: UnitStatus,
    private error: number = 0,
    private speed: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBase(): Position {
    return this.base;
  }

  getStatus(): UnitStatus {
    return this.status;
  }

  setStatus(status: UnitStatus) {
    this.status = status;
  }

  getError(): number {
    return this.error;
  }

  setError(error: number) {
    this.error = error;
  }

  getSpeed(): string {
    return this.speed;
  }

  setSpeed(speed: string) {
    this.speed = speed;
  }
}

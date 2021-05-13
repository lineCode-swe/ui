/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {UnitStopCommand} from "./unit-stop-command.enum";

export class UnitStopToServer {
  constructor(
    private readonly unitId: string,
    private readonly command: UnitStopCommand,
  ) {}

  getUnitId(): string {
    return this.unitId;
  }

  getCommand(): UnitStopCommand {
    return this.command;
  }
}

/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Position } from './position';

describe('Position', () => {
  const x: number = Math.random();
  const y: number = Math.random();
  const p: Position = new Position(x, y);

  it('should create an instance', () => {
    expect(p).toBeTruthy();
  });

  it('should return a string formatted like "(x;y)"', () => {
    expect(p.toString()).toEqual('(' + x + ';' + y + ')');
  });

  it('should return x position', () => {
    expect(p.getX()).toEqual(x);
  });

  it('should return y position', () => {
    expect(p.getY()).toEqual(y);
  });
});

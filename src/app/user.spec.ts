/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import { User } from './user';

describe('User', () => {
  const u: string = 'hiyajo';
  const a: boolean = true;
  const user: User = new User(u, a);

  it('should create an instance', () => {
    expect(u).toBeTruthy();
  });

  it('should return have username "hiyajo"', () => {
    expect(user.getUsername()).toEqual(u);
  });

  it('should be admin', () => {
    expect(user.getAdmin()).toEqual(a);
  });
});

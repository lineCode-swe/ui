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

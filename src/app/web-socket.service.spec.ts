/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {WebSocketService} from './web-socket.service';
import {AuthStatus} from "./auth-status.enum";
import {User} from "./user";
import {Unit} from "./unit";
import {Position} from "./position";
import {Cell} from "./cell";
import {Direction} from "./direction.enum";
import {UnitStatus} from "./unit-status.enum";

describe('WebSocketService', () => {
  let service: WebSocketService;
  let spySocket: any;
  let spyMap: any;
  let spySubject: any;
  let spyLog: any;
  let fakeUnit: Unit;

  beforeEach(() => {
    spySocket = jasmine.createSpyObj('WebSocketSubject', ['next', 'subscribe']);
    spyMap = jasmine.createSpyObj('Map', ['set', 'get', 'clear', 'has', 'values']);
    spySubject = jasmine.createSpyObj('Subject', ['next']);
    spyLog = spyOn(console, 'log').and.callThrough();
    fakeUnit = new Unit('unit1', 'one', new Position(0, 0));

    service = new WebSocketService(
      spyMap,
      spyMap,
      spyMap,
      spySubject,
      spySubject,
      spySubject,
      spySubject,
      spySocket,
    )
  });

  it('should be created [TU1]', () => {
    expect(service).toBeTruthy();

    expect(spySocket.subscribe).toHaveBeenCalledTimes(1);
  });

  it('should receive a "KeepAliveFromServer" and do nothing [TU2]', () => {
    service.onMessage({
      type: 'KeepAliveFromServer',
    });

    expect(service.getAuthStatus()).toEqual(AuthStatus.NO_AUTH);
    expect(spyMap.get).not.toHaveBeenCalled();
    expect(spyMap.set).not.toHaveBeenCalled();
    expect(spySocket.next).not.toHaveBeenCalled();
    expect(spySubject.next).not.toHaveBeenCalled();
  });

  it('should receive a "AuthFromServer" and change authStatus to "ADMIN" [TU3]', () => {
    service.onMessage({
      type: 'AuthFromServer',
      session: 'ADMIN',
    });

    expect(service.getAuthStatus()).toEqual(AuthStatus.ADMIN);
  });

  it('should receive a "UsersFromServer" and update internal User data structure [TU4]', () => {
    let msg = {
      type: 'UsersFromServer',
      users: [
        {
          username: 'hiyajo',
          admin: false,
        },
        {
          username: 'essepi',
          admin: true,
        },
      ]
    }

    let user1: User = new User('hiyajo', false);
    let user2: User = new User('essepi', true);
    spyMap.values.and.returnValue([user1, user2]);

    service.onMessage(msg);

    expect(spyMap.clear).toHaveBeenCalledTimes(1);
    expect(spyMap.set).toHaveBeenCalledTimes(2);
    expect(spyMap.set.calls.argsFor(0)).toEqual(['hiyajo', user1]);
    expect(spyMap.set.calls.argsFor(1)).toEqual(['essepi', user2]);
    expect(spySubject.next).toHaveBeenCalledOnceWith([user1, user2]);
  })

  it('should receive a "UnitsFromServer" and update internal Unit data structure [TU5]', () => {
    let msg = {
      type: 'UnitsFromServer',
      units: [
        {
          id: 'unit1',
          name: 'one',
          base: {
            x: 0,
            y: 0,
          },
        },
        {
          id: 'unit2',
          name: 'two',
          base: {
            x: 420,
            y: 24,
          },
        }
      ]
    }

    let unit1: Unit = new Unit('unit1', 'one', new Position(0, 0));
    let unit2: Unit = new Unit('unit2', 'two', new Position(420, 24));
    spyMap.values.and.returnValue([unit1, unit2]);

    service.onMessage(msg);

    expect(spyMap.clear).toHaveBeenCalledTimes(1);
    expect(spyMap.set).toHaveBeenCalledTimes(2);
    expect(spyMap.set.calls.argsFor(0)).toEqual(['unit1', unit1]);
    expect(spyMap.set.calls.argsFor(1)).toEqual(['unit2', unit2]);
    expect(spySubject.next).toHaveBeenCalledOnceWith([unit1, unit2]);
  });

  it('should receive a "MapFromServer" and update internal Cell data structure [TU6]', () => {
    let msg = {
      type: 'MapFromServer',
      map: {
        length: 2,
        height: 2,
        cells: [
          {
            position: {
              x: 0,
              y: 0,
            },
            locked: false,
            poi: false,
            base: false,
            direction: 'ALL',
          },
          {
            position: {
              x: 1,
              y: 0,
            },
            locked: true,
            poi: true,
            base: false,
            direction: 'RIGHT',
          },
          {
            position: {
              x: 0,
              y: 1,
            },
            locked: false,
            poi: false,
            base: true,
            direction: 'LEFT',
          },
          {
            position: {
              x: 1,
              y: 1,
            },
            locked: true,
            poi: true,
            base: true,
            direction: 'UP',
          },
        ]
      }
    }

    let cell0: Cell = new Cell(new Position(0, 0), false, false, false, Direction.ALL);
    let cell1: Cell = new Cell(new Position(1, 0), true, true, false, Direction.RIGHT);
    let cell2: Cell = new Cell(new Position(0, 1), false, false, true, Direction.LEFT);
    let cell3: Cell = new Cell(new Position(1, 1), true, true, true, Direction.UP);
    spyMap.values.and.returnValue([cell0, cell1, cell2, cell3]);

    service.onMessage(msg);

    expect(spyMap.clear).toHaveBeenCalledTimes(1);
    expect(spyMap.set).toHaveBeenCalledTimes(4);
    expect(spyMap.set.calls.argsFor(0)).toEqual([new Position(0, 0), cell0]);
    expect(spyMap.set.calls.argsFor(1)).toEqual([new Position(1, 0), cell1]);
    expect(spyMap.set.calls.argsFor(2)).toEqual([new Position(0, 1), cell2]);
    expect(spyMap.set.calls.argsFor(3)).toEqual([new Position(1, 1), cell3]);
    expect(spySubject.next).toHaveBeenCalledOnceWith([cell0, cell1, cell2, cell3]);
    expect(service.getMapHeight()).toEqual(2);
    expect(service.getMapLength()).toEqual(2);
  });

  it('should receive a "UnitStatusFromServer" with a known id, status "ERROR" and change internal data [TU7]',
    () => {
    let msg = {
      type: 'UnitStatusFromServer',
      id: 'unit1',
      status: 'ERROR',
    }

    spyMap.get.and.returnValue(fakeUnit);
    spyMap.has.and.returnValue(true);
    spyMap.values.and.returnValue([fakeUnit]);

    service.onMessage(msg);

    expect(spyMap.has).toHaveBeenCalledTimes(1);
    expect(spyMap.get).toHaveBeenCalledOnceWith('unit1');
    expect(fakeUnit.getStatus()).toEqual(UnitStatus.ERROR);
    expect(spySubject.next).toHaveBeenCalledOnceWith([fakeUnit]);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should receive a "UnitPoiFromServer" with a known id, list of POI and change internal data [TU8]',
    () => {
    let msg = {
      type: 'UnitPoiFromServer',
      id: 'unit1',
      poi: [
        {
          x: 5,
          y: 6,
        },
        {
          x: 7,
          y: 8,
        }
      ],
    }

    spyMap.get.and.returnValue(fakeUnit);
    spyMap.has.and.returnValue(true);
    spyMap.values.and.returnValue([fakeUnit]);

    service.onMessage(msg);

    expect(spyMap.has).toHaveBeenCalledTimes(1);
    expect(spyMap.get).toHaveBeenCalledOnceWith('unit1');
    expect(fakeUnit.getPoiList()).toEqual([
      new Position(5, 6),
      new Position(7, 8),
    ]);
    expect(spySubject.next).toHaveBeenCalledOnceWith([fakeUnit]);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should receive a "UnitSpeedFromServer" with a known id, a new speed value and change internal data [TU9]',
    () => {
    let msg = {
      type: 'UnitSpeedFromServer',
      id: 'unit1',
      speed: 42,
    }

    spyMap.get.and.returnValue(fakeUnit);
    spyMap.has.and.returnValue(true);
    spyMap.values.and.returnValue([fakeUnit]);

    service.onMessage(msg);

    expect(spyMap.has).toHaveBeenCalledTimes(1);
    expect(spyMap.get).toHaveBeenCalledOnceWith('unit1');
    expect(fakeUnit.getSpeed()).toEqual(42);
    expect(spySubject.next).toHaveBeenCalledOnceWith([fakeUnit]);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should receive a "UnitErrorFromServer" with a known id, a new error code and change internal data [TU10]',
    () => {
    let msg = {
      type: 'UnitErrorFromServer',
      id: 'unit1',
      error: 42,
    }

    spyMap.get.and.returnValue(fakeUnit);
    spyMap.has.and.returnValue(true);
    spyMap.values.and.returnValue([fakeUnit]);

    service.onMessage(msg);

    expect(spyMap.has).toHaveBeenCalledTimes(1);
    expect(spyMap.get).toHaveBeenCalledOnceWith('unit1');
    expect(fakeUnit.getError()).toEqual(42);
    expect(spySubject.next).toHaveBeenCalledOnceWith([fakeUnit]);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should receive a "UnitPosFromServer" with a known id, a new current position and change internal data (unit and grid) [TU11]',
    () => {
    let msg = {
      type: 'UnitPosFromServer',
      id: 'unit1',
      position: {
        x: 0,
        y: 1,
      },
    }

    let oldPosition: Position = fakeUnit.getPosition();
    let newPosition: Position = new Position(0, 1);
    let fakeCellInOldPosition: Cell = new Cell(oldPosition, false, false, false,
      Direction.ALL, false, fakeUnit.getId());
    let fakeCellInNewPosition: Cell = new Cell(newPosition, false, false, false);

    spyMap.get.and.returnValues(fakeUnit, fakeCellInOldPosition, fakeCellInNewPosition);
    spyMap.has.and.returnValue(true);
    spyMap.values.and.returnValues([fakeCellInOldPosition, fakeCellInNewPosition], [fakeUnit])

    service.onMessage(msg);

    expect(spyMap.has).toHaveBeenCalledTimes(1);
    expect(spyMap.get).toHaveBeenCalledTimes(3);
    expect(spyMap.get).toHaveBeenCalledWith('unit1');
    expect(spyMap.get).toHaveBeenCalledWith(oldPosition);
    expect(spyMap.get).toHaveBeenCalledWith(newPosition);
    expect(fakeUnit.getPosition()).toEqual(newPosition);
    expect(fakeCellInOldPosition.getUnit()).toEqual('');
    expect(fakeCellInNewPosition.getUnit()).toEqual('unit1');
    expect(spySubject.next).toHaveBeenCalledTimes(2);
    expect(spySubject.next.calls.argsFor(0)).toEqual([[fakeCellInOldPosition, fakeCellInNewPosition]]);
    expect(spySubject.next.calls.argsFor(1)).toEqual([[fakeUnit]]);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should receive a "Unit*FromServer" with unknown id, not change internal data and print error message [TU12]',
    () => {
    [
      'UnitStatusFromServer',
      'UnitPoiFromServer',
      'UnitSpeedFromServer',
      'UnitErrorFromServer',
      'UnitPosFromServer',
    ].forEach(currentType => {
      let msg = {
        type: currentType,
        id: 'unit5',
      }

      spyMap.has.calls.reset();
      spyMap.get.calls.reset();
      spySubject.next.calls.reset();
      spyLog.calls.reset();

      spyMap.has.and.returnValue(false);

      service.onMessage(msg);

      expect(spyMap.has).toHaveBeenCalledTimes(1);
      expect(spyMap.get).not.toHaveBeenCalled();
      expect(spySubject.next).not.toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledOnceWith('Unit with ID: unit5 has been requested but not found');
    });
  });

  it('should send a login request through socket by giving an obj with username and password [TU13]',
    () => {
    service.login('essepi78', 'TheRightPwd');

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'LoginToServer',
      user: 'essepi78',
      password: 'TheRightPwd',
    }));
  });

  it('should send a logout request through socket by giving an obj with username [TU14]', () => {
    service.logout();

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'LogoutToServer',
    }));
  });

  it('should send two new user request through socket by giving an obj with user data [TU15]', () => {
    service.addUser('hiyajo', '123', false);
    service.addUser('FunkyGallo', '456', true);

    expect(spySocket.next).toHaveBeenCalledTimes(2);
    expect(spySocket.next).toHaveBeenCalledWith(JSON.stringify({
      type: 'UserToServer',
      user: 'hiyajo',
      password: '123',
      admin: false,
    }));
    expect(spySocket.next).toHaveBeenCalledWith(JSON.stringify({
      type: 'UserToServer',
      user: 'FunkyGallo',
      password: '456',
      admin: true,
    }));
  });

  it('should send a delete user request through socket by giving an obj with username [TU16]', () => {
    service.deleteUser('essepi78');

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'DeleteUserToServer',
      user: 'essepi78',
    }));
  });

  it('should send an add unit request through socket by giving an obj with unit data [TU17]', () => {
    service.addUnit('unit1', 'one', new Position(42, 240));

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'UnitToServer',
      id: 'unit1',
      name: 'one',
      base: {
        x: 42,
        y: 240,
      },
    }));
  });

  it('should send a delete unit request through socket by giving an obj with unit id [TU18]', () => {
    service.deleteUnit('unit1')

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'DeleteUnitToServer',
      id: 'unit1',
    }));
  });

  it('should send a start unit request through socket by giving an obj with id and poi list [TU19]', () => {
    service.start('unit1', [
      new Position(7, 8),
      new Position(9, 10),
    ])

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'UnitStartToServer',
      id: 'unit1',
      poiList: [
        {
          x: 7,
          y: 8,
        },
        {
          x: 9,
          y: 10,
        },
      ],
    }));
  });

  it('should send a stop unit request through socket by giving an obj with unit id and stop command [TU20]',
    () => {
    service.stop('unit1')

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'UnitStopToServer',
      id: 'unit1',
      command: 'STOP',
    }));
  });

  it('should send a shutdown unit request through socket by giving an obj with unit id and shutdown command [TU21]',
  () => {
    service.shutdown('unit1')

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'UnitStopToServer',
      id: 'unit1',
      command: 'SHUTDOWN',
    }));
  });

  it('should send a goback unit request through socket by giving an obj with unit id and goback command [TU22]',
  () => {
    service.goBack('unit1')

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'UnitStopToServer',
      id: 'unit1',
      command: 'BASE',
    }));
  });

  it('should send a new map request through socket by giving an obj with map string extracted from file [TU23]',
    () => {
    service.newMap('+ + > > > _\n+ + > > > _\n+ + + + + <\n+ + X + + ^\nB + + + + P')

    expect(spySocket.next).toHaveBeenCalledOnceWith(JSON.stringify({
      type: 'MapToServer',
      mapConfig: '+ + > > > _\n+ + > > > _\n+ + + + + <\n+ + X + + ^\nB + + + + P',
    }));
  });
});

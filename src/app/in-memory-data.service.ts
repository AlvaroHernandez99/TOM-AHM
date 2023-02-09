import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      {
        id: 0,
        name: 'Drª GioMETRIc',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 2,
        name: 'Dr Takaro',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 3,
        name: 'Dr DC8',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 4,
        name: 'Dr Max',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 5,
        name: 'Drª Onfire',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 6,
        name: 'Drª waterh',
        superPower: 'apagar el fayáh',
        hasCape: true,
        height: 125
      },
      {
        id: 7,
        name: 'Dr Rarete',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 8,
        name: 'Dr Rarete',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 9,
        name: 'Dr Rarete',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      },
      {
        id: 10,
        name: 'Dr Rarete',
        superPower: 'Siempre hace un perfect',
        hasCape: true,
        height: 125
      }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}

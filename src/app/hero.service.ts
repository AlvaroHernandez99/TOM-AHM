import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import {catchError, Observable, of, pipe} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl: string = 'api/heroes';

  constructor(
    private http: HttpClient
  ) { }

  // Hace una llamkada a la apu para devolver todos lo heroes
  // Como es una iperacuon asincrona, devuelve un observable
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(e => {
        console.error(e);
        return []; // le pasamos un array vacío para que no devuelva nada
      })
    );
  }

  // filter devuelve un array filtrado,
  // observable devuelve un objeto
  public getHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.heroesUrl + '/' + id)
  }

  public updateHero(hero: Hero): Observable<void> {
    return this.http.put<void>(`${this.heroesUrl}/${hero.id}`, hero);
  }

  public searchHeroes(text: string): Observable<Hero[]> {
    if (!text.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${text}`);
  }
}

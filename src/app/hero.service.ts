import {EventEmitter, Injectable, Output} from '@angular/core';
import { Result } from '../interfaces/result';
import {catchError, map, Observable, of, pipe, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Character} from "../interfaces/character";
import {Hero} from "../interfaces/hero";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  //private heroesUrl: string = 'api/heroes';
  private fullLink:string = 'https://gateway.marvel.com/v1/public/characters?ts=takaro&apikey=39449468682c0aa00d295ebc89422f6b&hash=7bb4c84838e9de0644989f19f8d4e506';
  private fullLinkLimit:string = 'https://gateway.marvel.com:443/v1/public/characters?limit=20&apikey=39449468682c0aa00d295ebc89422f6b';
  private url:string = 'https://gateway.marvel.com/v1/public/characters';
  private ts:string = "?ts=takaro";
  private apiKey:string = '&apikey=39449468682c0aa00d295ebc89422f6b';
  private hash:string = '&hash=7bb4c84838e9de0644989f19f8d4e506';

  private mathRamdom:number = Math.floor(Math.random() * 1550);

  public limit:number = 20;
  public offset:number = 1; //1561

  constructor(
    private http: HttpClient
  ) { }

  // Hace una llamada a la api para devolver todos lo heroes
  // Como es una operación asíncrona, devuelve un observable
  public getHeroes(): Observable<Result[]> {
    return this.http.get<Character>(this.fullLinkLimit).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result: Character)=>result.data.results))
  }

  // filter devuelve un array filtrado,
  // observable devuelve un objeto
  public getHeroById(id: number): Observable<Result[]> {
    return this.http.get<Character>(this.url + '/' + id + this.ts + this.apiKey + this.hash).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    )
    .pipe(map((result: Character)=>result.data.results))
  }

  public getHeroesRandom(): Observable<Result[]> {
    return this.http.get<Character>(this.url + this.ts + '&offset=' + this.mathRamdom + this.apiKey + this.hash).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result: Character)=>result.data.results))
  }

  public searchHeroes(text: string): Observable<Result[]> {
    if (!text.trim()) {
      return of([]);
    }
    return this.http.get<Character>(this.url + this.ts + "&nameStartsWith=" + `${text}` + this.apiKey + this.hash).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result: Character)=>result.data.results))
  }

  public getHeroesPaginateMore(): Observable<Result[]> {
    if (this.offset >= 1540) {
      this.offset = 1522;
    }
    this.offset = this.offset + 20;
    return this.http.get<Character>(this.url + this.ts + '&' + 'limit=' + this.limit + '&' + 'offset=' + this.offset + this.apiKey + this.hash)
      .pipe(
        catchError(e => {
          console.error(e);
          return [];// le pasamos un array vacío para que no devuelva nada
        })
      )
      .pipe(map((result: Character)=>result.data.results))
  }

  public getHeroesPaginateLess(): Observable<Result[]> {
    this.offset = this.offset - 20;
    return this.http.get<Character>(this.url + this.ts + '&' + 'limit=' + this.limit + '&' + 'offset=' + this.offset + this.apiKey + this.hash)
      .pipe(
        catchError(e => {
          console.error(e);
          return [];// le pasamos un array vacío para que no devuelva nada
        })
      )
      .pipe(map((result: Character)=>result.data.results))
  }

  public getHeroeOne(): Observable<Result[]> {
    this.offset = 0;
    return this.http.get<Character>(this.url + this.ts + '&' + 'offset=' + this.offset + this.apiKey + this.hash)
      .pipe(
        catchError(e => {
          console.error(e);
          return [];// le pasamos un array vacío para que no devuelva nada
        })
      )
      .pipe(map((result: Character)=>result.data.results))
  }

  public getHeroeLast(): Observable<Result[]> {
    this.offset = 1542;
    return this.http.get<Character>(this.url + this.ts + '&' + 'offset=' + this.offset + this.apiKey + this.hash)
      .pipe(
        catchError(e => {
          console.error(e);
          return [];// le pasamos un array vacío para que no devuelva nada
        })
      )
      .pipe(map((result: Character)=>result.data.results))
  }






}








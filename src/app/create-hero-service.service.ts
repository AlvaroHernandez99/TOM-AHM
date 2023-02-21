import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Result} from "../interfaces/result";
/*import {Character} from "../interfaces/character";*/
import {CreateHero} from "../interfaces/createHero";
import {Character} from "../interfaces/character";
import * as cluster from "cluster";

@Injectable({
  providedIn: 'root'
})
export class CreateHeroServiceService {

  private url: string = "http://127.0.0.1:8000/api/heroes/";

  public name: string;


  constructor(
    private http: HttpClient

  ) { }

  public getHeroes(): Observable<CreateHero[]> {
    return this.http.get<CreateHero>(this.url).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result)=>result.data))
  }


  public deleteHero(id: number): Observable<CreateHero[]> {
    return this.http.delete<CreateHero>(this.url + id).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    )
  }

  public createHero(hero: CreateHero): Observable<CreateHero> {
    return this.http.post<CreateHero[]>(this.url, hero).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result)=>result))
  }

  public getHeroesSearch(text: string): Observable<CreateHero[]> {
    if (!text.trim()) {
      return of([]);
    }
    return this.http.get<CreateHero>(this.url + 'search/' + text).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result: CreateHero[])=>result))
  }

  public getHeroCreatedById(id: number): Observable<CreateHero> {
    return this.http.get<CreateHero>(this.url + id).pipe(
      catchError(e => {
        console.error(e);
        return [];// le pasamos un array vacío para que no devuelva nada
      })
    ).pipe(map((result)=>result.data))
  }

}





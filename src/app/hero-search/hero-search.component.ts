import {Component, OnInit} from '@angular/core';
import {HeroService} from "../hero.service";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {debounce, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {Result} from "../../interfaces/result";
import {HeroServices} from "../hero.services";
import {Hero} from "../../interfaces/new-hero";


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent /*implements OnInit*/{
  public heroesFound$: Observable<Result[]> = of([]);

  /* Tipo subject es una clase A LA QUE TE PUEDES SUBSCRIBIR Y HACE LA FUNCIÓN DE OBSERVABLE */
  /* Un observable que elegimos nosotros cuando mandarlo */
  /* FUente de valores observables y pusear valores como si fuera un array para qe le llegue a los subscritos*/
  public searchTerm: Subject<string> = new Subject();
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private heroService: HeroService,
    private heroServices: HeroServices
  ) { }

  ngOnInit(): void {
    this.heroesFound$ = this.searchTerm.pipe(
      /*/!*Completa el observale anterior y lo transforma a tipo HERO*!/*/
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.heroService.searchHeroes(term);
      })
    );
  }

  public search(value: string):void {
    /* *Observable que simula una promesa* */
    /* Cada vez que que se haga una nueva busqueda, lo va a reemplazar, para que no haga muchas peticiones */
    /* Serian 20 observable que se van subscribiendo, no crea una para cada llamada */
    // this.heroesFound$ = this.heroService.searchHeroes(value);
    this.searchTerm.next(value);
    console.log(value);
  }
/* ------------------------------------------------------------------------------------------------------------*/
  /*searchh(term: string): void {
    this.searchTerms.next(term);
  }*/

  /*ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroServices.searchHeroes(term)),
    );
  }*/


}

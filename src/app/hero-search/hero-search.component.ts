import {Component, OnInit} from '@angular/core';
import {HeroService} from "../hero.service";
import {debounce, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {Result} from "../../interfaces/result";
import {CreateHeroServiceService} from "../create-hero-service.service";
import {CreateHero} from "../../interfaces/createHero";


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit{
  public heroesFound$: Observable<Result[]> = of([]);
  public heroesFoundCreated$: Observable<CreateHero[]> = of([]);

  /* Tipo subject es una clase A LA QUE TE PUEDES SUBSCRIBIR Y HACE LA FUNCIÓN DE OBSERVABLE */
  /* Un observable que elegimos nosotros cuando mandarlo */
  /* FUente de valores observables y pusear valores como si fuera un array para qe le llegue a los subscritos*/
  public searchTerm: Subject<string> = new Subject();
  private searchTerms: Subject<string> = new Subject();
  public values: string = "";
  public event: string = "";

  constructor(
    private heroService: HeroService,
    private createHeroServiceService: CreateHeroServiceService
  ) { }

  ngOnInit(): void {
    this.heroesFound$ = this.searchTerm
      .pipe(
      /*/!*Completa el observale anterior y lo transforma a tipo HERO*!/*/
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.heroService.searchHeroes(term);
      })
    );
    this.heroesFoundCreated$ = this.searchTerms
      .pipe(
        /*/!*Completa el observale anterior y lo transforma a tipo HERO*!/*/
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          return this.createHeroServiceService.getHeroesSearch(term)
        })
      );
  }

  public search(value: string):void {
    /* *Observable que simula una promesa* */
    /* Cada vez que que se haga una nueva busqueda, lo va a reemplazar, para que no haga muchas peticiones */
    /* Serian 20 observable que se van subscribiendo, no crea una para cada llamada */
    this.searchTerm.next(value);
  }

  public onKey(value: string) {
    this.searchTerms.next(value);
  }
  
}

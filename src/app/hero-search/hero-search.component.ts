import {Component, OnInit} from '@angular/core';
import {HeroService} from "../hero.service";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {debounce, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {Result} from "../../interfaces/result";
import {Hero} from "../../interfaces/hero";
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
  heroes$!: Observable<Hero[]>;
  public createdHeroes: CreateHero[] = [];
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
    /*
    this.values += (event.target as HTMLInputElement).value;
    console.log(this.values);  //Lo que meto en el input
    let body: string = this.values ;
    this.createHeroServiceService.getHeroesSearch(value).subscribe( (heroes: CreateHero[]) => {
      const names = heroes.map(hero => hero.name);
      console.log(names);
      return names;
       //nombres en un array
    })
    */
  }









//  Tengo los valores de los inputs recogidos,
//  También los nombres en un array
  // LO QUE RECOGE EL INPUT, COMO LO MANDO, EN EL PSOTMAN SI NO LO MANDO NO VA XD,
  //HGACER QUE HAGA LA COMPARACION TO-DO EL RATO...








}

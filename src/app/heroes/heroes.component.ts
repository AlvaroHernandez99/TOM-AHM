import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
/*import { Hero } from '../hero';*/
import { HeroService } from '../hero.service';
import {Result} from "../../interfaces/result";
import {Hero} from "../../interfaces/new-hero";
import {HeroServices} from "../hero.services";


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //Por defecto una propiedad es pública. No hace flata ponerlo pero si lo pones es mejor para ifrntificarlo.
  // No hace falta ponerle tipo si la INICIALIZAS
/*   public heroeSeleccionado: Hero = null; */


  heroes: Hero[] = [];


  textoHeroe:string = 'Aqui se mostrará la lista de los heroes';

  public limit:number = 20;
  public offset:number = 0;
  public limitMore:number = 21;
  public offsetMore:number = 1;


  constructor(
    //Indica a angular, que se reqyiere el uso de la instacia HeroService
    //Y, en el mismo paso, crea una propiedad privada de nombre heroService para conterner dicha instalacia
    private heroService: HeroService,
    private heroServices: HeroServices

  ) { }

  ngOnInit(): void {
    //Obtenemos los heroes y los almacenamos en la variable "heroes"
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    })
  }

  public more(): number {
    this.heroService.getHeroesPaginateMore().subscribe((heroes) => {
      this.heroes = heroes;
    })
    if(this.limitMore > 1560){
      return this.limitMore;
    }
    return (this.offsetMore = this.offsetMore + 20) && (this.limitMore = this.limitMore + 20);
  }


  public less(): number {
    this.heroService.getHeroesPaginateLess().subscribe((heroes) => {
      this.heroes = heroes;
    })
    if(this.offsetMore <= 1){
      return this.offsetMore;
    }
    return (this.offsetMore = this.offsetMore - 20) && (this.limitMore = this.limitMore - 20);
  }

  public more2(): number {
    this.offsetMore = 1;
    this.limitMore = 21
    this.heroService.getHeroeOne().subscribe((heroes) => {
      this.heroes = heroes;
    })
    if(this.limitMore <= 1561){
      return this.limitMore;
    }
    return (this.offsetMore = 1) && (this.limitMore = 21);
  }

  public last(): number {
    this.offsetMore = 1542;
    this.limitMore = 1562
    this.heroService.getHeroeLast().subscribe((heroes) => {
      this.heroes = heroes;
    })
    if(this.limitMore > 1540){
      return this.limitMore;
    }
    //console.log(this.offsetMore);
    return (this.offsetMore = 1542) && (this.limitMore = 1562);

  }


  /*-.---------------------------------------------*/
  getHeroes(): void {
    this.heroServices.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroServices.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroServices.deleteHero(hero.id).subscribe();
  }

}


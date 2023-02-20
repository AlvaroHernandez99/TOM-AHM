import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import {Hero} from "../../interfaces/hero";
import {Result} from "../../interfaces/result";



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes?: Result[];

  public limit:number = 20;
  public limitMore:number = 21;
  public offsetMore:number = 1;


  constructor(
    //Indica a angular, que se reqyiere el uso de la instacia HeroService
    //Y, en el mismo paso, crea una propiedad privada de nombre heroService para conterner dicha instalacia
    private heroService: HeroService
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

}


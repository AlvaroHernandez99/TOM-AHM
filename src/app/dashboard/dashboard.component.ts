import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import {Result} from "../../interfaces/result";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public heroes?: Result[];
 /* heroe: Hero[] = [];*/

  constructor(
    private heroService: HeroService,
/*    private heroServices: HeroServices*/
  ) {  }

  ngOnInit(): void {
    this.heroService.getHeroesRandom().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  /*-------------------------------------------*/
/*  getHeroes(): void {*/
/*
    this.heroServices.getHeroes()
      .subscribe(heroes => this.heroe = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroServices.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroe.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroe = this.heroe.filter(h => h !== hero);
    this.heroServices.deleteHero(hero.id).subscribe();
  }
*/


}

import { Component, OnInit } from '@angular/core';
import {Character, Result, Thumbnail} from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public heroes?: Result[];

  constructor(
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.heroService.getHeroesRandom().subscribe(heroes => {
      this.heroes = heroes;
    })
  }


}

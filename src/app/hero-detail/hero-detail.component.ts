import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from "@angular/common";
import {Character, Result} from "../hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy{
  //funcion(hero: Hero)
  @Input() heroeSeleccionado?: Result;

  constructor (
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // El + es para parsear la variable (para cambiarle el tipo)
    // En este caso, como el id es de tipo string, tenemos que cambiarle la variable, por eso se le pone el +
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(id).subscribe(
      (heroes)  => {
        this.heroeSeleccionado = heroes[0];
      });
  }
  goBack(): void{
    this.location.back();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscription;
  }
   /*save() {
    this.heroService.updateHero(this.heroeSeleccionado).subscribe();
     this.location.back();
   }*/

}




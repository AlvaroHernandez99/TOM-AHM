import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
/*import { Hero } from '../hero';*/
import { HeroService } from '../hero.service';
import {Result} from "../hero";



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //Por defecto una propiedad es pública. No hace flata ponerlo pero si lo pones es mejor para ifrntificarlo.
  // No hace falta ponerle tipo si la INICIALIZAS
/*   public heroeSeleccionado: Hero = null; */

  public heroes: Result[] = [];
  textoHeroe:string = 'Aqui se mostrará la lista de los heroes';

  constructor(
    //Indica a angular, que se reqyiere el uso de la instacia HeroService
    //Y, en el mismo paso, crea una propiedad privada de nombre heroService para conterner dicha instalacia
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    //Obtenemos los heroes y los almacenamos en la variable "heroes"
    this.heroService.getHeroes()
    .subscribe((heroes) => {
      this.heroes = heroes;
    })
  }

}


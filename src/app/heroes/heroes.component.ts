import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  //Por defecto una propiedad es pública. No hace flata ponerlo pero si lo pones es mejor para ifrntificarlo.
  // No hace falta ponerle tipo si la INICIALIZAS
/*   public heroeSeleccionado: Hero = null; */

  public heroes: Hero[] = [];
  textoHeroe:string = 'Aqui se mostrará la información del HERO';
  fullLink:string = 'https://gateway.marvel.com/v1/public/comics?ts=takaro&apikey=39449468682c0aa00d295ebc89422f6b&hash=7bb4c84838e9de0644989f19f8d4e506';
  url:string = 'https://gateway.marvel.com/v1/public/';
  ts:string = "?ts=takaro";
  apiKey:string = '&apikey=39449468682c0aa00d295ebc89422f6b';
  hash:string = '&hash=7bb4c84838e9de0644989f19f8d4e506';

  constructor(
    //Indica a angular, que se reqyiere el uso de la instacia HeroService
    //Y, en el mismo paso, crea una propiedad privada de nombre heroService para conterner dicha instalacia
    private heroService: HeroService
  ) { }


  ngOnInit(): void {
    //Obtenemos los heroes y los almacenamos en la variable "heroes"
    this.heroService.getHeroes().pipe(
      // solici
      /* delay(1000), */

    )
    .subscribe(heroes => {
      this.heroes = heroes;
    })
  }

}


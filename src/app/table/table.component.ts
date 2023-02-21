import {Component, OnInit} from '@angular/core';
import {CreateHeroServiceService} from "../create-hero-service.service";
import {CreateHero} from "../../interfaces/createHero";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  implements OnInit{

  public createdHeroes: CreateHero[] = [];

  constructor(
    private createHeroServiceService: CreateHeroServiceService,

  ) {
  }

  ngOnInit(): void {
    //Obtenemos los heroes y los almacenamos en la variable "heroes"
    this.createHeroServiceService.getHeroes().subscribe((heroes) => {
      console.log(heroes);
      return this.createdHeroes = heroes;
    })
  }

  public delete(id: number) {
    this.createHeroServiceService.deleteHero(id).subscribe((heroes) => {
      this.createHeroServiceService.getHeroes().subscribe((heroes) => {
        return this.createdHeroes = heroes;
      })
    })
  }

}

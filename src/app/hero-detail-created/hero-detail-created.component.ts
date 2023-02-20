import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CreateHeroServiceService} from "../create-hero-service.service";
import {CreateHero} from "../../interfaces/createHero";

@Component({
  selector: 'app-hero-detail-created',
  templateUrl: './hero-detail-created.component.html',
  styleUrls: ['./hero-detail-created.component.scss']
})
export class HeroDetailCreatedComponent implements  OnInit{

  public heroeSeleccionadoCreate: CreateHero;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private createHeroServiceService: CreateHeroServiceService
  ) {
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.createHeroServiceService.getHeroCreatedById(id).subscribe(
      (heroes)  => {
        console.log(heroes);
          return this.heroeSeleccionadoCreate = heroes;
      });
  }

  goBack(): void{
    this.location.back();
  }
}

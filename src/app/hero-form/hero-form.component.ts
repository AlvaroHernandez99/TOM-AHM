import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Hero} from "../../interfaces/hero";
import {CreateHeroServiceService} from "../create-hero-service.service";
import {CreateHero} from "../../interfaces/createHero";


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{
  public heroForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [
      Validators.maxLength(16),
      Validators.required
    ]),
    description: new FormControl("",[
      Validators.maxLength(150),
      Validators.required
    ]),
    hasCape: new FormControl(false),
  });

  public notVisible: boolean = false;

  public constructor(
    private createHeroServiceService: CreateHeroServiceService
  ) { }

  ngOnInit(): void {
    this.heroForm.valueChanges.subscribe(values => {
      /*console.log(values);*/
    })

  }



  public save(): void {
    /*hace toda la validación del fromulario*/
    if (this.heroForm.invalid) {
      alert('FORMULARIO INVALIDO');
      return;
    }
    console.log(this.heroForm.value);
    let body = {
      name: this.heroForm.value.name,
      description: this.heroForm.value.description,
      hasCape: this.heroForm.value.hasCape
    }
    this.createHeroServiceService.createHero(body as CreateHero)
      .subscribe(response => {
        console.log(response)
      })
    this.heroForm.reset();
    this.notVisible = false;
  }

  public load(): void{
    if (this.heroForm.invalid) {
      alert('FORMULARIO INVALIDO');
      return;
    }
    this.notVisible = true;
  }

  public reset(): void {
    this.heroForm.reset();
    this.notVisible = false;
  }



}

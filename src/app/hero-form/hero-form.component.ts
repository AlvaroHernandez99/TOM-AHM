import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Hero} from "../../interfaces/new-hero";
import {HeroServices} from "../hero.services";


@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit{
  public heroForm = new FormGroup({
    /*Se le pone el id ya que cuando devuelven los id de la db necesita tener el campo.*/
    /*también se verá a la hora de crear... Si tiene id modificará, si no, lo creará*/
    /*LOS VALORES QUE ENTRAN ENTRE LOS PARÉNTESIS SON LOS VALORES QUE ESTARÁN POR DEFECTO*/
    id: new FormControl(),
    name: new FormControl('', [
      Validators.maxLength(16),
      Validators.required
    ]),
    description: new FormControl("",[
      Validators.maxLength(50),
      Validators.required
    ]),
    hasCape: new FormControl(true),
    height: new FormControl("not specified")
  });
  public visible: boolean = true;
  public notVisible: boolean = false;

  /*public heroCreate: NewHero[] = [];*/

  /*heroCreate = HEROESCREATE;*/
  heroes: Hero[] = [];
  public constructor(
    private heroServices: HeroServices
  ) {
  }

  ngOnInit(): void {
    this.heroForm.valueChanges.subscribe(values => {
      console.log(values);

    })
  }

  /*public addNewHero(form: FormGroup) {
    /!*const control = new FormControl(null, [Validators.required]);*!/
    console.log(form.value);
    const todoA = this.heroCreate.push(form.value);
    conole.log(todoA);
  }*/



  public save(): void {
    /*hace toda la validación del fromulario*/
    if (this.heroForm.invalid) {
      alert('FORMULARIO INVALIDO');
      return;
    }
    /* ADD NEW HERO */

    console.log(this.heroForm.value);


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


  /*----------------------------------------------*/
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

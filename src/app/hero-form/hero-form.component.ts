import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
    name: new FormControl('Uno', [
      Validators.required
    ]),
    superpower: new FormControl("",[
        Validators.maxLength(16)
      ]),
    hasCape: new FormControl(true),
    height: new FormControl()
  });

  public save() {
    /*hace toda la validación dle fromulario*/
    if (this.heroForm.invalid) {
      alert('FORMULARIO INVALIDO');
      return;
    }
    console.log(this.heroForm.value);
  }

  public load(){}

  public reset(){}

  /*Con esta subscripción, cada vez que cambie el formulario nos lo hará llegar*/
  ngOnInit(): void {
    this.heroForm.valueChanges.subscribe(values => {
      console.log(values);
    })
  }

}

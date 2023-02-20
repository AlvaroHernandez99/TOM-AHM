import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {HeroFormComponent} from "./hero-form/hero-form.component";
import {TableComponent} from "./table/table.component";
import {HeroDetailCreatedComponent} from "./hero-detail-created/hero-detail-created.component";


const routes: Route[] = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'create', component: HeroFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'detail/created/:id', component: HeroDetailCreatedComponent },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


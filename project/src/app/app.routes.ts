import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},

  {
    path: "home",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  }
];

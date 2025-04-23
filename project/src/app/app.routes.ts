import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},

  {
    path: "home",
    title: "railway tickets",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    path: "home/:date/:source/:destination",
    title: "railway tickets - filter",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},

  {
    path: "home",
    title: "railway departures",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    path: "home/:date/:source/:destination",
    title: "railway departures",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    path: "trains/:date/:source/:destination",
    title: "railway trains",
    loadComponent: () => import("./trains/trains.component").then(m => m.TrainsComponent)
  },
];

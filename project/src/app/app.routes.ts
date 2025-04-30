import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: "", pathMatch: "full", redirectTo: "home"  },

  {
    path: "home",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    path: "tickets/:source/:destination/:date",
    loadComponent: () => import("./tickets/tickets.component").then(m => m.TicketsComponent)
  }
];

import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: "", pathMatch: "full", redirectTo: "home"  },

  {
    title: "home",
    path: "home",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    title: "tickets",
    path: "tickets/:source/:destination/:date",
    loadComponent: () => import("./tickets/tickets.component").then(m => m.TicketsComponent)
  },

  {
    title: "buy",
    path: "buy/:date",
    loadComponent: () => import("./buy/buy.component").then(m => m.BuyComponent)
  }
];

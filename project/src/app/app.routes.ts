import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: "", pathMatch: "full", redirectTo: "home"  },

  {
    title: "home",
    path: "home",
    loadComponent: () => import("./home/home.component").then(m => m.HomeComponent)
  },

  {
    title: "information",
    path: "information",
    loadComponent: () => import("./information/information.component").then(m => m.InformationComponent)
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
  },

  {
    title: "history",
    path: "history",
    loadComponent: () => import("./history/history.component").then(m => m.HistoryComponent)
  },

  {
    title: "ticket information",
    path: "ticket info/:ticketId",
    loadComponent: () => import("./ticket-info/ticket-info.component").then(m => m.TicketInfoComponent)
  },
];

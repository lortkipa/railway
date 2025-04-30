import {train} from "./train";

export interface departure {
  id: number,
  source: string,
  destination: string,
  date: string,
  trains : train[]
}

import {seat} from "./seat";

export interface vagon {
  id : number,
  trainId : number,
  trainNumber : number,
  name : string,
  seats : seat[]
}

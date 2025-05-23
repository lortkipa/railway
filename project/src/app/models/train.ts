import {vagon} from "./vagon";

export interface train {
  id : number,
  number : number,
  name : string,
  date : string,
  from : string,
  to : string,
  departure : string,
  arrive : string,
  departureId : number,
  vagons : vagon[]
}

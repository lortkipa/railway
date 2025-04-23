export interface departureModel {
  id ?: number;
  source ?: string;
  destination ?: string;
  date ?: string;

  // TODO: maybe change this to real train model
  trains : any;
}

export class filter_departureModel {
  date : string | null | undefined;
  source : string | null | undefined;
  destination : string | null | undefined;
}

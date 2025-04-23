export interface departureModel {
  id ?: number;
  source ?: string;
  destination ?: string;
  date ?: string;

  // TODO: maybe change this to real train model
  trains : any;
}

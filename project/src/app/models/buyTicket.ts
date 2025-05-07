import {vagon} from "./vagon";

export interface buyTicket {
  id ?: string;
  trainId: number,
  date: string,
  email ?: string,
  phoneNumber ?: string,
  people: [
    {
      seatId: string,
      name ?: string,
      surname ?: string,
      idNumber: ""
      status: "",
      payoutCompleted: boolean
    }
  ],
}

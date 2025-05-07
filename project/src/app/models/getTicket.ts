import {train} from "./train"

export interface getTicket {
  id: string,
  phone: string,
  email: string,
  date: string,
  ticketPrice: number,
  trainID: number,
  confirmed: boolean,
  train : train,
  persons: [
    {
      id: string,
      ticketId: string,
      seat: {
        seatId: string,
        number: string,
        price: number,
        isOccupied: boolean,
        vagonId: number,
      },
      name: string,
      surname: string,
      idNumber: '',
      status: '',
      payoutCompleted: boolean
    }
  ]
}

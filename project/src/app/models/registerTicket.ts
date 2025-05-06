export interface people {
  seatId: string,
  name: string,
  surname: string,
  idNumber: string,
  status: string,
  payoutCompleted: boolean
}

export interface registerTicket {
  trainId: number,
  date: string,
  email: string,
  phoneNumber: string,
  people : people[]
}

export interface buyTicket {

  trainId: number,
  date: string,
  email ?: string,
  phoneNumber: string,
  people: [
    {
      seatId: string,
      name ?: string,
      surname ?: string,
      idNumber: ""
      status: "",
      payoutCompleted: boolean
    }
  ]

}

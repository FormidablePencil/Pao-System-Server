import { Request, Response, request } from "express"
export interface paoGetListRes extends Response {
  username: string
  paos: {
    person: {
      number: number
      name: string
    },
    action: {
      number: number
      name: string
    },
    object: {
      number: number
      name: string
    }
  }
}

export interface PutPaoDataReq extends Request {
  duplicate: any,
  existingPao: any,
  filteredDuplicates: []
  duplicatesEliminated: []
  username: string
  body: {
    list: any []
  }
}



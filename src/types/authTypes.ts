import { Request } from "express";

export interface TokenReq extends Request {
  body: {
    token: string
  }
}

export enum authServerResponses {
  successfully_refreshed_token = 'returned fresh new tokens'
}
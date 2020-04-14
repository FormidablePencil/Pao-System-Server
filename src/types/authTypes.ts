import { Request } from "express";

export interface TokenReq extends Request {
  body: {
    token: string
  }
}
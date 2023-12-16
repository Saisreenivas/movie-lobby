import { NextFunction, Request, Response } from "express"


function asyncWrapper(fn: (request: Request, response: Response, next: NextFunction) => any) {
  return (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(fn(request, response, next)).catch(next)
  }
}

export { asyncWrapper }
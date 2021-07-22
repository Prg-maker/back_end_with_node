import { Request, Response } from "express";
import {AuthenticateUserService} from "../services/AuthenticateUSerService";


class AuthenticateUserController{
  async handle(request: Request, response: Response){
    const {email, password } = request.body

    const authenticateUSerService = new AuthenticateUserService();

    const token = await authenticateUSerService.execute({
      email,
      password
    });
    return response.json(token)
  }
}

export {AuthenticateUserController}
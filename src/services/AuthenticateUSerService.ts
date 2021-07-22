import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken" 

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
  email: string;
  password:  string;
}

class AuthenticateUserService{
  async execute({email, password}: IAuthenticateRequest){
    const userRepositories = getCustomRepository(UsersRepositories)

    // Verificar se um email existe
    const user = await userRepositories.findOne({
      email
    }) 


    if(!user){
      throw new Error("Email/Password incorrect")
    }

    // verificar se a senha está correta

    const  passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }

    // gerar o token
    const token = sign({
      email: user.email
    }, "ea26e0ce62bb5c5b285eb41ef486a2d9",
    {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  } 
}

export {AuthenticateUserService}
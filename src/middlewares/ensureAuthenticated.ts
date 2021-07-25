import { Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub:string;
}

export function ensureAuthenticated(
  
    request:Request,
    response:Response, 
    next:NextFunction
  )
  {
  // Receber o token   
  const authToken = request.headers.authorization
  
  // Validar se token está preenchido
  if(!authToken){
    return response.status(401).end()
  }

  const [,token] = authToken.split(" ")

  // Validar se token é valido
  try{
    //Recuperar informações do usuário

    const {sub}= verify( token ,"ea26e0ce62bb5c5b285eb41ef486a2d9") as IPayload;
    request.user_id = sub
    
    return next()

  }catch(err){
    console.log(err)

    return response.status(401).end()
  }
  



};
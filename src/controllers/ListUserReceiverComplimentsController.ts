import {Request, Response} from "express"
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiverCompliments"


class ListUserReceiverComplimentController{
  async handle(request:Request, response: Response){

    const {user_id} = request 

    const listUserSendComplimentService = new ListUserReceiverComplimentsService()

    const compliments = await listUserSendComplimentService.execute(user_id)

    return response.json(compliments)
  }
}

export {ListUserReceiverComplimentController}
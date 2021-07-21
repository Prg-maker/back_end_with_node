import  { TagsRepositories} from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";

class CreateTagService {
  async execute(name: string ){
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if(!name){
      throw new Error('Incorrect name!');
    }

    const tagAlreadyExist = await tagsRepositories.findOne({
      name
    }); 

    if(tagAlreadyExist){
      throw new Error('Tag already exists!')
    }

    const tag = tagsRepositories.create({
      name
    });

    await tagsRepositories.save(tag);

    return tag
  } 
}

export {CreateTagService}
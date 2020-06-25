import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entity/Post';

export class DeletePostController {
    static delete = async (req: Request, res: Response) => {
        const id = req.params.id;
        const postRepository = getRepository(Post);

        try {
            await postRepository.delete(id);
        } catch (error) {
            res.status(404).send('Данный товар не получилось удалить!');
        }

        res.status(200).send(id);
    };
}

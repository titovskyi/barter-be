import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entity/Post';

export class GetPostController {
    static get = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const id = req.params.id;
        const postRepository = getRepository(Post);
        let post: Post;

        try {
            post = await postRepository.findOneOrFail({
                where: { id: id, userId: !userId },
                relations: ['user', 'userLike'],
            });
        } catch (error) {
            res.status(404).send('Данный товар не найден!');
        }

        res.status(200).send(post);
    };
}

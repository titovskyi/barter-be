import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entity/Post';

export class GetStripController {
    static get = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const postRepository = getRepository(Post);
        let posts: Post[];

        try {
            posts = await postRepository.find({relations: ['user', 'userLike'] });
        } catch (error) {
            res.status(404).send('Ошибка получения ленты новостей!');
        }

        posts = posts.filter((post: any) => {
            if(post.user.id !== userId) {
                post.user = {id: post.user.id, name: post.user.name, avatar: post.user.avatar, description: post.description};

                return post;
            }
        });

        res.status(200).send(posts);
    };
}

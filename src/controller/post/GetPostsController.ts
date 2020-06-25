import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

export class GetPostsController {
    static get = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(userId, {
                relations: ['posts'],
            });
        } catch (error) {
            res.status(404).send('Пользователь не найден!');
        }

        console.log(user.posts);

        res.status(200).send(user.posts);
    };
}

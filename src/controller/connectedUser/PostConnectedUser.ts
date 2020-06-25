import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ConnectedUser } from '../../entity/ConnectedUser';

export class PostConnectedUser {
    static post = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const { postId } = req.body;
        const connectedUserRepository = getRepository(ConnectedUser);

        try {
            await connectedUserRepository.save({
                userId: userId,
                postId: postId,
            });
        } catch (error) {
            res.status(404).send('Ошибка при получении товара!');
        }

        res.status(200).send({});
    };
}

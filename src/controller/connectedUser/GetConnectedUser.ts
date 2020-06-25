import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ConnectedUser } from '../../entity/ConnectedUser';

export class GetConnectedUser {
    static get = async (req: Request, res: Response) => {
        const { postId } = req.body;
        const connectedUserRepository = getRepository(ConnectedUser);
        let connectedUsers: ConnectedUser[];

        try {
            connectedUsers = await connectedUserRepository.find({
                where: { postId: postId },
                relations: ['user', 'post'],
            });
        } catch (error) {
            res.status(404).send('Ошибка получения данных о лайках товара!');
        }

        const connections = connectedUsers.map((connection) => {
            return {
                createdAt: connection.createdAt,
                // @ts-ignore
                connectedUser: connection.__user__,
            };
        });

        res.status(200).send(connections);
    };
}

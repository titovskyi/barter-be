import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ConnectedUser } from '../../entity/ConnectedUser';

export class DeleteConnectedUser {
    static delete = async (req: Request, res: Response) => {
        const { postId, connectedUserId } = req.body;
        const connectedUserRepository = getRepository(ConnectedUser);
        let connectedUsers: ConnectedUser[];
        try {
            connectedUsers = await connectedUserRepository.find({
                where: { postId: postId },
            });
        } catch (error) {
            res.status(404).send(
                'Данный товар не получилось найти для удаления!'
            );
        }

        let deletedConnection = connectedUsers.find(
            (connection) => connection.userId === connectedUserId
        );

        try {
            await connectedUserRepository.delete(deletedConnection.id);
        } catch (error) {
            res.status(400).send(
                'Ошибка сохранения лайков после удаления лайка!'
            );
        }

        res.status(200).send({});
    };
}

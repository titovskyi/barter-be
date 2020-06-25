import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

export class GetUserByAuthTokenController {
    static get = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOne(userId, {
                select: ['id', 'phone', 'name', 'avatar', 'country', 'city', 'about'],
                relations: ['posts'],
            });

        } catch (error) {
            res.status(401).send();
        }

        res.status(200).send(user);
    };
}

import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../../entity/User";

export class CheckTokenController {
    static get = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const userRepository = getRepository(User);
        let user: User;
        console.log(userId);
        try {
            user = await userRepository.findOne(userId);
        } catch (error) {
            res.status(401).send('Пользователь не подтвержден!');
        }

        if(user) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }

    }
}

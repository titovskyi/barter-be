import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { validate } from 'class-validator';

export class LoginController {
    static login = async (req: Request, res: Response) => {
        const { phone } = req.body;
        const userRepository = getRepository(User);

        let user: User = await userRepository.findOne({
            where: { phone: phone },
        });

        if (!user) {
            user = new User();
            user.phone = phone;
        }

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }

        const confirmCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
        user.confirmCode = confirmCode;
        console.log(user);
        try {
            await userRepository.save(user);
        } catch (error) {
            console.log(error);
            res.status(409).send('Ошибка регистрации!');
        }

        res.status(200).send(confirmCode.toString());

    };
}

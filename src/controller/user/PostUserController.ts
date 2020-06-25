import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import config from '../../config/config';

import { getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { validate } from 'class-validator';

export class PostUserController {
    static post = async (req: Request, res: Response) => {
        const { phone, confirmCode } = req.body;
        const userRepository = getRepository(User);

        let user;

        try {
            user = await userRepository.findOne({
                where: {
                    phone: phone,
                    confirmCode: confirmCode,
                },
            });
        } catch (error) {
            res.status(409).send('Введите верный код подтверждения!');
        }
        const jwtToken = jwt.sign(
            { userId: user.id, confirmCode: user.confirmCode },
            config.jwtSecret
        );

        user.authToken = jwtToken;

        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }

        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(409).send('Ошибка входа!');
        }

        res.status(201).send(
            JSON.stringify({
                token: jwtToken,
            })
        );
    };
}

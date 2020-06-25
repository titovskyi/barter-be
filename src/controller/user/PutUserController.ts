import * as fs from 'fs';
import * as path from 'path';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

export class PutUserController {
    static put = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const userRepository = getRepository(User);
        const { name, avatar, country, city, about } = req.body;
        const prev_avatar = req.body.prevAvatar;

        let user: User;

        try {
            user = await userRepository.findOneOrFail(userId, {
                relations: ['posts'],
            });
        } catch (error) {
            res.status(404).send('При изменении информации произошла ошибка!');
        }

        if (name) {
            user.name = name;
        }

        if (country) {
            user.country = country;
        }

        if (city) {
            user.city = city;
        }

        if (about) {
            user.about = about;
        }

        if (user && user.avatar !== avatar) {
            if(prev_avatar) {
                const prevAvatarName = prev_avatar.slice(
                    prev_avatar.lastIndexOf('/') + 1
                );
                const resolvedPrevAvatarPath = path.resolve(
                    `public\\uploads\\${prevAvatarName}`
                );

                if (fs.existsSync(resolvedPrevAvatarPath)) {
                    fs.unlinkSync(path.resolve(resolvedPrevAvatarPath));
                }
            }

            const data = avatar.replace(/^data:image\/\w+;base64,/, '');
            const image = `${user.id}${Date.now()}.jpeg`;

            fs.writeFile(
                `./public/uploads/${image}`,
                `${data}`,
                'base64',
                () => {
                    user.avatar = image;
                }
            );
        }

        try {
            await userRepository.save(user);
        } catch (error) {
            res.status(400).send('Ошибка сохранения обновленной информации!');
        }

        res.status(200).send(user);
    };
}

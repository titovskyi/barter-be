import * as fs from 'fs';
import * as path from 'path';

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entity/Post';
import {validate} from "class-validator";

export class PutPostController {
    static put = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const id = req.params.id;
        const { title, photo, description } = req.body;
        const prev_photo = req.body.prevPhoto;
        const postRepository = getRepository(Post);
        let post: Post;
console.log(title, photo, description, 'hello');
        try {
            post = await postRepository.findOneOrFail({
                where: { id: id, user: userId },
            });
        } catch (error) {
            res.status(404).send('Данный товар не найден!');
        }

        if(title) {
            post.title = title;
        }

        if(description) {
            post.description = description;
        }

        if(post && prev_photo && post.photo !== photo ) {
            if(prev_photo) {
                const prevPhotoName = prev_photo.slice(
                    prev_photo.lastIndexOf('/') + 1
                );
                const resolvedPrevPhotoPath = path.resolve(
                    `public\\uploads\\${prevPhotoName}`
                );

                if(fs.existsSync(resolvedPrevPhotoPath)) {
                    fs.unlinkSync(path.resolve(resolvedPrevPhotoPath));
                }
            }

            const data = photo.replace(/^data:image\/\w+;base64,/, '');
            const uniqPhoto = `${userId}-${Date.now()}-post-photo.jpeg`;

            fs.writeFileSync(`./public/uploads/${uniqPhoto}`, `${data}`, 'base64');

            post.photo = uniqPhoto;
        }

        const errors = await validate(post);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }

        try {
            await postRepository.save(post);
        } catch (error) {
            res.status(400).send('Ошибка при изменении описания товара!');
        }
        console.log(post);
        res.status(200).send(post);
    };
}

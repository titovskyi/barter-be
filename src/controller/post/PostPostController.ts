import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../entity/Post';
import { validate } from 'class-validator';
import { User } from '../../entity/User';
import * as fs from 'fs';

export class PostPostController {
    static post = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const { title, photo, description } = req.body;
        const postRepository = getRepository(Post);

        let post = new Post();
        post.title = title;
        post.user = userId;
        post.description = description;

        const data = photo.replace(/^data:image\/\w+;base64,/, '');
        const uniqPhoto = `${userId}-${Date.now()}-post-photo.jpeg`;

        fs.writeFileSync(`./public/uploads/${uniqPhoto}`, `${data}`, 'base64');

        post.photo = uniqPhoto;

        const errors = await validate(post);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }

        try {
            await postRepository.save(post);
        } catch (error) {
            res.status(400).send('Ошибка при сохранении нового объявления!');
        }
        console.log(post);
        res.status(200).send(post);
    };
}

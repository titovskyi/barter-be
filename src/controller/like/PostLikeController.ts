import {Request, Response} from "express";
import {Like} from "../../entity/Like";
import {validate} from "class-validator";
import {getRepository} from "typeorm";

export class PostLikeController {
    static post = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.userId;
        const postId = req.body.postId;
        console.log(postId);
        const like = new Like()
        like.postId = postId;
        like.userId = userId;

        const errors = await validate(like);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const likeRepository = getRepository(Like);

        try{
            await likeRepository.save(like);
        } catch (err) {
            res.status(409).send('Ошибка отметки нравится!');
        }

        res.status(200).send(like);
    }
}

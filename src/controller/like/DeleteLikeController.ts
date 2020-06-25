import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {Like} from "../../entity/Like";

export class DeleteLikeController {
    static delete = async(req: Request, res: Response) => {
        const postId = req.params.id;
        const userId = res.locals.jwtPayload.userId;

        const likeRepository = getRepository(Like);

        try {
            await likeRepository.delete({userId, postId});
        } catch (err) {
            res.status(404).send('Ошибка удаления лайка!');
        }

        res.status(200).send(true);
    }
}

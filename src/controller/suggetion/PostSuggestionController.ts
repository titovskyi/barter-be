import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { PostToPost } from '../../entity/PostToPost';
import { Post } from '../../entity/Post';

export class PostSuggestionController {
    static post = async (req: Request, res: Response) => {
        const postId: string = req.body.postId;
        const suggestionsIds: string[] = req.body.suggestionsIds;
        const postRepository = getRepository(Post);
        const postToPostRepository = getRepository(PostToPost);

        let post: Post;
        let suggestion: Post;

        try {
            post = await postRepository.findOneOrFail(postId, {
                relations: ['user']
            });
        } catch (err) {
            res.status(404).send('Такой пост не существует!');
        }

        try {
            suggestion = await postRepository.findOneOrFail(suggestionsIds[0], {
                relations: ['user']
            });
        } catch (err) {
            res.status(404).send('Ошибка получения товара для предложения!');
        }

        for (let i = 0; suggestionsIds.length > i; i++) {
            try {
                await postToPostRepository.save({
                    postId,
                    postUser: post.user.id,
                    suggestionId: suggestionsIds[i],
                    suggestionUser: suggestion.user.id,
                    postConfirm: false,
                    suggestionConfirm: true,
                });
            } catch (err) {
                res.status(400).send('Ошбика создания предложения!');

                break;
            }
        }
        console.log(post, 'post with suggestions');
        res.status(200).send(post);
    };
}

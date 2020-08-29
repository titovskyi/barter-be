import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {PostToPost} from "../../entity/PostToPost";

export class GetSuggestionsController {
    static get = async(req: Request, res: Response) => {
        const userId: string = res.locals.jwtPayload.userId;
        const suggestionRepository = getRepository(PostToPost);
        const suggestions: PostToPost[] = await suggestionRepository.find({where: {postUser: userId}});
        const uniqueSuggestionUsers = Array.from(new Set(suggestions.map(suggestion => suggestion.suggestionUser)));
        const suggestionsByUser = [];
        console.log(uniqueSuggestionUsers);
        uniqueSuggestionUsers.forEach((userId) => {
            const allSuggestionsByUser = suggestions.filter((suggestion) => suggestion.suggestionUser === userId);
            const userWithSuggestions = {};
            userWithSuggestions[userId] = allSuggestionsByUser;
            suggestionsByUser.push(userWithSuggestions);
        })
        console.log(suggestionsByUser);
        res.status(200).send(suggestionsByUser);
    }
}

import { Router } from 'express';
import { PostSuggestionController } from '../controller/suggetion/PostSuggestionController';
import { GetSuggestionsController } from '../controller/suggetion/GetSuggestionsController';

const routes = Router();

routes.post('/', PostSuggestionController.post);

routes.get('/', GetSuggestionsController.get);

export default routes;

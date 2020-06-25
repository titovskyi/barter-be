import { Router } from 'express';
import { PostPostController } from '../controller/post/PostPostController';
import { PutPostController } from '../controller/post/PutPostController';
import { GetPostController } from '../controller/post/GetPostController';
import { GetPostsController } from '../controller/post/GetPostsController';
import { DeletePostController } from '../controller/post/DeletePostController';
import { GetStripController } from '../controller/post/GetStripController';

const routes = Router();

routes.get('/', GetPostsController.get);

routes.get('/strip', GetStripController.get);

routes.post('/', PostPostController.post);

routes.get('/:id', GetPostController.get);

routes.put('/:id', PutPostController.put);

routes.delete('/:id', DeletePostController.delete);

export default routes;

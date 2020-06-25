import { Router } from 'express';
import { GetConnectedUser } from '../controller/connectedUser/GetConnectedUser';
import { PostConnectedUser } from '../controller/connectedUser/PostConnectedUser';
import { DeleteConnectedUser } from '../controller/connectedUser/DeleteConnectedUser';
import { PostLikeController } from '../controller/like/PostLikeController';
import {DeleteLikeController} from "../controller/like/DeleteLikeController";

const routes = Router();

routes.post('/', PostLikeController.post);

routes.delete('/:id', DeleteLikeController.delete);

export default routes;

import { Router } from 'express';

import { checkJwt } from '../middlewares/checkJwt';

import user from './user';
import post from './post';
import like from './like';

import upload from './upload';


const routes = Router();

routes.use('/user', user);
routes.use('/post', [checkJwt], post);
routes.use('/like', [checkJwt], like);
routes.use('/upload', [checkJwt], upload)

export default routes;

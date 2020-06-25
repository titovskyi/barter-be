import { Router } from 'express';
import { PostUserController } from '../controller/user/PostUserController';
import { LoginController } from '../controller/user/LoginController';
import { GetUserByAuthTokenController } from '../controller/user/GetUserByAuthTokenController';
import { checkJwt } from '../middlewares/checkJwt';
import { PutUserController } from '../controller/user/PutUserController';
import { CheckTokenController } from '../controller/user/CheckTokenController';

import * as multer from 'multer';

const upload = multer({dest: 'uploads/'});

const router = Router();

router.get('/', [checkJwt], GetUserByAuthTokenController.get);

router.get('/check-token', [checkJwt], CheckTokenController.get);

router.put('/', [checkJwt], upload.single('avatar'), PutUserController.put);

router.post('/', PostUserController.post);

router.post('/login', LoginController.login);

export default router;

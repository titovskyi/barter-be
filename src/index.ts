import 'reflect-metadata';
import { createConnection } from 'typeorm';

import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import routes from './routes/index';

createConnection()
    .then(async (connection) => {
        const app = express();

        app.use(cors());
        app.use(helmet());
        // app.use(bodyParser.json());
        app.use(bodyParser.json({limit: "50mb"}));
        app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

        app.use(express.static('./public'));

        app.use('/', routes);

        app.listen(process.env.PORT || 3000, () => {
            console.log('Server started on port 3000!');
        });
    })
    .catch((error) => console.log(error));

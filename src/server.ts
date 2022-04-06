import expressListRoutes from 'express-list-routes';
import App from '@/app';
import AppRouter from './router';
import {denomAPI} from './apis/denom.api'

AppRouter.use(denomAPI)

expressListRoutes(AppRouter);
const app = new App(AppRouter);

app.listen();

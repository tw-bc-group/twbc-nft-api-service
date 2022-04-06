import expressListRoutes from 'express-list-routes';
import App from '@/app';
import AppRouter from './router';
import { api as denomAPI } from './apis/denoms.api';
import { api as collectionAPI } from './apis/collections.api';

AppRouter.use(denomAPI, collectionAPI);

expressListRoutes(AppRouter);
const app = new App(AppRouter);

app.listen();

import expressListRoutes from 'express-list-routes';
import App from '@/app';
import AppRouter from './router';

expressListRoutes(AppRouter);
const app = new App(AppRouter);

app.listen();

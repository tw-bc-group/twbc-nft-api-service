import expressListRoutes from 'express-list-routes';
import App from '@/app';
import AppRouter from './router';
import { api as denomAPI } from './apis/denoms.api';
import { api as collectionAPI } from './apis/collections.api';
import { api as authAPI} from './apis/auth.api';
import { api as mintRecordsAPI} from './apis/mintRecords.api';

AppRouter.use(denomAPI, collectionAPI, authAPI, mintRecordsAPI);

expressListRoutes(AppRouter);
const app = new App(AppRouter);

app.listen();

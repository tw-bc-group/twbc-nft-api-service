import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import NftRoute from '@routes/nft.route';
import FileRoute from '@routes/file.route';

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new NftRoute(), new FileRoute()]);

app.listen();

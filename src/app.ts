import * as bodyParser from 'body-parser';
import * as compression from 'compression'; // compresses requests
import * as express from 'express';
import * as expressValidator from 'express-validator';
import * as path from 'path';

// Controllers (route handlers)
import * as apiController from './controllers/api';
import * as viewController from './controllers/view';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use('/', express.static('public'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Views
app.get('/start', (_req, res) => res.render('index'));
app.post('/one-on-one', viewController.oneOnOneRoute);

// API routes
app.get('/api', apiController.oneOnOneRoute);
app.get('/api/robin', apiController.robinRoute);

export default app;

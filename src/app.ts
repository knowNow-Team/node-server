import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import cors from 'cors';
import { normalize } from 'path';
import Routes from './routes';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import DBConnection from './configs/dbConnection';
import { logger, stream } from './utils/logger';

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    validateEnv();
    this.settings();
    this.middlewares();
    this.routes();
    (() => new DBConnection())();
  }

  private settings(): void {
    this.app.set('port', normalize(process.env.PORT || '3000'));
  }

  private initializeMiddlewares(): void {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(hpp());
    this.app.use(helmet());
  }

  private routes(): void {
    this.app.use(new Routes().router);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      logger.info(
        `!!!App is running at http://localhost:${process.env.PORT || '3000'} in ${process.env.NODE_ENV} mode!!!`,
      );
    });
  }
}

export default Application;

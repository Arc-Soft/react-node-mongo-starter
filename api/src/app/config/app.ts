import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as acl from 'acl';
import * as cors from 'cors';
import { Routes } from './routes';
import { PassportConfig } from './passportConfig';
import { MongoConfig } from './mongo';

interface XX {
  connection?: any;
}
export class App {
  public app: express.Application;
  public mongo: MongoConfig;
  public acl;

  constructor() {
    dotenv.config();
    this.mongo = new MongoConfig();
    this.app = express();
    this.start();
  }

  public async start() {
    const mongx = await this.mongoSetup();
    this.acl = new acl(new acl.mongodbBackend(mongx.connection.db));
    // this.acl.allow('guest', 'blogs', 'view');
    this.acl.allow([{
      roles: ['Researcher'],
      allows: [
          { resources: ['/'], permissions: ['get']}
      ]
  }])
    this.appSetup();
    new PassportConfig(this.app);
    new Routes(this.app, this.acl);
  }

  private appSetup() {
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.listen(process.env.PORT || 8080);
  }

  public async mongoSetup(dbType?): Promise<XX> {
    return await this.mongo.setup(dbType);
  }
}

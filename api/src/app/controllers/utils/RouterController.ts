import * as express from 'express';
const router = express.Router();

export class RouterController {
  protected router;

  constructor() {
    this.router = router;
  }

  public getRouter() {
    return this.router;
  }

}

export default RouterController;

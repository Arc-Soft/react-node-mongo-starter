import { Request, Response } from 'express';
import * as passport from 'passport';
import { UserController } from '../controllers/user';
import SettingsController from './../controllers/settings';
import { AuthController } from '../controllers/auth';

export class Routes {
  private authController = new AuthController();
  private userController = new UserController();
  private settingsController = new SettingsController();
  constructor(app, acl) {
    app.use('/auth', this.authController.getRouter());
    app.use('/settings', this.secured, this.settingsController.getRouter());
    app.use('/user', this.secured, this.userController.getRouter());
  }

  private secured = (req, res, next) => {
    return passport.authenticate(
      'jwt',
      { session: false, failWithError: true },
      (err, user, info) => {
        if (err || !user || info) {
          const err = { code: 0, message: '' };
          err.code = 401;
          err.message = 'auth.unauthorized';

          return res.status(401).json(err);
        }
        req.user = user;
        return next();
      }
    )(req, res, next);
  };
}

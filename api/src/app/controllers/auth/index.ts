import { Request, Response } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt-nodejs';
import { User } from './../../models/user';
import { AUTH_TOKEN_EXPIRATION } from '../../constants/auth';
import RouterController from '../utils/RouterController';

export class AuthController extends RouterController {
  constructor() {
    super();
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
    this.router.post('/logout', this.logout);
  }

  private register(req: Request, res: Response) {
    const newUser = new User(req.body);
    const newPassword = bcrypt.hashSync(newUser.password);
    newUser.password = newPassword;
    newUser.email = newUser.email.toLowerCase();
    newUser.save((err, savedUser) => {
      if (err) {
        res.status(400).send({
          message: 'auth.register.exists'
        });
        return;
      }
      res.json(savedUser);
    });
  }

  private logout(req, res) {
    res.json({});
  }

  private login(req: Request, res: Response, next) {
    passport.authenticate(
      'local',
      { failWithError: true },
      (err, user, message) => {
        if (err || !user) {
          return res.status(400).json(message);
        }
        req.logIn(user, { session: false }, err => {
          if (err) {
            res.send(err);
          }
          const token = jwt.sign(
            {
              data: user._id,
              user,
              exp: Math.floor(Date.now() / 1000) + AUTH_TOKEN_EXPIRATION
            },
            process.env.JWT_SECRET
          );
          return res.json({ token });
        });
      }
    )(req, res, next);
  }
}

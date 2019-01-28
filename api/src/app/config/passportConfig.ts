import * as passport from 'passport';
import { User } from '../models/user';
import * as passportLocal from 'passport-local';

import * as bcrypt from 'bcrypt-nodejs';
import * as passportJWT from 'passport-jwt';

export class PassportConfig {
  private jWTStrategy = passportJWT.Strategy;
  private extractJWT = passportJWT.ExtractJwt;

  constructor(app) {
    passport.use(
      new passportLocal.Strategy(
        { usernameField: 'email' },
        (email, password, done) => {
          User.findOne({ email: email.toLowerCase() },'+password firstName lastName', { lean: true })
            .exec((err, user: any) => {
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false, {
                  message: 'auth.login.nomatch'
                });
              }
              if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {
                  message: 'auth.login.nomatch'
                });
              }
              const reqUser = { ...user };
              delete reqUser.password;
              return done(null, reqUser);
            });
        }
      )
    );

    passport.use(
      new this.jWTStrategy(
        {
          jwtFromRequest: this.extractJWT.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET
        },
        (jwtPayload, done) => {
          return done(null, jwtPayload);
        }
      )
    );

    app.use(passport.initialize());
  }
}

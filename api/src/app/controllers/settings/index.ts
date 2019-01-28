import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import RouterController from '../utils/RouterController';
import { User } from './../../models/user';
import { AUTH_TOKEN_EXPIRATION } from '../../constants/auth';

export class SettingsController extends RouterController {
  constructor() {
    super();
    this.router.post('/change-password', this.changePassword);
    this.router.post('/change-personal', this.changePersonalInformation);
  }

  private changePersonalInformation = (req, res) => {
    const { firstName, lastName } = req.body;
    User.findOneAndUpdate(
      { _id: req.user.data },
      { $set: { firstName, lastName } },
      { new: true }
    ).select("email firstName lastName").exec((err, user) => {
      if (err) {
        res.status(400).end(err);
        return;
      }
      const token = jwt.sign(
        {
          data: user._id,
          user,
          exp: Math.floor(Date.now() / 1000) + AUTH_TOKEN_EXPIRATION
        },
        process.env.JWT_SECRET
      );
      res.json({ message: 'settings.changePersonalInformation.success', token });
    });
  };

  private changePassword = (req, res) => {
    const { currentpassword, repassword, password } = req.body;
    User.findById(req.user.data)
      .select('+password')
      .exec((err, user) => {
        if (!bcrypt.compareSync(currentpassword, user.password)) {
          res.status(400).end({ message: 'settings.changePassword.wrongCurrentPassword' });
          return;
        }
        if (password !== repassword) {
          res.status(400).end('settings.changePassword.noMatch');
          return;
        }
        if (err) {
          res.status(400).end(err);
          return;
        }
        user.password = bcrypt.hashSync(password);
        user.save();
        res.json({ message: 'settings.changePassword.success' });
      });
  };
}

export default SettingsController;

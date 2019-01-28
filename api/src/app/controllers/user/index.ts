import RouterController from '../utils/RouterController';
import { User } from './../../models/user';

export class UserController extends RouterController {
  constructor() {
    super();
    this.router.get('/me', this.getCurrentUser);
  }

  private getCurrentUser = (req, res) => {
    const { firstName, lastName } = req.body;
    User.findOne(
      { _id: req.user.data }
    ).select("email firstName lastName").exec((err, user) => {
      if (err) {
        res.status(400).end(err);
        return;
      }

      res.json({ message: 'settings.changePersonalInformation.success', user });
    });
  };
}

export default UserController;

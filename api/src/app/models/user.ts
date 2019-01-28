import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const USER_SCHEMA = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const USER = 'User';

export const User = mongoose.model(USER, USER_SCHEMA);

import { Model, Schema, model } from 'mongoose';
import { ROLES } from '../helpers/constans';

export interface IUser {
  name: string;
  email: string;
  password: string;
  rol?: string;
  code?: string;
  verified?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  rol: {
    type: String,
    default: ROLES.user,
  },
  code: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
    // change default to true for testing, reset to false when finished
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, code, ...user } = this.toObject();
  return user;
};

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;

import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  roles: [String],
});

userSchema.plugin(passportLocalMongoose);

const userModel = model('users', userSchema);

export default userModel;
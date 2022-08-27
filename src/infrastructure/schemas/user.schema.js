import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const schema = new Schema({
  _id: { type: String, _id: false },
  name: { type: String, unique: true, index: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: false },
  portfolio: { type: [String], required: false },
  roles: { type: [String], required: false },
});

export const UserSchema = model('User', schema);

import User from '../models/user.model.js';
import signToken from '../services/auth.service.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  // check if email or phone exist on db
  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) {
    return res.status(400).json({
      message: 'Email or phone already exists',
    });
  }
  const passwordHashed = bcrypt.hashSync(password, 10);
  const user = await User.create({ firstName, lastName, email, phone, password: passwordHashed });
  const token = signToken(user);
  res.status(201).json({ token, user });
}

export const login = async (req, res) => {
  const {username, password} = req.body;
  // check if email or phone exist
  const user = await User.findOne({ $or: [{ email: username }, { phone: username }] });
  if(!user) {
    return res.status(400).json({
      message: 'Email or phone does not exist',
    });
  }
  // check if password is correct
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if(!isPasswordCorrect) {
    return res.status(400).json({
      message: 'Password is incorrect',
    });
  }
  const token = signToken(user);
  res.status(200).json({ token, user });
}
export default  register;
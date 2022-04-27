import bcrypt from 'bcryptjs';
import User from '../database/models/User';
import TokenGenerator from '../tokenGenerator';

export default class LoginService {
  public login = async (email: string, password: string) => {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) return { code: 404, message: 'User not found' };

    const verifyPassword = await bcrypt.compare(password, findUser.password);

    if (!verifyPassword) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const user = {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
      role: findUser.role,
    };

    const tokenInstance = new TokenGenerator();
    const token = await tokenInstance.tokenGenerator(user);

    return { code: 200, user: { user, token } };
  };
}

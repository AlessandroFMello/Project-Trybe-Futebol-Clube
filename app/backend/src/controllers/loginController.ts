import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { code, user, message } = await this.loginService.login(email, password);

    if (!user) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(user);
  };
}

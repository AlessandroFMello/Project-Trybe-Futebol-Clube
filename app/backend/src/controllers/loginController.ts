import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import LoginService from '../services/loginService';
import TokenGenerator from '../tokenGenerator';

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

  public validation = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).json({ message: 'Unauthorized' });
    }

    const tokenGenerator = new TokenGenerator();

    const decodedUser = await tokenGenerator.decodeToken(authorization) as JwtPayload;

    return res.status(200).json(decodedUser.role);
  };
}

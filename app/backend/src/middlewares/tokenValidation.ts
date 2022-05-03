import { NextFunction, Request, Response } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
// import TokenGenerator from '../tokenGenerator';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(404).json({ message: 'Unauthorized' });
    }

    // const tokenGenerator = new TokenGenerator();

    // const decodedUser = tokenGenerator.decodeToken(authorization) as JwtPayload;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Unauthorized' });
  }
};

export default tokenValidation;

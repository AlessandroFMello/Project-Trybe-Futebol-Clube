import * as jwt from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import TokenShape from './interfaces/tokenShape';

export default class TokenGenerator {
  public tokenGenerator = async (
    { id, username, email, role }: TokenShape,
  ) => jwt.sign(
    { id, username, email, role },
    await readFile('jwt.evaluation.key', 'utf8'),
    { expiresIn: '7d', algorithm: 'HS256' },
  );
}

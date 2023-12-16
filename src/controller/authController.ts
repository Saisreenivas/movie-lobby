import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../helpers';
import { userModel } from '../models';

const requiresAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new CustomError(401, 'UNAUTHORIZED');
  }
  const encoded = authorization.split(' ')[1];

  if (!encoded) {
    throw new CustomError(401, 'UNAUTHORIZED');
  }

  const [username, password] = Buffer.from(encoded, 'base64').toString().split(':');

  const user = await userModel.authenticate()(username, password);

  if (!user || user.error || !user.user) {
    throw new CustomError(401, 'UNAUTHORIZED');
  }

  if (user.user.roles.includes('admin')) {
    return next();
  }

  throw new CustomError(401, 'UNAUTHORIZED');
}

const activeRoles = new Set(['admin', 'user']);

const registerUser = async (payload: { username: string, password: string, roles: string[] }) => {
  const { username, password, roles } = payload;
  if (roles.some((role: string) => !activeRoles.has(role))) {
    throw new Error('Invalid role')
  }

  const result = await userModel.register(new userModel({ username, roles }), password);

  if (!result) {
    console.log('Invalid user', result);
    throw new Error('Invalid user');
  }

  return { message: 'User registered successfully' };
};

export { requiresAdmin, registerUser }
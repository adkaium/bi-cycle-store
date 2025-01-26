import jwt, { SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

// export const createToken = (
//   jwtPayload: { userId: string; role: string },
//   secret: string,
//   expiresIn: string,
// ) => {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn,
//   });
// };

export const createToken = (
  jwtPayload: { userId: Types.ObjectId; role: string },
  secret: jwt.Secret,
  expiresIn: number | string,
) => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  };
  return jwt.sign(jwtPayload, secret, options);
}

import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'flex',
  expiresIn: process.env.JWT_EXPIRES_IN || '150d',
}));

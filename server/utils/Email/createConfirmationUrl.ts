import { v4 } from 'uuid';
import { redis } from '../../redis';
import { accountConfirmationPrefix } from '../constants/redisPrefixes';

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();

  await redis.set(
    accountConfirmationPrefix + token,
    userId,
    'ex',
    60 * 60 * 24 * 7
  ); // 7 days expiration

  return `http://localhost:3000/confim/${token}`;
};

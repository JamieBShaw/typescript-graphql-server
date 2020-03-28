import { v4 } from 'uuid';
import { redis } from '../../redis';

export const createConfirmationUrl = async (userId: number) => {
  const id = v4();

  await redis.set(id, userId, 'ex', 60 * 60 * 24 * 7); // 7 days expiration

  return `http://localhost:3000/confim/${id}`;
};

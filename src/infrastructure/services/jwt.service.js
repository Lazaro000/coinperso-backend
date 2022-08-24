/**
 * ! import { sign, verify } from 'jsonwebtoken'
 * * DO NOT use this import, because jwt supports CommonJS module
 */
import config from '#Config/config.js';
import jsonwebtoken from 'jsonwebtoken';

const jwtSecret = config.JWT_PRIVATE_KEY;

export const signAsync = (payload, signOptions) =>
  new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, jwtSecret, signOptions, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });

export const verifyAsync = (token) =>
  new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, jwtSecret, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });

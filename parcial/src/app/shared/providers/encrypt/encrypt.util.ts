import * as CryptoJS from 'crypto-js';

export class EncryptUtil {
  static hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }
}

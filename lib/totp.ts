import { generateSecret, generateURI, verifySync } from "otplib";

export function generateTotpSecret(): string {
  return generateSecret({ length: 20 });
}

export function verifyTotpToken(token: string, secret: string): boolean {
  const result = verifySync({ secret, token, strategy: "totp", epochTolerance: 1 });
  return result.valid;
}

export function getTotpUri(email: string, secret: string): string {
  return generateURI({
    strategy: "totp",
    issuer: "Karmameter Admin",
    label: email,
    secret,
  });
}

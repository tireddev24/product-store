export interface JwtUserPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

import { decodeJwt, jwtVerify } from "jose";
import type { IUser } from "~/modules/user/interfaces";
import type { H3Event } from "h3";

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env["JWT_SECRET"]!)
    );
    return Boolean(payload);
  } catch (error) {
    // eslint-disable-next-line
    console.log("Error verify token: ", error);
    return false;
  }
};

export const decodeToken = <T = IUser>(event: H3Event) => {
  const cookies = parseCookies(event as H3Event);
  const token = cookies[process.env.AUTH_COOKIE_NAME!];
  if (token) {
    return decodeJwt(token) as T;
  }
  return null;
};

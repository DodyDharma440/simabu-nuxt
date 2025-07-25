import { createSecretKey } from "crypto";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import prisma from "~~/lib/prisma";
import type { ILoginInput } from "~/modules/auth/interfaces";
import { createResponse } from "~/common/utils/api-response";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  const isLogin = !!cookies[process.env.AUTH_COOKIE_NAME!];

  if (isLogin) {
    throw createError({
      status: 400,
      statusMessage: "You already logged in!",
    });
  }

  const body = await readBody(event);

  const { username, password } = body as ILoginInput;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });

  const checkPassword = bcrypt.compareSync(password, user?.password || "");
  if (!checkPassword || !user) {
    throw createError({
      status: 400,
      statusMessage: "Username or password not match",
    });
  }

  const { id, role } = user;

  const token = await new SignJWT({ id, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(createSecretKey(process.env["JWT_SECRET"]!, "utf-8"));

  setCookie(event, process.env.AUTH_COOKIE_NAME!, token, {
    httpOnly: true,
    expires: dayjs().add(1, "day").toDate(),
    path: "/",
  });

  return createResponse({ token });
});

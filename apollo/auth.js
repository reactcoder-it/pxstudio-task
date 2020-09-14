import jwt from "jsonwebtoken"
import cookie from "cookie"

export const auth = async (context) => {
  const parsedCookie = cookie.parse(context.req.headers.cookie ?? "")
  const token = parsedCookie.token ?? context.req.headers.authorization

  if (!token || token === "") {
    return { isAuth: false }
  }

  try {
    const { userId } = await jwt.verify(token, process.env.TOKEN_SECRET)
    return { isAuth: true, userId }
  } catch (error) {
    return { isAuth: false }
  }
}

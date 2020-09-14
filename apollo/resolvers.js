import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"
import { auth } from "./auth"

export const resolvers = {
  Query: {
    async quizes(parent, args, context) {
      const { db } = context

      let s = null
      let l = args.limit ? args.limit : 0

      if (args.sortby) {
        if (args.sortby == "CITY") s = { city: 1 }
        if (args.sortby == "GAME_TYPE") s = { gameType: 1 }
        if (args.sortby == "DATE") s = { date: -1 }
      }

      return await db.collection("quizes").find().sort(s).limit(l).toArray()
    },

    async quiz(parent, args, context) {
      const { id } = args
      const { db } = context

      return await db.collection("quizes").findOne({ _id: +id })
    },

    async commands(parent, args, context) {
      const { db } = context

      return await db
        .collection("commands")
        .find()
        .sort({ score: -1 })
        .toArray()
    },

    async command(parent, args, context) {
      const { id } = args
      const { db } = context

      return await db.collection("commands").findOne({ _id: ObjectId(id) })
    },

    async gameTypes(parent, args, context) {
      const { db } = context

      return await db.collection("quizes").distinct("gameType")
    },

    async cities(parent, args, context) {
      const { db } = context

      return await db.collection("quizes").distinct("city")
    },

    async viewer(parent, args, context) {
      const { db } = context
      const { isAuth, userId } = await auth(context)

      console.log({ userId })

      if (!isAuth) {
        return { isLoggedIn: false }
      }

      const user = await db
        .collection("users")
        .findOne({ _id: ObjectId(userId) })

      return {
        ...user,
        isLoggedIn: true,
      }
    },
  },

  Mutation: {
    async buy(parent, args, context) {
      const { id } = args
      const { db } = context
      const quiz = await db.collection("quizes").findOne({ _id: +id })

      // let message = {
      //   from: 'vmp@live.ru',
      //   to: 'vmp@live.ru',
      //   subject: 'Письмо',
      //   text: JSON.stringify(qz),
      //   // html: ''
      // }

      // transport.sendMail(message, (err) => {
      //   if (err)
      //     console.log(err)
      //   console.log('Message sended succefully...')
      // })

      return quiz
    },

    async createQuiz(parent, args, context) {
      const { input } = args
      const { db } = context
      const { isAuth } = await auth(context)

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      const result = await db.collection("quizes").insertOne({ ...input })

      if (result && result.result.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async editQuiz(parent, args, context) {
      const { id, input } = args
      const { db } = context
      const { isAuth } = await auth(context)

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      const quiz = await db
        .collection("quizes")
        .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...input } })

      if (quiz && quiz.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async deleteQuiz(parent, args, context) {
      const { id } = args
      const { db } = context
      const { isAuth } = await auth(context)

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      let quiz = await db.collection("quizes").deleteOne({ _id: ObjectId(id) })

      if (quiz && quiz.result.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async editCommand(parent, args, context) {
      const { id, input } = args
      const { isAuth } = await auth(context)
      const { db } = context

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      const command = await db
        .collection("commands")
        .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...input } })

      if (command && command.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async createCommand(parent, args, context) {
      const { input } = args
      const { db } = context
      const { isAuth } = await auth(context)

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      const command = await db.collection("commands").insertOne({ ...input })

      if (command && command.result.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async deleteCommand(parent, args, context) {
      const { id } = args
      const { db } = context
      const { isAuth } = await auth(context)

      if (!isAuth) {
        throw new Error("Пользователь неавторизован!")
      }

      const command = await db
        .collection("commands")
        .deleteOne({ _id: ObjectId(id) })

      if (command && command.result.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },

    async userLogin(parent, args, context) {
      const { email, password } = args
      const { db } = context

      const user = await db.collection("users").findOne({ email })

      if (!user) {
        throw new Error("Пользователь не найден в системе!")
      }

      const isEqual = bcrypt.compare(password, user.password)
      if (!isEqual) {
        throw new Error("Пароль не верен. Попробуйте еще раз!")
      }

      const payload = { userId: user._id }
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      })

      return { token }
    },

    async userCreate(parent, args, context) {
      const { email, password } = args
      const { db } = context

      const user = await db.collection("users").findOne({ email })

      if (user) {
        throw new Error("Пользователь с таким email уже существует!")
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const result = await db
        .collection("users")
        .insertOne({ email, password: hashedPassword })

      if (result && result.result.ok) {
        return "SUCCESS"
      }

      return "ERROR"
    },
  },
}

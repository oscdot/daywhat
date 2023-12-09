import { v } from 'convex/values'

import { Id } from './_generated/dataModel'
import { queryWithAuth, mutationWithAuth } from './withAuth'

export const get = queryWithAuth({
  args: {},
  handler: async (ctx) => {
    return ctx.session?.user
  },
})

export const signOut = mutationWithAuth({
  args: {},
  handler: async (ctx) => {
    const userFromSession = ctx.session?.user
    if (!userFromSession) return false

    const user = await ctx.db.get(userFromSession._id)

    if (user === null) {
      console.log('No user found for session', userFromSession._id)
      return false
    }

    const session = await ctx.db
      .query('sessions')
      .withIndex('byUserId', (q) => q.eq('user_id', user.id))
      .first()

    if (!session) return null

    await ctx.db.delete(session._id)
    return true
  },
})

export const signIn = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    try {
      const key = await ctx.auth.useKey('password', email, password)
      const session = await ctx.auth.createSession({
        attributes: {
          _creationTime: 0,
          // These will be filled out by Convex
          _id: '' as Id<'sessions'>,
        },
        userId: key.userId,
      })
      return session.sessionId
    } catch (error) {
      console.log(error)
    }
  },
})

export const signUp = mutationWithAuth({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    try {
      const user = await ctx.auth.createUser({
        attributes: {
          _creationTime: 0,
          // These will be filled out by Convex
          _id: '' as Id<'users'>,
          email,
        },
        key: {
          password,
          providerId: 'password',
          providerUserId: email,
        },
      })
      const session = await ctx.auth.createSession({
        attributes: {
          _creationTime: 0,
          // These will be filled out by Convex
          _id: '' as Id<'sessions'>,
        },
        userId: user.userId,
      })
      return session.sessionId
    } catch (error) {
      console.log(error)
    }
  },
})

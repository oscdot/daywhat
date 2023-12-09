import { defineSchema, defineTable } from 'convex/server'
import { Validator, v } from 'convex/values'

export default defineSchema({
  ...authTables({
    session: {},
    user: { email: v.string() },
  }),
})

function authTables<
  UserFields extends Record<string, Validator<any, any, any>>,
  SchemaFields extends Record<string, Validator<any, any, any>>,
>({ session, user }: { user: UserFields; session: SchemaFields }) {
  return {
    auth_keys: defineTable({
      hashed_password: v.union(v.string(), v.null()),
      id: v.string(),
      user_id: v.string(),
    })
      .index('byId', ['id'])
      .index('byUserId', ['user_id']),
    sessions: defineTable({
      ...session,
      active_expires: v.float64(),
      id: v.string(),
      idle_expires: v.float64(),
      user_id: v.string(),
    })
      // `as any` because TypeScript can't infer the table fields correctly
      .index('byId', ['id' as any])
      .index('byUserId', ['user_id' as any]),
    users: defineTable({
      ...user,
      id: v.string(),
    }).index('byId', ['id']),
  }
}

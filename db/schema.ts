import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todos', {
  id: text('id').primaryKey(),
  todo: text('todo').notNull(),
  done: integer('done').notNull().default(0),
  author: text('author').notNull(),
});

export type AddTodo = typeof todoTable.$inferInsert;
export type ToggleTodo = typeof todoTable.$inferSelect;
export type DeleteTodo = typeof todoTable.$inferSelect;

import { serial, uniqueIndex, pgTable, text, timestamp, pgEnum, integer, AnyPgColumn } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { sum, eq } from 'drizzle-orm';

export const userEnum = pgEnum('role', ['admin', 'client' ]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('numero').notNull().unique(),
  email: text('email').unique(),
  image: text('image'),
  password: text('password').default('1234'),
  role: userEnum('role').notNull().default('client'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (users) => {
  return {
    nameIndex: uniqueIndex("name_idx").on(users.name)
  }
});

export const forfaits = pgTable('forfaits_internet', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  forfait: integer('forfait').notNull().default(0),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
});

export const credits = pgTable('credits', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  forfaitId: integer('forfait_id').references(() => forfaits.id),
  credit: integer('credit').notNull().default(0),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
});

export const totalCredit = pgTable('total_credit', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  total_credit: integer('total_credit').notNull().default(0)
}, (totalCredit) => {
  return {
    userCreditIndex: uniqueIndex("userId_idx").on(totalCredit.userId)
  }
});

export const retraitCredit = pgTable('retrait_credit', {
  id: serial('id').primaryKey(),
  totalCreditId: integer('total_credit_id').references(() => totalCredit.id),
  quantity: integer('quantity').notNull().default(0),
  data_forfait: text('data_forfait').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
  status: text('status', { enum : ['en attente', 'réussi', 'échec'] }).notNull().default('en attente'),
})
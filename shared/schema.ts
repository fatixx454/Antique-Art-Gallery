import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const paintings = pgTable("paintings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  year: text("year").notNull(),
  description: text("description").notNull(),
  museum: text("museum").notNull(),
  period: text("period").notNull(),
  medium: text("medium").notNull(),
  country: text("country").notNull(),
  artistBio: text("artist_bio").notNull().default(""),
  famousDate: text("famous_date").notNull().default(""),
  imageUrl: text("image_url").notNull(),
  artistImageUrl: text("artist_image_url").default(""),
});

export const insertPaintingSchema = createInsertSchema(paintings).omit({
  id: true,
});

export type InsertPainting = z.infer<typeof insertPaintingSchema>;
export type Painting = typeof paintings.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

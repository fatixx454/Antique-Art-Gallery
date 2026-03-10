import { type Painting, type InsertPainting, type User, type InsertUser, paintings, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPaintings(): Promise<Painting[]>;
  getPainting(id: number): Promise<Painting | undefined>;
  createPainting(painting: InsertPainting): Promise<Painting>;
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getPaintings(): Promise<Painting[]> {
    return await db.select().from(paintings).orderBy(paintings.id);
  }

  async getPainting(id: number): Promise<Painting | undefined> {
    const [painting] = await db.select().from(paintings).where(eq(paintings.id, id));
    return painting;
  }

  async createPainting(painting: InsertPainting): Promise<Painting> {
    const [created] = await db.insert(paintings).values(painting).returning();
    return created;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [created] = await db.insert(users).values(user).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();

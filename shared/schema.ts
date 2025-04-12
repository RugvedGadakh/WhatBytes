import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatar: true,
});

export const skillTests = pgTable("skill_tests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon").notNull(),
  questions: integer("questions").notNull(),
  duration: integer("duration").notNull(),
  submittedAt: timestamp("submitted_at").notNull(),
});

export const insertSkillTestSchema = createInsertSchema(skillTests).pick({
  title: true,
  icon: true,
  questions: true,
  duration: true,
  submittedAt: true,
});

export const skillTestResults = pgTable("skill_test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  testId: integer("test_id").notNull(),
  rank: integer("rank").notNull(),
  percentile: decimal("percentile").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
});

export const insertSkillTestResultSchema = createInsertSchema(skillTestResults).pick({
  userId: true,
  testId: true,
  rank: true,
  percentile: true,
  score: true,
  maxScore: true,
});

export const syllabusResults = pgTable("syllabus_results", {
  id: serial("id").primaryKey(),
  testResultId: integer("test_result_id").notNull(),
  title: text("title").notNull(),
  percentage: decimal("percentage").notNull(),
  color: text("color").notNull(),
});

export const insertSyllabusResultSchema = createInsertSchema(syllabusResults).pick({
  testResultId: true,
  title: true,
  percentage: true,
  color: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSkillTest = z.infer<typeof insertSkillTestSchema>;
export type SkillTest = typeof skillTests.$inferSelect;

export type InsertSkillTestResult = z.infer<typeof insertSkillTestResultSchema>;
export type SkillTestResult = typeof skillTestResults.$inferSelect;

export type InsertSyllabusResult = z.infer<typeof insertSyllabusResultSchema>;
export type SyllabusResult = typeof syllabusResults.$inferSelect;

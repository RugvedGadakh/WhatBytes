import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertSkillTestResultSchema,
  SkillTestResult,
  SkillTest,
  SyllabusResult,
  User
} from "@shared/schema";

interface TestResultWithDetails {
  result: SkillTestResult;
  test: SkillTest;
  syllabusResults: SyllabusResult[];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user
  app.get("/api/me", async (req: Request, res: Response) => {
    try {
      // For demo purposes, we'll return the first user (Rahil)
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get skill tests
  app.get("/api/skill-tests", async (req: Request, res: Response) => {
    try {
      const tests = await storage.listSkillTests();
      return res.json(tests);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch skill tests" });
    }
  });

  // Get specific skill test
  app.get("/api/skill-tests/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid test ID" });
      }
      
      const test = await storage.getSkillTest(id);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      
      return res.json(test);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch skill test" });
    }
  });

  // Get test result with test details and syllabus results
  app.get("/api/test-results/:testId", async (req: Request, res: Response) => {
    try {
      const testId = parseInt(req.params.testId);
      if (isNaN(testId)) {
        return res.status(400).json({ message: "Invalid test ID" });
      }
      
      // For demo purposes, we'll use userId = 1 (Rahil)
      const userId = 1;
      
      const result = await storage.getTestResultByUserAndTest(userId, testId);
      if (!result) {
        return res.status(404).json({ message: "Test result not found" });
      }
      
      const test = await storage.getSkillTest(testId);
      if (!test) {
        return res.status(404).json({ message: "Test not found" });
      }
      
      const syllabusResults = await storage.getSyllabusResults(result.id);
      
      const response: TestResultWithDetails = {
        result,
        test,
        syllabusResults
      };
      
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch test result" });
    }
  });

  // Update test result
  app.put("/api/test-results/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid result ID" });
      }
      
      const updateData = req.body;
      console.log("Update data received:", updateData);
      
      // Use a more permissive validation that only checks the fields we care about
      const updateSchema = z.object({
        rank: z.number().min(1).optional(),
        percentile: z.number().min(0).max(100).optional(),
        score: z.number().min(0).max(15).optional(),
      });
      
      const validationResult = updateSchema.safeParse(updateData);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid update data", 
          errors: validationResult.error.errors 
        });
      }
      
      // Only include the fields we want to update
      const filteredUpdateData = {
        ...(updateData.rank !== undefined && { rank: updateData.rank }),
        ...(updateData.percentile !== undefined && { percentile: updateData.percentile }),
        ...(updateData.score !== undefined && { score: updateData.score }),
      };
      
      const updatedResult = await storage.updateTestResult(id, filteredUpdateData);
      return res.json(updatedResult);
    } catch (error) {
      console.error("Error updating test result:", error);
      return res.status(500).json({ message: "Failed to update test result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

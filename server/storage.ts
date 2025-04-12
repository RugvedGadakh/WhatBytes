import { 
  users, type User, type InsertUser,
  skillTests, type SkillTest, type InsertSkillTest,
  skillTestResults, type SkillTestResult, type InsertSkillTestResult,
  syllabusResults, type SyllabusResult, type InsertSyllabusResult
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSkillTest(id: number): Promise<SkillTest | undefined>;
  listSkillTests(): Promise<SkillTest[]>;
  createSkillTest(test: InsertSkillTest): Promise<SkillTest>;
  
  getTestResult(id: number): Promise<SkillTestResult | undefined>;
  getTestResultByUserAndTest(userId: number, testId: number): Promise<SkillTestResult | undefined>;
  createTestResult(result: InsertSkillTestResult): Promise<SkillTestResult>;
  updateTestResult(id: number, result: Partial<InsertSkillTestResult>): Promise<SkillTestResult>;
  
  getSyllabusResults(testResultId: number): Promise<SyllabusResult[]>;
  createSyllabusResult(result: InsertSyllabusResult): Promise<SyllabusResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skillTests: Map<number, SkillTest>;
  private skillTestResults: Map<number, SkillTestResult>;
  private syllabusResults: Map<number, SyllabusResult>;
  
  private userId: number;
  private testId: number;
  private resultId: number;
  private syllabusId: number;

  constructor() {
    this.users = new Map();
    this.skillTests = new Map();
    this.skillTestResults = new Map();
    this.syllabusResults = new Map();
    
    this.userId = 1;
    this.testId = 1;
    this.resultId = 1;
    this.syllabusId = 1;
    
    // Initialize with default data
    this.initializeData();
  }

  private initializeData() {
    // Create a default user
    const user: User = {
      id: this.userId++,
      username: "rahil",
      password: "password",
      displayName: "Rahil Siddique",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    };
    this.users.set(user.id, user);
    
    // Create a default HTML test
    const htmlTest: SkillTest = {
      id: this.testId++,
      title: "Hyper Text Markup Language",
      icon: "html5",
      questions: 8,
      duration: 15,
      submittedAt: new Date("2021-06-05")
    };
    this.skillTests.set(htmlTest.id, htmlTest);
    
    // Create default test result
    const testResult: SkillTestResult = {
      id: this.resultId++,
      userId: user.id,
      testId: htmlTest.id,
      rank: 1,
      percentile: 30,
      score: 10,
      maxScore: 15
    };
    this.skillTestResults.set(testResult.id, testResult);
    
    // Create default syllabus results
    const syllabusItems = [
      { title: "HTML Tools, Forms, History", percentage: 80, color: "primary" },
      { title: "Tags & References in HTML", percentage: 60, color: "secondary" },
      { title: "Tables & References in HTML", percentage: 24, color: "danger" },
      { title: "Tables & CSS Basics", percentage: 96, color: "success" }
    ];
    
    syllabusItems.forEach(item => {
      const syllabus: SyllabusResult = {
        id: this.syllabusId++,
        testResultId: testResult.id,
        title: item.title,
        percentage: item.percentage,
        color: item.color
      };
      this.syllabusResults.set(syllabus.id, syllabus);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getSkillTest(id: number): Promise<SkillTest | undefined> {
    return this.skillTests.get(id);
  }
  
  async listSkillTests(): Promise<SkillTest[]> {
    return Array.from(this.skillTests.values());
  }
  
  async createSkillTest(test: InsertSkillTest): Promise<SkillTest> {
    const id = this.testId++;
    const skillTest: SkillTest = { ...test, id };
    this.skillTests.set(id, skillTest);
    return skillTest;
  }
  
  async getTestResult(id: number): Promise<SkillTestResult | undefined> {
    return this.skillTestResults.get(id);
  }
  
  async getTestResultByUserAndTest(userId: number, testId: number): Promise<SkillTestResult | undefined> {
    return Array.from(this.skillTestResults.values()).find(
      (result) => result.userId === userId && result.testId === testId
    );
  }
  
  async createTestResult(result: InsertSkillTestResult): Promise<SkillTestResult> {
    const id = this.resultId++;
    const testResult: SkillTestResult = { ...result, id };
    this.skillTestResults.set(id, testResult);
    return testResult;
  }
  
  async updateTestResult(id: number, result: Partial<InsertSkillTestResult>): Promise<SkillTestResult> {
    const existingResult = this.skillTestResults.get(id);
    
    if (!existingResult) {
      throw new Error(`Test result with id ${id} not found`);
    }
    
    const updatedResult: SkillTestResult = { ...existingResult, ...result };
    this.skillTestResults.set(id, updatedResult);
    return updatedResult;
  }
  
  async getSyllabusResults(testResultId: number): Promise<SyllabusResult[]> {
    return Array.from(this.syllabusResults.values()).filter(
      (result) => result.testResultId === testResultId
    );
  }
  
  async createSyllabusResult(result: InsertSyllabusResult): Promise<SyllabusResult> {
    const id = this.syllabusId++;
    const syllabusResult: SyllabusResult = { ...result, id };
    this.syllabusResults.set(id, syllabusResult);
    return syllabusResult;
  }
}

export const storage = new MemStorage();

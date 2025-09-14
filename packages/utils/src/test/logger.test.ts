/*
 * Copyright 2025 ChainBrawler Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock pino to avoid actual logging during tests
vi.mock("pino", () => ({
  default: vi.fn(() => ({
    child: vi.fn(() => ({
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    })),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  })),
  stdTimeFunctions: {
    isoTime: vi.fn(() => "2023-01-01T00:00:00.000Z"),
  },
}));

// Mock fs to avoid file system operations during tests
vi.mock("fs", () => ({
  promises: {
    mkdir: vi.fn().mockResolvedValue(undefined),
  },
}));

import { type ChainBrawlerLogger, createLogger, logger } from "../logging/logger";

describe("Logger", () => {
  let testLogger: ChainBrawlerLogger;

  beforeEach(() => {
    testLogger = createLogger("test-component");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createLogger", () => {
    it("should create logger with component name", () => {
      const componentLogger = createLogger("test-component");
      expect(componentLogger).toBeDefined();
    });

    it("should create logger without component name", () => {
      const defaultLogger = createLogger();
      expect(defaultLogger).toBeDefined();
    });
  });

  describe("basic logging methods", () => {
    it("should have info method", () => {
      expect(typeof testLogger.info).toBe("function");
    });

    it("should have warn method", () => {
      expect(typeof testLogger.warn).toBe("function");
    });

    it("should have error method", () => {
      expect(typeof testLogger.error).toBe("function");
    });

    it("should have debug method", () => {
      expect(typeof testLogger.debug).toBe("function");
    });
  });

  describe("operation logging", () => {
    it("should have logOperation method", () => {
      expect(typeof testLogger.logOperation).toBe("function");
    });

    it("should return operation logger with success, error, and progress methods", () => {
      const operationLogger = testLogger.logOperation("test-operation");

      expect(typeof operationLogger.success).toBe("function");
      expect(typeof operationLogger.error).toBe("function");
      expect(typeof operationLogger.progress).toBe("function");
    });

    it("should generate unique operation ID", () => {
      const op1 = testLogger.logOperation("test-operation");
      const op2 = testLogger.logOperation("test-operation");

      // Operation IDs should be different
      expect(op1).not.toBe(op2);
    });
  });

  describe("event and transaction logging", () => {
    it("should have logEvent method", () => {
      expect(typeof testLogger.logEvent).toBe("function");
    });

    it("should have logTransaction method", () => {
      expect(typeof testLogger.logTransaction).toBe("function");
    });
  });

  describe("throttled logging", () => {
    it("should have infoThrottled method", () => {
      expect(typeof testLogger.infoThrottled).toBe("function");
    });

    it("should have debugThrottled method", () => {
      expect(typeof testLogger.debugThrottled).toBe("function");
    });

    it("should throttle repeated messages", () => {
      const mockInfo = vi.fn();
      testLogger.info = mockInfo;

      // Call throttled method multiple times quickly
      testLogger.infoThrottled("test-key", "test message", {}, 1000);
      testLogger.infoThrottled("test-key", "test message", {}, 1000);
      testLogger.infoThrottled("test-key", "test message", {}, 1000);

      // Should only be called once due to throttling
      expect(mockInfo).toHaveBeenCalledTimes(1);
    });

    it("should allow different keys to bypass throttling", () => {
      const mockInfo = vi.fn();
      testLogger.info = mockInfo;

      testLogger.infoThrottled("key1", "message 1", {}, 1000);
      testLogger.infoThrottled("key2", "message 2", {}, 1000);

      // Should be called twice for different keys
      expect(mockInfo).toHaveBeenCalledTimes(2);
    });
  });

  describe("operation logger functionality", () => {
    it("should track operation duration", async () => {
      const operationLogger = testLogger.logOperation("test-operation");
      const mockInfo = vi.fn();
      testLogger.info = mockInfo;

      // Simulate some work
      await new Promise((resolve) => setTimeout(resolve, 10));

      operationLogger.success("test result");

      expect(mockInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "test-operation",
          duration: expect.any(Number),
          result: "test result",
        }),
        expect.stringContaining("Operation completed")
      );
    });

    it("should handle error logging", () => {
      const operationLogger = testLogger.logOperation("test-operation");
      const mockError = vi.fn();
      testLogger.error = mockError;

      const testError = new Error("Test error");
      operationLogger.error(testError, { additional: "data" });

      expect(mockError).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "test-operation",
          duration: expect.any(Number),
          error: {
            message: "Test error",
            stack: expect.any(String),
          },
          additional: "data",
        }),
        expect.stringContaining("Operation failed")
      );
    });

    it("should handle string error logging", () => {
      const operationLogger = testLogger.logOperation("test-operation");
      const mockError = vi.fn();
      testLogger.error = mockError;

      operationLogger.error("String error", { additional: "data" });

      expect(mockError).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "test-operation",
          duration: expect.any(Number),
          error: {
            message: "String error",
          },
          additional: "data",
        }),
        expect.stringContaining("Operation failed")
      );
    });

    it("should handle progress logging", () => {
      const operationLogger = testLogger.logOperation("test-operation");
      const mockInfo = vi.fn();
      testLogger.info = mockInfo;

      operationLogger.progress("Processing step 1", { step: 1 });

      expect(mockInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: "test-operation",
          duration: expect.any(Number),
          progress: "Processing step 1",
          step: 1,
        }),
        expect.stringContaining("Operation progress")
      );
    });
  });
});

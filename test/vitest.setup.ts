import { expect, afterEach, afterAll, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./msw/server";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

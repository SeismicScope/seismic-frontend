import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import { getImportStatus, uploadEarthquakes } from "./index";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);
const mockedPost = vi.mocked(api.post);

describe("import api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls uploadEarthquakes with file and secretWord and returns status", async () => {
    const mockStatus = { id: 123, status: "pending", progress: 0 };
    mockedPost.mockResolvedValue({ data: mockStatus });

    const file = new File(["test content"], "test.csv", { type: "text/csv" });
    const params = { file, secretWord: "mysecret" };

    const result = await uploadEarthquakes(params);

    expect(api.post).toHaveBeenCalledWith(
      "/import/upload",
      expect.any(FormData),
    );
    expect(result).toEqual(mockStatus);
  });

  it("calls getImportStatus with jobId and returns status", async () => {
    const jobId = 456;
    const mockStatus = { id: jobId, status: "completed", progress: 100 };
    mockedGet.mockResolvedValue({ data: mockStatus });

    const result = await getImportStatus(jobId);

    expect(api.get).toHaveBeenCalledWith(`/import/status/${jobId}`);
    expect(result).toEqual(mockStatus);
  });
});

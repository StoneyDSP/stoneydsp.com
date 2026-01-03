import type { SerializedConfig } from "vitest";
import { freezeObject } from "../lib/utils";

export const SnapshotResolver = freezeObject({
  resolveSnapshotPath: (
    testPath: string,
    snapshotExtension: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: { config: SerializedConfig }
  ) => testPath + snapshotExtension,
  resolveTestPath: (
    snapshotFilePath: string,
    snapshotExtension: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ctx: { config: SerializedConfig }
  ) => snapshotFilePath.replace(snapshotExtension, ""),
  testPathForConsistencyCheck: "App.test.ts",
})!;

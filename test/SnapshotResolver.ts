import type { SerializedConfig } from "vitest";
import { freezeObject } from "../lib/utils";

export const SnapshotResolver = freezeObject({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveSnapshotPath: (testPath: string, snapshotExtension: string, ctx: { config: SerializedConfig }) =>
    testPath + snapshotExtension,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string, ctx: { config: SerializedConfig }) =>
    snapshotFilePath.replace(snapshotExtension, ""),
  testPathForConsistencyCheck: "App.test.ts",
})!;

import { batchUpdater } from "../batchUpdater";

describe("Tests for batchUpdaters", () => {
  test("ss", () => {
    batchUpdater.addChanges(
      Array.from({ length: 23 }).map((_, i) => i.toString())
    );

    setTimeout(() => {
      batchUpdater.addChanges(["1", "2", "3", "4", "22", "19"]);
    }, 2000);
  });
});

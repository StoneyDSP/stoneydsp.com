import { Lightning } from "@lightningjs/sdk";
import { Log } from "../Log";
import { Touch } from "./Touch";

/**
 *
 * @param qs
 * @returns
 */
function bootstrapTouch(stage: Lightning.Stage): Promise<void> {
  Log.event("bootstrap:touch", { stage });
  return new Promise<void>((resolve, reject) => {
    Touch.enable(stage);
    switch (true) {
      case true: {
        resolve();
        break;
      }
      default: {
        reject(new Error("Promise rejected"));
        break;
      }
    }
  });
}

export { bootstrapTouch };

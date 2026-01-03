import { getAppInstance } from "../../bootstrap";
import type { ControlAddress } from "../../Components/Controllers/types";

export declare type CommitPayload = {
  address: ControlAddress;
  label: string;
  value: unknown;
};

/**
 *
 */
export class ControlSignals {
  /**
   *
   * @returns
   */
  static commitToAudio() {
    ///
    const app = getAppInstance();
    ///
    return {
      /// Resolve when the signal fires
      onControlCommit: async (payload: CommitPayload): Promise<void> => {
        // minimal runtime guard (optional but helpful early on)
        if (typeof app.services.audio?.set !== "function") {
          throw new Error(
            "Audio service is not available or does not implement set()"
          );
        }
        await app.services.audio.set(
          payload.address,
          payload.value as boolean | number | string
        );
      },
    } as const;
  }
}

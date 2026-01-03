import { BaseSMError } from "../Services/BaseSMError";

class EventBusError<
  Code extends EventBusError.Code = EventBusError.Code,
  Details extends EventBusError.Details = EventBusError.Details,
>
  extends BaseSMError<Code, Details>
  implements BaseSMError<Code, Details>
{
  constructor(code: keyof Code, message: string, details?: Details) {
    super(code, message, details);
    this.code = code;
    this.details = details;
  }

  override readonly code: keyof Code;

  override readonly details?: Details;
}

namespace EventBusError {
  export interface Code extends BaseSMError.Code {
    /**
     * Bad or missing contextual access (e.g., AppData).
     */
    readonly ERR_CONTEXT_NOT_FOUND: "ERR_CONTEXT_NOT_FOUND";
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Details extends BaseSMError.Details {}
}

export { EventBusError };

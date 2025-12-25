import { BaseComponentError } from "../BaseComponent/BaseComponentError";

class BasePageComponentError<
    Code extends BasePageComponentError.Code = BasePageComponentError.Code,
    Details extends BasePageComponentError.Details = BasePageComponentError.Details,
  >
  extends BaseComponentError<Code, Details>
  implements BaseComponentError<Code, Details>
{
  constructor(code: keyof Code, message: string, details?: Details) {
    super(code, message, details);
    this.code = code;
    this.details = details;
  }

  override readonly code: keyof Code;

  override readonly details?: Details;
}

declare namespace BasePageComponentError {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Code extends BaseComponentError.Code {
    // /**
    //  * Bad or missing contextual access (e.g., AppData).
    //  */
    // readonly ERR_CONTEXT_NOT_FOUND: "ERR_CONTEXT_NOT_FOUND";
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Details extends BaseComponentError.Details {}
}

export { BasePageComponentError };

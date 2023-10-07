import { CharacterEncoding } from "crypto";
import { MIMEType } from "util";

export type ContentType = {
  charset: CharacterEncoding,
  media: MIMEType
};

const applicationJson = new MIMEType("application/json");

const applicationJsonUTF8: ContentType = {
  charset: "utf-8",
  media: applicationJson
};

// const applicationJsonUTF8 = {
//   "Content-Type": "image/svg+xml; charset=utf-8"
// };

// const applicationJsonUTF8 = {
//   "Content-Type": "text/plain; charset=utf-8"
// };

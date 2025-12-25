declare type json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: json | undefined }
  | json[];

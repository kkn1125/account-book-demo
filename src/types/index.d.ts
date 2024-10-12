declare global {}

declare type IncludeProps = "purpose" | "cost" | "inOut" | "memo";

declare namespace NodeJS {
  interface ProcessEnv {
    MODE: string;
    HOST: string;
    PORT: number;
    VERSION: string;
    AUTHOR: {
      name: string;
      email: string;
      url: string;
    };
    BRAND_NAME: string;
  }
}

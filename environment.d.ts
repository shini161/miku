declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      GUILD: string;
      PREFIX: string;
      DBPASS: string;
      OWNER: string;
      ENVIRONMENT: "dev" | "prod" | "debug";
    }
  }
}

export {};

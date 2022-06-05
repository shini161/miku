declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PORT: number;
      DB_PASS: string;
      DBNAME: string;
      ENVIRONMENT: "dev" | "prod" | "debug";
      GUILDADD_WEBHOOKID: string;
      GUILDADD_WEBHOOKTOKEN: string;
    }
  }
}

export {};

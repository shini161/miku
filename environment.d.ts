declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DBHOST: string;
      DBUSER: string;
      DBPORT: number;
      DBPASS: string;
      DBNAME: string;
      DBTIMEOUT: number;
      ENVIRONMENT: "dev" | "prod" | "debug";
      GuildAddWebhookID: string;
      GuildAddWebhookToken: string;
    }
  }
}

export {};

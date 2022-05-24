declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      GUILD: string;
      PREFIX: string;
      OWNER: string;
      DBHOST: string;
      DBUSER: string;
      DBPORT: number;
      DBPASS: string;
      DBNAME: string;
      DBTIMEOUT: number;
      ENVIRONMENT: "dev" | "prod" | "debug";
    }
  }
}

export {};

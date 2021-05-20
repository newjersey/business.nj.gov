import { handlerPath } from "@libs/handlerResolver";

export default (databaseUrl: string) => ({
  handler: `${handlerPath(__dirname)}/migrate.handler`,
  environment: {
    DATABASE_URL: databaseUrl
  },
  package: {
    include: ['migrations']
  }
});

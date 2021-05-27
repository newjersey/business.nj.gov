/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from "aws-lambda";
import {FromSchema} from "json-schema-to-ts";

// @ts-ignore
import DBMigrate from "db-migrate";

import schema from './schema';
import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const migrate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const dbmigrate = DBMigrate.getInstance(true);

  return dbmigrate.registerAPIHook()
    .then(() => {
      return dbmigrate.up()
        .then(() => true)
        .catch(() => false)
    })
    .catch(() => false);

  // return dbmigrate
  //   .then(() => {
  //       return dbmigrate.up()
  //         .then(() => true)
  //         .catch(() => false)
  //     }
  //   ).catch(() => false);
}

export const handler = middy(migrate).use(middyJsonBodyParser())

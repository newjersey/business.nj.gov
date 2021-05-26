import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/app.handler`,
  events: [
    {
      http: {
        method: "ANY",
        path: "/{proxy+}",
      },
      https: {
        method: "ANY",
        path: "/{proxy+}",
      },
    },
  ],
  vpc: {
    securityGroupIds: ["sg-032a42ecbcea549fa"],
    subnetIds: ["subnet-09a6dc189433984dd", "subnet-016f1da4d19a7c3b2"]
  }
};

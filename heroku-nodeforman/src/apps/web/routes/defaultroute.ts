import * as express from "express";

import { BaseSimpleGetExpressRoute } from "common/hosting/express";

export class DefaultRoute extends BaseSimpleGetExpressRoute {
  protected ProcessRequestInternal(request: express.Request, response: express.Response): void {
    response.status(200);
    response.send("I'm alive !");
  }
}

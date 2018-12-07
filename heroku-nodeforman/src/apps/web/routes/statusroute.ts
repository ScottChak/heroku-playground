import * as express from "express";

import { BaseSimpleGetExpressRoute } from "common/hosting/express";

export class StatusRoute extends BaseSimpleGetExpressRoute {
  protected ProcessRequestInternal(request: express.Request, response: express.Response): void {
    response.status(204);
    response.send();
  }
}

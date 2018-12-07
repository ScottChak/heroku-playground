import { Logger } from "winston";
import { get, RequestOptions, IncomingMessage } from "http";

import { BaseTask } from "common/runtime/task";

export class Task extends BaseTask {
  private readonly _targetHost: string;
  private readonly _targetPath: string;
  private readonly _targetPort: number;

  public constructor(targetHost: string, targetPath: string, targetPort: number, taskName: string, logger: Logger) {
    super(taskName, logger);

    this._targetHost = targetHost;
    this._targetPath = targetPath;
    this._targetPort = targetPort;
  }

  protected async ExecuteInternalAsync(): Promise<void> {
    this._logger.verbose(`Attempting to ping ${this._targetHost} at ${this._targetPath} on port ${this._targetPort}`);

    try {
      get(
        <RequestOptions>{
          host: this._targetHost,
          path: this._targetPath,
          port: this._targetPort
        },
        (response: IncomingMessage) => {
          this._logger.verbose(`Result status code: ${response.statusCode}`);
        }
      );
    } catch (error) {
      this._logger.error("Failed to contact target", { error });
    }
  }
}

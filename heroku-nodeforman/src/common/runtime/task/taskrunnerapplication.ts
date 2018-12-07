import { Logger } from "winston";

import { BaseRunnableApplication } from "common/runtime/application";
import { ITask } from "./interfaces/itask";

export class TaskRunnerApplication extends BaseRunnableApplication {
  private readonly _task: ITask;

  public constructor(task: ITask, applicationName: string, logger: Logger) {
    super(applicationName, logger);
    this._task = task;
  }

  public async RunInternalAsync(): Promise<void> {
    await this._task.ExecuteAsync();
  }
}

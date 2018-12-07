import { Logger } from "winston";

import { BaseInititaliser } from "common/runtime/init";
import { IStartableApplication } from "common/runtime/application";
import { IWinstonConsoleConfiguration, IWinstonMongoDbConfiguration, IWinstonTelegramConfiguration, CreateLoggerAsync } from "common/logging/winston";
import { CronApplication } from "common/scheduling/cron";

import { Task } from "./task";

export class Initialiser extends BaseInititaliser<IStartableApplication> {
  protected async InitialiseInternalAsync(): Promise<IStartableApplication> {
    let consoleLevel: string = process.env.LOGGING_CONSOLE_LEVEL;

    let consoleConfiguration: IWinstonConsoleConfiguration = {
      level: consoleLevel
    };

    let mongoDbConfiguration: IWinstonMongoDbConfiguration = undefined;

    let useMongoDb: boolean = process.env.LOGGING_MONGODB_USE === "true";
    if (useMongoDb) {
      let mongoDbLevel: string = process.env.LOGGING_MONGODB_LEVEL;

      let host: string = process.env.MONGODB_HOST;
      let port: number = parseInt(process.env.LOGGING_MONGODB_PORT);
      let username: string = process.env.LOGGING_MONGODB_USERNAME;
      let password: string = process.env.LOGGING_MONGODB_PASSWORD;
      let databaseName: string = process.env.LOGGING_MONGODB_DATABASE;
      let collection: string = process.env.PINGLISTENER_APP_NAME;

      mongoDbConfiguration = {
        level: mongoDbLevel,
        connection: {
          host: host,
          port: port
        },
        user: {
          username: username,
          password: password,
          databaseName: databaseName
        },
        collection: collection
      };
    }

    let telegramConfiguration: IWinstonTelegramConfiguration = undefined;

    let useTelegram: boolean = process.env.LOGGING_TELEGRAM_USE === "true";
    if (useTelegram) {
      let telegramLevel: string = process.env.LOGGING_TELEGRAM_LEVEL;

      let botToken: string = process.env.LOGGING_TELEGRAM_BOT_TOKEN;
      let chatId: number = parseInt(process.env.LOGGING_TELEGRAM_CHAT_ID);
      let disableNotification: boolean = process.env.LOGGING_TELEGRAM_DISABLE_NOTIFICATION === "true";

      telegramConfiguration = {
        level: telegramLevel,
        botToken: botToken,
        chatId: chatId,
        disableNotification: disableNotification
      };
    }

    let logger: Logger = await CreateLoggerAsync(consoleConfiguration, mongoDbConfiguration, telegramConfiguration);

    let applicationName: string = process.env.KEEPALIVE_APP_NAME;
    let targetHost: string = process.env.KEEPALIVE_TARGET_HOST;
    let targetPath: string = process.env.KEEPALIVE_TARGET_PATH;
    let targetPort: number = parseInt(process.env.KEEPALIVE_TARGET_PORT || "80");
    let cronTime: string = process.env.KEEPALIVE_CRONTIME;

    let task = new Task(targetHost, targetPath, targetPort, applicationName, logger);
    return new CronApplication(task, cronTime, applicationName, logger);
  }
}

require("module-alias/register");

import { IStartableApplication } from "common/runtime/application";

import { Initialiser } from "./initialiser";

let initialiser: Initialiser = new Initialiser();
initialiser.InitialiseAsync().then((application: IStartableApplication) => application.Start());

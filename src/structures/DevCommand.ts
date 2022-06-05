import { DevCommandType } from "../typings/DevCommand";

export class DevCommand {
    constructor(options: DevCommandType) {
        Object.assign(this, options);
    }
}

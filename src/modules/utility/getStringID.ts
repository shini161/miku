import clientError from "../../utils/clientError";

function getUserId(argument: string | undefined, ifNone?: string) {
  if (argument) {
    if (
      argument.startsWith("<@") &&
      argument.endsWith(">") &&
      argument.length == 21 &&
      !isNaN(+argument.slice(2, 20))
    )
      return argument.slice(2, 20);
    if (
      argument.startsWith("<@!") &&
      argument.endsWith(">") &&
      argument.length == 22 &&
      !isNaN(+argument.slice(3, 21))
    )
      return argument.slice(3, 21);
    if (!isNaN(+argument) && argument.length === 18) return argument;
  }
  if (ifNone) return ifNone;
  throw new clientError("Invalid arguments!");
}

function getChannelId(argument: string | undefined, ifNone?: string) {
  if (argument) {
    if (
      argument.startsWith("<#") &&
      argument.endsWith(">") &&
      argument.length == 21 &&
      !isNaN(+argument.slice(2, 20))
    )
      return argument.slice(2, 20);
    if (!isNaN(+argument) && argument.length === 18) return argument;
  }

  if (ifNone) return ifNone;
  throw new clientError("Invalid arguments!");
}

function getRoleId(argument: string | undefined, ifNone?: string) {
  if (argument) {
    if (
      argument.startsWith("<@&") &&
      argument.endsWith(">") &&
      argument.length == 22 &&
      !isNaN(+argument.slice(3, 21))
    )
      return argument.slice(3, 21);
    if (!isNaN(+argument) && argument.length === 18) return argument;
  }

  if (ifNone) return ifNone;
  throw new clientError("Invalid arguments!");
}

export { getUserId, getChannelId, getRoleId };

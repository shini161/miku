interface IDonateArgs {
  name: string;
  link: string;
}

const lang = {
  common: {
    errorOccurred: "❌ Sorry, an error has occurred!",
    version: "Version",
    library: "Library",
    max: "Max",
    limit: "Limit",
    owner: "Owner",
    total: "Total",
    user: "User",
    users: "Users",
    bot: "Bot",
    bots: "Bots",
    command: "Command",
    commands: "Commands",
    invite: "Invite",
    invites: "Invites",
    support: "Support",
    server: "Server",
    servers: "Servers",
    time_taken: "Time taken",
    example: "Example",
    link_as: "Link as",
    no_results: "❌ No results were found!",
    user_not_found: "❌ I couldn't find that user!",
    missing_arguments: "❌ Missing arguments!",
    invalid_arguments: "❌ Invalid arguments!",
    please_mention_user: "❌ Please mention a user!",
    timeTypes: {
      years: "Years",
      year: "Year",
      weeks: "Weeks",
      week: "Week",
      days: "Days",
      day: "Day",
      hours: "Hours",
      hour: "Hour",
      minutes: "Minutes",
      minute: "Minute",
      seconds: "Seconds",
      second: "Second",
      milliseconds: "Milliseconds",
      millisecond: "Millisecond",
    },
  },
  modules: {
    action: {
      bite: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} wants to bite something.`,
              `${author_username} needs to bite something.`,
            ];
          },
          self(author_username: string) {
            return [`${author_username}, don't bite yourself!`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is biting ${target_username}.`];
          },
        },
      },
      blush: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} is blushing because of something.`,
              `${author_username} blushed!`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} is blushing because of something.`,
              `${author_username} blushed!`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is blushing because of ${target_username}.`,
            ];
          },
        },
      },
      boop: {
        target: {
          none(author_username: string) {
            return [`${author_username} wants to get booped.`];
          },
          self(author_username: string) {
            return [`${author_username} wants to get booped.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is booping ${target_username}.`,
              `${author_username} boops ${target_username}.`,
            ];
          },
        },
      },
      bored: {
        target: {
          none(author_username: string) {
            return [`${author_username} is bored.`];
          },
          self(author_username: string) {
            return [`${author_username} is bored.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is bored because of ${target_username}.`,
            ];
          },
        },
      },
      bully: {
        target: {
          self(author_username: string) {
            return [`${author_username}, how can you bully yourself?`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is bullying ${target_username}.`];
          },
        },
      },
      cry: {
        target: {
          none(author_username: string) {
            return [`${author_username} is crying!`];
          },
          self(author_username: string) {
            return [`${author_username} is crying!`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is crying because of ${target_username}.`,
            ];
          },
        },
      },
      cuddle: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} needs to be cuddled!`,
              `${author_username} wants to be cuddled!`,
            ];
          },
          self(author_username: string) {
            return [`${author_username}, that's sad...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} cuddles ${target_username}.`];
          },
        },
      },
      dance: {
        target: {
          none(author_username: string) {
            return [`${author_username} is dancing!`];
          },
          self(author_username: string) {
            return [`${author_username} is dancing!`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is dancing with ${target_username}!`];
          },
        },
      },
      die: {
        target: {
          none(author_username: string) {
            return [`${author_username} died.`];
          },
          self(author_username: string) {
            return [`${author_username} died.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} died because of ${target_username}.`];
          },
        },
      },
      facepalm: {
        target: {
          none(author_username: string) {
            return [`${author_username} is facepalming.`];
          },
          self(author_username: string) {
            return [`${author_username} is facepalming.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is facepalming at ${target_username}.`];
          },
        },
      },
      greet: {
        target: {
          self(author_username: string) {
            return [`${author_username}, that's sad...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} says hi to ${target_username}.`];
          },
        },
      },
      happy: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} is happy!`,
              `${author_username} is happy because of something!`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} is happy!`,
              `${author_username} is happy because of something!`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is happy because of ${target_username}!`,
            ];
          },
        },
      },
      highfive: {
        target: {
          self(author_username: string) {
            return [`${author_username} highfives with themselves.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} highfives with ${target_username}.`];
          },
        },
      },
      hold: {
        target: {
          self(author_username: string) {
            return [`${author_username}, you can't hold you own hand...`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is holding ${target_username}'s hands.`,
              `${author_username} holds ${target_username}'s hands.`,
            ];
          },
        },
      },
      hug: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} needs a hug!`,
              `${author_username} wants a hug!`,
            ];
          },
          self(author_username: string) {
            return [`${author_username}, that's sad...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} hugs ${target_username}.`];
          },
        },
      },
      kill: {
        target: {
          self(author_username: string) {
            return [`${author_username}, don't kill yourself!`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} killed ${target_username}!`,
              `${author_username} is killing ${target_username}!`,
            ];
          },
        },
      },
      kiss: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} needs a kiss!`,
              `${author_username} wants to be kissed by someone.`,
            ];
          },
          self(author_username: string) {
            return [`${author_username}, how can you kiss yourself?`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} kissed ${target_username}!`,
              `${author_username} is kissing ${target_username}!`,
            ];
          },
        },
      },
      laugh: {
        target: {
          none(author_username: string) {
            return [`${author_username} is laughing...`];
          },
          self(author_username: string) {
            return [`${author_username} is laughing...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is laughing at ${target_username}.`];
          },
        },
      },
      lick: {
        target: {
          none(author_username: string) {
            return [`${author_username} is licking things...`];
          },
          self(author_username: string) {
            return [`${author_username} is licking things...`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is licking ${target_username}.`,
              `${author_username} licks ${target_username}.`,
            ];
          },
        },
      },
      no: {
        target: {
          none(author_username: string) {
            return [`${author_username} disagrees.`];
          },
          self(author_username: string) {
            return [`${author_username} disagrees.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} disagrees with ${target_username}.`];
          },
        },
      },
      nom: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} wants to nom something.`,
              `${author_username} needs to nom something.`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} wants to nom something.`,
              `${author_username} needs to nom something.`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is nomming on ${target_username}.`];
          },
        },
      },
      nuzzle: {
        target: {
          none(author_username: string) {
            return [`${author_username} wants to nuzzle with someone...`];
          },
          self(author_username: string) {
            return [`${author_username} wants to nuzzle with someone...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} is nuzzling with ${target_username}.`];
          },
        },
      },
      pat: {
        target: {
          none(author_username: string) {
            return [`${author_username} wants a pat...`];
          },
          self(author_username: string) {
            return [`${author_username} wants a pat...`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} pats ${target_username}.`,
              `${author_username} is patting ${target_username}.`,
            ];
          },
        },
      },
      poke: {
        target: {
          none(author_username: string) {
            return [`${author_username} wants to poke things...`];
          },
          self(author_username: string) {
            return [`${author_username} wants to poke things...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} pooks ${target_username}.`];
          },
        },
      },
      punch: {
        target: {
          self(author_username: string) {
            return [`${author_username}, don't punch yourself!`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} gives ${target_username} a punch!`];
          },
        },
      },
      run: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} is running.`,
              `${author_username} is running away from something.`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} is running.`,
              `${author_username} is running away from something.`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is running away from ${target_username}.`,
            ];
          },
        },
      },
      sad: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} is sad...`,
              `${author_username} is sad because of something...`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} is sad...`,
              `${author_username} is sad because of something...`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is sad because of ${target_username}...`,
            ];
          },
        },
      },
      shoot: {
        target: {
          self(author_username: string) {
            return [`${author_username}, don't shoot yourself!`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} shoot ${target_username}!`];
          },
        },
      },
      shy: {
        target: {
          none(author_username: string) {
            return [`${author_username} is shy...`];
          },
          self(author_username: string) {
            return [`${author_username} is shy...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} hides from ${target_username}...`];
          },
        },
      },
      sip: {
        target: {
          none(author_username: string) {
            return [`${author_username} is sipping some juice.`];
          },
          self(author_username: string) {
            return [`${author_username} is sipping some juice.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is sipping some juice with ${target_username}.`,
            ];
          },
        },
      },
      slap: {
        target: {
          self(author_username: string) {
            return [`${author_username}, don't slap yourself!`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} slaps ${target_username}.`,
              `${author_username} is slapping ${target_username}.`,
            ];
          },
        },
      },
      sleep: {
        target: {
          none(author_username: string) {
            return [`${author_username} is sleeping.`];
          },
          self(author_username: string) {
            return [`${author_username} is sleeping.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} wants to sleep with ${target_username}!`,
              `${author_username} is sleeping with ${target_username}!`,
            ];
          },
        },
      },
      smile: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} smiles.`,
              `${author_username} is smiling.`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} smiles.`,
              `${author_username} is smiling.`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} smiles at ${target_username}.`];
          },
        },
      },
      smug: {
        target: {
          none(author_username: string) {
            return [`${author_username} has a smug look.`];
          },
          self(author_username: string) {
            return [`${author_username} has a smug look.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} smugs at ${target_username}.`];
          },
        },
      },
      stare: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} stares..`,
              `${author_username} is staring at something`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} stares..`,
              `${author_username} is staring at something`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} stares at ${target_username}.`,
              `${author_username} is staring at ${target_username}.`,
            ];
          },
        },
      },
      think: {
        target: {
          none(author_username: string) {
            return [
              `${author_username} is thinking at something.`,
              `${author_username} thinks..`,
            ];
          },
          self(author_username: string) {
            return [
              `${author_username} is thinking at something.`,
              `${author_username} thinks..`,
            ];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is thinking at ${target_username}.`,
              `${author_username} thinks at ${target_username}.`,
            ];
          },
        },
      },
      tickle: {
        target: {
          none(author_username: string) {
            return [`${author_username} wants to tickle someone.`];
          },
          self(author_username: string) {
            return [`${author_username} wants to tickle someone.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is tickling ${target_username}.`,
              `${author_username} tickles ${target_username}.`,
            ];
          },
        },
      },
      triggered: {
        target: {
          none(author_username: string) {
            return [`${author_username} is triggered.`];
          },
          self(author_username: string) {
            return [`${author_username} is triggered.`];
          },
          default(author_username: string, target_username: string) {
            return [
              `${author_username} is triggered because of ${target_username}.`,
            ];
          },
        },
      },
      wave: {
        target: {
          self(author_username: string) {
            return [`${author_username}, that's sad...`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} says hi to ${target_username}.`];
          },
        },
      },
      yes: {
        target: {
          none(author_username: string) {
            return [`${author_username} is agreeing.`];
          },
          self(author_username: string) {
            return [`${author_username} is agreeing.`];
          },
          default(author_username: string, target_username: string) {
            return [`${author_username} agrees with ${target_username}.`];
          },
        },
      },
    },
    economy: {},
    giveaway: {
      gwcreate: {},
      gwend: {},
      gwlist: {},
      gwreroll: {},
    },
    information: {
      donate: {
        embed: {
          title: "Do you want to make a donation to us?",
          description(...args: IDonateArgs[]) {
            let text = "";
            args.forEach((item) => {
              text += `- [${item.name}](${item.link})`;
            });
            return `You can donate us by using these platforms: \n${text}`;
          },
        },
      },
      patreon: {
        embed: {
          title: "Do you want to become a patreon?",
          description(link: string) {
            return `Click [here](${link}) to become a patreon!`;
          },
        },
      },
      invite: {
        embed: {
          title: "Do you want to invite me?",
          description(invite: string) {
            return `Click [here](${invite}) to invite me to your server!`;
          },
        },
      },
      support: {
        content(invite: string) {
          return `Do you need help with the bot?\nJoin our support server: ${invite}`;
        },
      },
    },
    leveling: {},
    moderation: {},
    music: {},
    profile: {},
    search: {},
    setup: {},
    utility: {
      banner: {
        no_banner: "That user doesn't have a banner.",
      },
      "8ball": [
        "Yes.",
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now...",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "Outlook not so good...",
        "Very doubtful.",
      ],
      coinflip: {
        embeds: {
          tails: {
            title: "Its a tails!",
            won_desc: "The coin landed on tails, you won the bet",
            lost_desc: "The coin landed on tails, you lost the bet",
          },
          heads: {
            title: "Its a heads!",
            won_desc: "The coin landed on heads, you won the bet",
            lost_desc: "The coin landed on heads, you lost the bet",
          },
        },
      },
      random: {
        waifu: {
          embed: {
            title: "Random Waifu",
          },
        },
        neko: {
          embed: {
            title: "Random Neko",
          },
        },
        number: {
          embed: {
            title(number: number) {
              return `Your random number is: ${number}`;
            },
          },
        },
      },
    },
  },
};

export default lang;

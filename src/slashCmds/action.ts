import { SlashCommand } from "../structures/SlashCommand";
import { ColorResolvable } from "discord.js";
import ActionData from "../../assets/action-module.json";
import Colors from "../../assets/colors.json";

export default new SlashCommand({
  name: "action",
  description: "action/roleplay commands",
  channel_type: "GUILD_ONLY",
  options: [
    {
      name: "1st",
      type: "SUB_COMMAND_GROUP",
      description: "1st list of action commands",
      options: [
        {
          name: "bite",
          type: "SUB_COMMAND",
          description: "to bite someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "blush",
          type: "SUB_COMMAND",
          description: "to blush",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "boop",
          type: "SUB_COMMAND",
          description: "to boop someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "bored",
          type: "SUB_COMMAND",
          description: "to be bored",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "bully",
          type: "SUB_COMMAND",
          description: "to bully someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "cry",
          type: "SUB_COMMAND",
          description: "to cry",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "cuddle",
          type: "SUB_COMMAND",
          description: "to cuddle someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "dance",
          type: "SUB_COMMAND",
          description: "to dance",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "die",
          type: "SUB_COMMAND",
          description: "to die",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "facepalm",
          type: "SUB_COMMAND",
          description: "to facepalm",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "greet",
          type: "SUB_COMMAND",
          description: "to greet someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "happy",
          type: "SUB_COMMAND",
          description: "to be happy",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "highfive",
          type: "SUB_COMMAND",
          description: "to highfive someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "hold",
          type: "SUB_COMMAND",
          description: "to hold something",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "hug",
          type: "SUB_COMMAND",
          description: "to hug someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "kill",
          type: "SUB_COMMAND",
          description: "to kill someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "kiss",
          type: "SUB_COMMAND",
          description: "to kiss someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "laugh",
          type: "SUB_COMMAND",
          description: "to laugh",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "lick",
          type: "SUB_COMMAND",
          description: "to lick someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "no",
          type: "SUB_COMMAND",
          description: "to disagree",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "nom",
          type: "SUB_COMMAND",
          description: "to nom someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "nuzzle",
          type: "SUB_COMMAND",
          description: "to nuzzle someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "pat",
          type: "SUB_COMMAND",
          description: "to pat someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "poke",
          type: "SUB_COMMAND",
          description: "to poke someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "punch",
          type: "SUB_COMMAND",
          description: "to punch someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "2nd",
      type: "SUB_COMMAND_GROUP",
      description: "2nd list of action commands",
      options: [
        {
          name: "run",
          type: "SUB_COMMAND",
          description: "to run somewhere",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "sad",
          type: "SUB_COMMAND",
          description: "to be sad",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "shoot",
          type: "SUB_COMMAND",
          description: "to shoot someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "shy",
          type: "SUB_COMMAND",
          description: "to be shy",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "sip",
          type: "SUB_COMMAND",
          description: "to sip some juice",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "slap",
          type: "SUB_COMMAND",
          description: "to slap someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "sleep",
          type: "SUB_COMMAND",
          description: "to sleep",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "smile",
          type: "SUB_COMMAND",
          description: "to smile to someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "smug",
          type: "SUB_COMMAND",
          description: "to smug to someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "stare",
          type: "SUB_COMMAND",
          description: "to stare at someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "think",
          type: "SUB_COMMAND",
          description: "to tickle someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "triggered",
          type: "SUB_COMMAND",
          description: "to be triggered",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
        {
          name: "wave",
          type: "SUB_COMMAND",
          description: "to wave to someone",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: true,
            },
          ],
        },
        {
          name: "yes",
          type: "SUB_COMMAND",
          description: "to agree",
          options: [
            {
              name: "target",
              type: "USER",
              description: "to select the target",
              required: false,
            },
          ],
        },
      ],
    },
  ],

  run: async ({ interaction }) => {
    const subCommand = interaction.options.getSubcommand();
    const target = interaction.options.getUser("target");

    let text: string[];
    let images = ActionData?.[subCommand].images;
    const color = Colors.celestialBlue;

    switch (subCommand) {
      case "bite":
        switch (target?.id) {
          case undefined:
            text = [
              `${interaction.user.username} wants to bite something.`,
              `${interaction.user.username} needs to bite something.`,
            ];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username}, don't bite yourself!`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is biting ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "blush":
        switch (target?.id) {
          case undefined:
            text = [
              `${interaction.user.username} is blushing because of something.`,
              `${interaction.user.username} blushed!`,
            ];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [
              `${interaction.user.username} is blushing because of something.`,
              `${interaction.user.username} blushed!`,
            ];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is blushing because of ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "boop":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} wants to get booped.`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} wants to get booped.`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is booping ${target.username}.`,
              `${interaction.user.username} boops ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "bored":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} is bored.`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} is bored.`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is bored because of ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "bully":
        switch (target?.id) {
          case interaction.user.id:
            text = [
              `${interaction.user.username}, how can you bully yourself?`,
            ];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is bullying ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "cry":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} is crying!`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} is crying!`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is crying because of ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "cuddle":
        switch (target?.id) {
          case undefined:
            text = [
              `${interaction.user.username} needs to be cuddled!`,
              `${interaction.user.username} wants to be cuddled!`,
            ];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username}, that's sad...`];
            await sendEmbed(text, images);
            break;
          default:
            text = [`${interaction.user.username} cuddles ${target.username}.`];
            await sendEmbed(text, images);
        }
        break;
      case "dance":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} is dancing!`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} is dancing!`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is dancing with ${target.username}!`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "die":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} died.`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} died.`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} died because of ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "facepalm":
        switch (target?.id) {
          case undefined:
            text = [`${interaction.user.username} is facepalming.`];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [`${interaction.user.username} is facepalming.`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is facepalming at ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "greet":
        switch (target?.id) {
          case interaction.user.id:
            text = [`${interaction.user.username}, that's sad...`];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} says hi to ${target.username}.`,
            ];
            await sendEmbed(text, images);
        }
        break;
      case "happy":
        switch (target?.id) {
          case undefined:
            text = [
              `${interaction.user.username} is happy!`,
              `${interaction.user.username} is happy because of something!`,
            ];
            await sendEmbed(text, images);
            break;
          case interaction.user.id:
            text = [
              `${interaction.user.username} is happy!`,
              `${interaction.user.username} is happy because of something!`,
            ];
            await sendEmbed(text, images);
            break;
          default:
            text = [
              `${interaction.user.username} is happy because of ${target.username}!`,
            ];
            await sendEmbed(text, images);
        }
        break;
      default:
        await interaction.followUp({
          content: "❌ Sorry, an error has occurred!",
        });
    }

    async function sendEmbed(text: string[], images: string[]) {
      const embed = {
        author: {
          name: text[Math.floor(Math.random() * text.length)],
          icon_url: interaction.user.displayAvatarURL({ dynamic: true }),
        },
        image: {
          url: images[Math.floor(Math.random() * images.length)],
        },
        color: color as ColorResolvable,
      };

      await interaction.followUp({
        embeds: [embed],
      });
    }
  },
});

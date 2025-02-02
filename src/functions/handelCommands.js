const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const {
  green,
  yellow,
  magenta,
  cyan,
  red,
  blue,
  magentaBright,
  white,
} = require("colorette");
require("colors");

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_SERVER_ID;

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: "9" }).setToken(process.env.token);

    (async () => {
      try {
        console.log(
        "[CMDS]".red +
          ` Started refrshing ${client.commandArray.length} application ( / ) commands`
      );
        await rest.put(Routes.applicationCommands(clientId, guildId), {
          body: client.commandArray,
        });
        console.log(
        "[CMDS]".green +
          ` Successfully ${client.commandArray.length} refreshed application ( / ) commands`
      );
      } catch (error) {
        console.error(
          `${red(`[${new Date().toLocaleTimeString()}]`)} ${white(
            `Error: ${error.message}`
          )}`
        );
      }
    })();
  };
};

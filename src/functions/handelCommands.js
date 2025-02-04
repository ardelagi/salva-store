const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { red, green, cyan, white } = require("colorette");

const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_SERVER_ID;
const botToken = process.env.token;

module.exports = (client) => {
  client.handleCommands = async (commandFolders, path) => {
    client.commandArray = [];

    console.log(cyan("[CMDS] Loading commands..."));

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`${path}/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        try {
          const command = require(`../commands/${folder}/${file}`);
          client.commands.set(command.data.name, command);
          client.commandArray.push(command.data.toJSON());
          console.log(green(`[CMDS] Loaded command: ${command.data.name}`));
        } catch (error) {
          console.error(red(`[ERROR] Failed to load ${file}: ${error.message}`));
        }
      }
    }

    const rest = new REST({ version: "9" }).setToken(botToken);

    try {
      console.log(cyan(`[CMDS] Refreshing ${client.commandArray.length} commands...`));

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log(green("[CMDS] Successfully refreshed all application (/) commands"));
    } catch (error) {
      console.error(red(`[ERROR] Failed to refresh commands: ${error.message}`));
    }
  };
};
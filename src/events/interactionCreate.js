const { Interaction, EmbedBuilder, Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);

      // Logging command
      const logChannel = message.guild.channels.cache.get("1335994695070781491");

      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor("Blue")
          .setTitle("🛠️ Command Digunakan")
          .addFields(
            { name: "Pengguna", value: `${interaction.user.tag} (<@${interaction.user.id}>)`, inline: true },
            { name: "Command", value: `\`/${interaction.commandName}\``, inline: true },
            { name: "Channel", value: `<#${interaction.channel.id}>`, inline: true }
          )
          .setTimestamp();

        logChannel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Terjadi kesalahan saat menjalankan command!",
        ephemeral: true,
      });
    }
  },
};
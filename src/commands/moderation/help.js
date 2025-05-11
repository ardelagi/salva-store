const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Menampilkan daftar perintah bot"),

  async execute(interaction, client) {
    const commands = client.commands.map(cmd => `</${cmd.data.name}:${cmd.data.name}> - ${cmd.data.description}`);

    const embed = new EmbedBuilder()
      .setTitle("Daftar Perintah")
      .setColor("Green")
      .setDescription(commands.join("\n") || "Tidak ada perintah yang tersedia.")
      .setFooter({ text: `Bot oleh ${client.user.username}` });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
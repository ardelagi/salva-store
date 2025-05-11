const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testwelcome")
    .setDescription("Test event welcome secara manual"),
  async execute(interaction, client) {
    const member = interaction.member;
    client.emit("guildMemberAdd", member); // Trigger event seolah-olah member baru join
    await interaction.reply({ content: "Simulasi welcome dikirim.", ephemeral: true });
  },
};
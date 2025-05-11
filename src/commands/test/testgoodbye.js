const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testgoodbye")
    .setDescription("Test event goodbye secara manual"),
  async execute(interaction, client) {
    const member = interaction.member;
    client.emit("guildMemberRemove", member); // Trigger event seolah-olah member leave
    await interaction.reply({ content: "Simulasi goodbye dikirim.", ephemeral: true });
  },
};
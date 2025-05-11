const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Kirim pengumuman ke channel yang dipilih"),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache
      .filter(ch => ch.isTextBased() && ch.viewable)
      .map(ch => ({
        label: ch.name,
        value: ch.id,
      }))
      .slice(0, 25); // Discord limit 25 options

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("select_announcement_channel")
      .setPlaceholder("Pilih channel pengumuman")
      .addOptions(channels);

    const publishButton = new ButtonBuilder()
      .setCustomId("publish_announcement")
      .setLabel("Publish")
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder().addComponents(selectMenu);
    const row2 = new ActionRowBuilder().addComponents(publishButton);

    const embed = new EmbedBuilder()
      .setTitle("Buat Pengumuman")
      .setDescription("Silakan pilih channel tujuan dan tekan tombol 'Publish'")
      .setColor("Orange");

    await interaction.reply({
      embeds: [embed],
      components: [row1, row2],
      flags: 64,
    });
  },
};
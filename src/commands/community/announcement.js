const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("Kirim pengumuman ke channel tertentu")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache
      .filter(c => c.type === ChannelType.GuildText)
      .map(c => ({
        label: c.name,
        value: c.id,
      }))
      .slice(0, 25); // Discord hanya izinkan max 25 item

    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select_announcement_channel")
        .setPlaceholder("Pilih channel pengumuman")
        .addOptions(channels)
    );

    const publishBtn = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("publish_announcement")
        .setLabel("Publish")
        .setStyle(ButtonStyle.Success)
    );

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("Buat Pengumuman")
      .setDescription("Silakan pilih channel tujuan dan tekan tombol 'Publish'");

    await interaction.reply({
      embeds: [embed],
      components: [row, publishBtn],
    });
  },
};
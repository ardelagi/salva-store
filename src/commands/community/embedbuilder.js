const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedbuilder")
    .setDescription("Buat embed dan kirim ke channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache
      .filter(c => c.type === ChannelType.GuildText)
      .map(c => ({
        label: c.name,
        value: c.id,
      }))
      .slice(0, 25);

    const selectMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select_embed_channel")
        .setPlaceholder("Pilih channel untuk embed")
        .addOptions(channels)
    );

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("open_embed_modal")
        .setLabel("Buat Embed")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "Silakan pilih channel dan tekan 'Buat Embed'",
      components: [selectMenu, button],
    });
  },
};
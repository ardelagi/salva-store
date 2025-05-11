const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedbuilder")
    .setDescription("Buat dan kirim embed ke channel yang dipilih"),

  async execute(interaction) {
    const channels = interaction.guild.channels.cache
      .filter(ch => ch.isTextBased() && ch.viewable)
      .map(ch => ({
        label: ch.name,
        value: ch.id,
      }))
      .slice(0, 25); // Max 25 select options

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("select_embed_channel")
      .setPlaceholder("Pilih channel tujuan")
      .addOptions(channels);

    const openModalBtn = new ButtonBuilder()
      .setCustomId("open_embed_modal")
      .setLabel("Buat Embed")
      .setStyle(ButtonStyle.Primary);

    const publishBtn = new ButtonBuilder()
      .setCustomId("publish_embed")
      .setLabel("Publish")
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder().addComponents(selectMenu);
    const row2 = new ActionRowBuilder().addComponents(openModalBtn, publishBtn);

    const embed = new EmbedBuilder()
      .setTitle("Embed Builder")
      .setDescription("Gunakan tombol dan dropdown di bawah ini untuk membuat embed dan mengirimnya.")
      .setColor("Purple");

    await interaction.reply({
      embeds: [embed],
      components: [row1, row2],
      ephemeral: true,
    });
  },
};
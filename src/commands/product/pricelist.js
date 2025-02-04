const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pricelist")
    .setDescription("Menampilkan panel pricelist berdasarkan kategori")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    // **Embed Discord**
    const discordEmbed = new EmbedBuilder()
      .setTitle("__**Pricelist Produk Discord**__")
      .setDescription("Pilih salah satu produk untuk melihat pricelist:")
      .setColor(0x0099ff)
      .setThumbnail(interaction.client.user.displayAvatarURL());

    const discordButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("pricelist_nitro")
        .setEmoji("🎀")
        .setLabel("Nitro Discord")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("pricelist_boost")
        .setEmoji("🚀")
        .setLabel("Boost Server")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("pricelist_account")
        .setEmoji("💼")
        .setLabel("Akun Discord")
        .setStyle(ButtonStyle.Secondary)
    );

    // **Embed Premium Aplikasi**
    const premiumEmbed = new EmbedBuilder()
      .setTitle("__**Pricelist Premium Aplikasi**__")
      .setDescription("Pilih salah satu layanan premium:")
      .setColor(0xff9900)
      .setThumbnail(interaction.client.user.displayAvatarURL());

    const premiumButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("pricelist_spotify")
        .setEmoji("🎵")
        .setLabel("Spotify Premium")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("pricelist_netflix")
        .setEmoji("📺")
        .setLabel("Netflix Premium")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("pricelist_disney")
        .setEmoji("🎬")
        .setLabel("Disney+ Hotstar")
        .setStyle(ButtonStyle.Secondary)
    );

    // **Embed Top Up Game**
    const gameEmbed = new EmbedBuilder()
      .setTitle("__**Pricelist Top Up Game**__")
      .setDescription("Pilih game yang ingin kamu top-up:")
      .setColor(0x00ff99)
      .setThumbnail(interaction.client.user.displayAvatarURL());

    const gameButtons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("pricelist_mobilelegends")
        .setEmoji("🔥")
        .setLabel("Mobile Legends")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("pricelist_valorant")
        .setEmoji("🎯")
        .setLabel("Valorant")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("pricelist_genshin")
        .setEmoji("🌟")
        .setLabel("Genshin Impact")
        .setStyle(ButtonStyle.Secondary)
    );

    // **Kirim Embed**
    await interaction.reply({ content: "Berikut adalah pricelist kami:", ephemeral: true });
    await interaction.channel.send({ embeds: [discordEmbed], components: [discordButtons] });
    await interaction.channel.send({ embeds: [premiumEmbed], components: [premiumButtons] });
    await interaction.channel.send({ embeds: [gameEmbed], components: [gameButtons] });
  }
};
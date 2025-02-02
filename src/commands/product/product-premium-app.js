const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("productpremiumapp")
    .setDescription("Commands ini merupakan product premium app")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
      .setTitle("__**Price List Product Discord**__")
      .setDescription(
        `Nitro Discord
Boost Server
Account Discord
`
      )
      .setColor(0x0099ff)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: "MARA STORE" });

    const netflixLink = new ButtonBuilder()
      .setCustomId("netflix")
      .setEmoji("🎀")
      .setLabel("Nitro Discord")
      .setStyle(ButtonStyle.Primary);

    const youtubeLink = new ButtonBuilder()
      .setCustomId("youtube")
      .setEmoji("🚀")
      .setLabel("Boost Server")
      .setStyle(ButtonStyle.Success);

      const spotifytLink = new ButtonBuilder()
        .setCustomId("spotify")
        .setEmoji("💼")
        .setLabel("Account Discord")
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(netflixLink, youtubeLink, spotifyLink);

    await interaction.reply({
      content: "Your embed has been sent below",
      flags: 64,
    });

    await interaction.channel.send({ embeds: [embed], components: [row] });
  },
};

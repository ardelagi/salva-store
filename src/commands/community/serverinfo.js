const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { parse } = require("dotenv");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("This is Server Info commands"),
  async execute (interaction) {    
    if (!interaction.guild) {
      return interaction.reply({ content: "Perintah ini hanya bisa digunakan di dalam server!", flags: 64 });
    }

    const { guild } = interaction;
    const { name, ownerId, createdTimestamp, memberCount, premiumSubscriptionCount } = guild;
    const icon = guild.iconURL() || "https://cdn.discordapp.com/icons/1204767266734866483/9bde0b6188f99fe2548a9479a148ae89.png?size=4096";
    const roles = guild.roles.cache.size;
    const emojis = guild.emojis.cache.size;
    const id = guild.id;
    const serverBoosts = premiumSubscriptionCount;

    let baseVerification = guild.verificationLevel;

    if (baseVerification == 0) baseVerification = "None";
    if (baseVerification == 1) baseVerification = "Low";
    if (baseVerification == 2) baseVerification = "Medium";
    if (baseVerification == 3) baseVerification = "High";
    if (baseVerification == 4) baseVerification = "Very High";

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setThumbnail(icon)
      .setAuthor({ name: name, iconURL: icon })
      .setFooter({ text: `Server ID ${id}` })
      .setTimestamp()
      .addFields({ name: "Name", value: `${name}`, inline: false })
      .addFields({ name: "Date Created", value: `<t:${parseInt(createdTimestamp / 1000)}:R> (hover for complete date)`, inline: true})
      .addFields({ name: "Server Owner", value: `<@${ownerId}>`, inline: true })
      .addFields({ name: "Server Members", value: `${memberCount}`, inline: true})
      .addFields({ name: "Role Member", value: `${roles}`, inline: true })
      .addFields({ name: "Emoji Roles", value: `${emojis}`, inline: true })
      .addFields({ name: "Verification Level", value: `${baseVerification}`, inline: true})
      .addFields({ name: "Server Boosts", value: `${serverBoosts}`, inline: true})

    await interaction.reply({ embeds: [embed] });
  }
};

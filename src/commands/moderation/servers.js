const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Menampilkan semua server tempat bot berada"),

  async execute(interaction, client) {
    const guilds = client.guilds.cache.map(guild => guild);

    const embed = new EmbedBuilder()
      .setTitle("Daftar Server")
      .setColor("Blue")
      .setTimestamp();

    guilds.forEach(guild => {
      embed.addFields({
        name: guild.name,
        value: `ID: \`${guild.id}\`\nOwner: <@${guild.ownerId}>\nMember: ${guild.memberCount}\n[Invite](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8&guild_id=${guild.id})`,
        inline: false,
      });
    });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    const goodbyeChannelId = "1131180403810652260"; // ganti dengan ID channel goodbye
    const channel = member.guild.channels.cache.get(goodbyeChannelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle(`${member.user.username} telah keluar`)
      .setDescription(`Sampai jumpa dan semoga sukses!`)
      .setColor("Red");

    channel.send({ embeds: [embed] });
  },
};
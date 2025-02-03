const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const logChannel = oldMessage.guild.channels.cache.find(
      (channel) => channel.name === "log-channel"
    ); // Ganti dengan ID channel log jika perlu

    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle("✏️ Pesan Diedit")
      .addFields(
        { name: "Pengguna", value: `${oldMessage.author.tag} (<@${oldMessage.author.id}>)`, inline: true },
        { name: "Channel", value: `<#${oldMessage.channel.id}>`, inline: true },
        { name: "Pesan Lama", value: oldMessage.content || "Tidak ada teks", inline: false },
        { name: "Pesan Baru", value: newMessage.content || "Tidak ada teks", inline: false }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
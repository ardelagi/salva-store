const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return; // Abaikan pesan dari bot

    const logChannel = message.guild.channels.cache.find(
      (channel) => channel.name === "log-channel"
    ); // Ganti dengan ID channel log jika perlu

    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("📩 Pesan Baru")
      .addFields(
        { name: "Pengguna", value: `${message.author.tag} (<@${message.author.id}>)`, inline: true },
        { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
        { name: "Isi Pesan", value: message.content || "Tidak ada teks", inline: false }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
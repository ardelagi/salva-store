const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testlog")
    .setDescription("Mengirimkan log uji coba ke channel logging"),

  async execute(interaction, client) {
    const logChannelId = process.env.LOG_CHANNEL_ID; // Simpan ID channel logging di .env
    const logMessage = `🔍 **Test Log**: Perintah /testlog digunakan oleh ${interaction.user.tag} di server ${interaction.guild.name}`;

    // Log ke Konsol
    console.log(logMessage);

    // Kirim Log ke Channel
    if (logChannelId) {
      const logChannel = client.channels.cache.get(logChannelId);
      if (logChannel) {
        const embed = new EmbedBuilder()
          .setColor("Blue")
          .setTitle("🔍 Test Logging")
          .setDescription(`Perintah **/testlog** digunakan oleh ${interaction.user}`)
          .setFooter({ text: `Server: ${interaction.guild.name}` })
          .setTimestamp();

        logChannel.send({ embeds: [embed] });
      } else {
        console.error("⚠️ Channel logging tidak ditemukan.");
      }
    } else {
      console.warn("⚠️ LOG_CHANNEL_ID tidak diatur dalam .env");
    }

    await interaction.reply({ content: "test log telah dikirim", flags: 64 });
  }
};
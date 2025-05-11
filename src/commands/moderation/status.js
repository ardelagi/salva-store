const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Cek status bot"),

  async execute(interaction) {
    const channel = interaction.channel; // Mengambil channel tempat perintah dijalankan

    // Fungsi untuk membuat embed status
    const updateEmbed = () => {
      const uptime = process.uptime(); // Uptime dalam detik
      const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // RAM dalam MB
      const cpuUsage = (os.loadavg()[0]).toFixed(2); // Load CPU (1 menit terakhir)
      const ping = interaction.client.ws.ping; // Ping ke Discord API

      const embed = new EmbedBuilder()
        .setColor(0x00FF00) // Hijau
        .setTitle("📊 Status Bot")
        .addFields(
          { name: "🕐 Uptime", value: `<t:${Math.floor(Date.now() / 1000 - uptime)}:R>`, inline: true },
          { name: "💾 RAM", value: `${ramUsage} MB`, inline: true },
          { name: "🖥️ CPU Load", value: `${cpuUsage}%`, inline: true },
          { name: "📡 Ping", value: `${ping}ms`, inline: true }
        )
        .setTimestamp();

      return embed;
    };

    // Mengirim status pertama kali
    let message = await interaction.reply({
        content: 'Status bot...'
      });
      // atau jika butuh balasannya:
      const reply = await interaction.reply({
        content: 'Status bot...'
      }); // Memastikan kita bisa mendapatkan objek pesan yang telah dikirim
    

    // Mengupdate embed setiap 10 detik (real-time)
    const interval = setInterval(async () => {
      try {
        await message.edit({ embeds: [updateEmbed()] });
      } catch (err) {
        console.error("Error saat mengupdate status:", err);
        clearInterval(interval); // Menghentikan interval jika terjadi error
      }
    }, 10000); // Update setiap 10 detik

    // Menghentikan update saat interaksi selesai
    setTimeout(() => {
      clearInterval(interval);
    }, 60000); // Menghentikan update setelah 60 detik
  },
};
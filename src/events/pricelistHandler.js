const { Events, MessageFlags } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const pricelists = {
      pricelist_nitro: "**Nitro Classic**: Rp50.000\n**Nitro Boost**: Rp150.000",
      pricelist_boost: "**Boost 1x**: Rp50.000\n**Boost 2x**: Rp90.000",
      pricelist_account: "**Akun Verified**: Rp20.000\n**Akun Full Access**: Rp50.000",
      pricelist_spotify: "**Spotify Premium 1 Bulan**: Rp25.000\n**Spotify Family**: Rp60.000",
      pricelist_netflix: "**Netflix Standard**: Rp50.000\n**Netflix Premium**: Rp80.000",
      pricelist_disney: "**Disney+ 1 Bulan**: Rp40.000\n**Disney+ 3 Bulan**: Rp100.000",
      pricelist_mobilelegends: "**Starlight**: Rp150.000\n**Diamond 500**: Rp90.000",
      pricelist_valorant: "**VP 1000**: Rp120.000\n**VP 2000**: Rp230.000",
      pricelist_genshin: "**Genesis Crystal 980**: Rp200.000\n**Blessing Welkin Moon**: Rp80.000"
    };

    if (pricelists[interaction.customId]) {
      try {
        await interaction.reply({
          content: pricelists[interaction.customId],
          flags: MessageFlags.Ephemeral
        });
      } catch (error) {
        console.error(`[ERROR] Gagal mengirim pesan: ${error.message}`);
      }
    }
  }
};
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Menghapus pesan dalam jumlah tertentu")
    .addIntegerOption((option) =>
      option
        .setName("jumlah")
        .setDescription("Jumlah pesan yang ingin dihapus")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async execute(interaction) {
    const jumlah = interaction.options.getInteger("jumlah");

    if (jumlah < 1 || jumlah > 100) {
      return interaction.reply({
        content: "Kamu bisa menghapus pesan antara 1 sampai 100.",
        flags: 64,
      });
    }

    try {
      await interaction.channel.bulkDelete(jumlah, true);
      await interaction.reply({
        content: `Berhasil menghapus ${jumlah} pesan!`,
        flags: 64,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "Terjadi kesalahan saat mencoba menghapus pesan.",
        flags: 64,
      });
    }
  },
};

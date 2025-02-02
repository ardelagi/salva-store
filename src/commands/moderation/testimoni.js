const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testimoni")
    .setDescription("This creates a custom embed")
    .addStringOption((option) =>
      option
        .setName("testi")
        .setDescription("Masukan Jumlah Testimoni")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("This is the description of the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tanggal")
        .setDescription("Tanggal transaksi")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("This is the image URL of the embed")
        .setRequired(false)
    )
    .addMentionableOption((option) =>
      option
        .setName("role")
        .setDescription("Select a role to mention")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async execute(interaction, client) {
    const { options } = interaction;

    const testi = options.getString("testi");
    const description = options.getString("description");
    const tanggal = options.getString("tanggal");
    const image = options.getString("image");
    const role = options.getMentionable("role");

    if (image && !image.startsWith("http")) {
      return await interaction.reply({
        content: "Invalid image URL",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: "MARA STORE Testimoni",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle(testi)
      .setDescription(description)
      .setColor("Blue")
      .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
      .setImage(image)
      .setFooter({
        text: `Transaksi pada tanggal: ${tanggal}`,
      });

    await interaction.reply({
      content: "Pesan Kamu Sudah Terkirim",
      ephemeral: true,
    });

    let mention = "";
    if (role) {
      mention = `<@&${role.id}>`;
    }

    await interaction.channel.send({
      content: `**Thanks you** ${role}`,
      embeds: [embed],
    });
  },
};

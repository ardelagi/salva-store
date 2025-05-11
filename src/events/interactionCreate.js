const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    // Handle Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);

        // Logging
        const logChannel = interaction.guild.channels.cache.get("1335994695070781491");
        if (logChannel) {
          const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("🛠️ Command Digunakan")
            .addFields(
              { name: "Pengguna", value: `${interaction.user.tag} (<@${interaction.user.id}>)`, inline: true },
              { name: "Command", value: `\`/${interaction.commandName}\``, inline: true },
              { name: "Channel", value: `<#${interaction.channel.id}>`, inline: true }
            )
            .setTimestamp();

          logChannel.send({ embeds: [embed] });
        }
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Terjadi kesalahan saat menjalankan command!",
          flags: 64,
        });
      }
    }

    // Publish Announcement
    if (interaction.isButton() && interaction.customId === "publish_announcement") {
      const selected = interaction.message.components[0].components[0].data?.values?.[0];
      if (!selected) return interaction.reply({ content: "Kamu belum memilih channel.", flags: 64 });

      const channel = await interaction.guild.channels.fetch(selected).catch(() => null);
      if (!channel || !channel.isTextBased()) {
        return interaction.reply({ content: "Channel tidak valid.", flags: 64 });
      }

      await channel.send({ content: `Pengumuman dari <@${interaction.user.id}>!` });
      return interaction.reply({ content: "Pengumuman berhasil dikirim!", flags: 64 });
    }

    // Open Embed Modal
    if (interaction.isButton() && interaction.customId === "open_embed_modal") {
      const modal = new ModalBuilder()
        .setCustomId("embed_modal")
        .setTitle("Buat Embed");

      const titleInput = new TextInputBuilder()
        .setCustomId("embed_title")
        .setLabel("Judul")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const descInput = new TextInputBuilder()
        .setCustomId("embed_description")
        .setLabel("Deskripsi")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(titleInput),
        new ActionRowBuilder().addComponents(descInput)
      );

      return await interaction.showModal(modal);
    }

    // Submit Embed Modal
    if (interaction.isModalSubmit() && interaction.customId === "embed_modal") {
      const title = interaction.fields.getTextInputValue("embed_title");
      const desc = interaction.fields.getTextInputValue("embed_description");

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(desc)
        .setColor("Random")
        .setTimestamp();

      return await interaction.update({
        content: "Embed disiapkan. Tekan 'Publish' untuk mengirim.",
        embeds: [embed],
        components: interaction.message.components,
        flags: 64,
      });
    }

    // Publish Embed
    if (interaction.isButton() && interaction.customId === "publish_embed") {
      const channelId = interaction.message.components[0].components[0].data?.values?.[0];
      const embed = interaction.message.embeds?.[0];

      if (!channelId || !embed) {
        return interaction.reply({ content: "Embed atau channel belum dipilih.", flags: 64 });
      }

      const channel = await interaction.guild.channels.fetch(channelId).catch(() => null);
      if (!channel || !channel.isTextBased()) {
        return interaction.reply({ content: "Channel tidak valid.", flags: 64 });
      }

      await channel.send({ embeds: [embed] });
      return interaction.reply({ content: "Embed berhasil dikirim!", flags: 64 });
    }
  },
};
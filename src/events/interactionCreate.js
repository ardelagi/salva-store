const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    try {
      // Slash command handler
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
          await command.execute(interaction, client);
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: "Terjadi kesalahan saat menjalankan command!" });
        }

        // Log ke channel
        const logChannel = interaction.guild.channels.cache.get("1097819763020927027");
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
      }

      // Button: Publish Pengumuman
      if (interaction.isButton() && interaction.customId === "publish_announcement") {
        await interaction.deferReply({ ephemeral: false }); // acknowledge interaction

        const selected = interaction.message.components[0].components[0].data?.values?.[0];
        if (!selected) {
          return await interaction.editReply({ content: "Kamu belum memilih channel." });
        }

        const channel = await interaction.guild.channels.fetch(selected).catch(() => null);
        if (!channel || !channel.isTextBased()) {
          return await interaction.editReply({ content: "Channel tidak valid." });
        }

        await channel.send({ content: `Pengumuman dari <@${interaction.user.id}>!` });
        return await interaction.editReply({ content: "Pengumuman berhasil dikirim!" });
      }

      // Button: Buka modal embed
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

      // Submit Modal Embed
      if (interaction.isModalSubmit() && interaction.customId === "embed_modal") {
        const title = interaction.fields.getTextInputValue("embed_title");
        const desc = interaction.fields.getTextInputValue("embed_description");

        const embed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(desc)
          .setColor("Random")
          .setTimestamp();

        return await interaction.reply({
          content: "Embed disiapkan. Tekan 'Publish' untuk mengirim.",
          embeds: [embed],
          components: interaction.message?.components ?? [],
        });
      }

      // Button: Publish embed
      if (interaction.isButton() && interaction.customId === "publish_embed") {
        await interaction.deferReply();

        const channelId = interaction.message.components[0].components[0].data?.values?.[0];
        const embed = interaction.message.embeds?.[0];

        if (!channelId || !embed) {
          return await interaction.editReply({ content: "Embed atau channel belum dipilih." });
        }

        const channel = await interaction.guild.channels.fetch(channelId).catch(() => null);
        if (!channel || !channel.isTextBased()) {
          return await interaction.editReply({ content: "Channel tidak valid." });
        }

        await channel.send({ embeds: [embed] });
        return await interaction.editReply({ content: "Embed berhasil dikirim!" });
      }
    } catch (err) {
      console.error("[Interaction Error]", err);
      if (interaction.deferred || interaction.replied) {
        interaction.followUp({ content: "Terjadi kesalahan tidak terduga." });
      } else {
        interaction.reply({ content: "Terjadi kesalahan tidak terduga." });
      }
    }
  },
};
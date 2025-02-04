const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Menampilkan daftar server tempat bot berada'),
    async execute(interaction) {
        const client = interaction.client;
        const guilds = client.guilds.cache.map(guild => `- **${guild.name}** (${guild.id})`).join("\n");

        if (!guilds) {
            return interaction.reply({ content: "Bot tidak ada di server mana pun.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle("Daftar Server Bot")
            .setDescription(guilds)
            .setColor("Yellow") // Sesuaikan dengan preferensi warna logomu
            .setFooter({ text: `Total: ${client.guilds.cache.size} server` });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
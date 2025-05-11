const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servers')
        .setDescription('Menampilkan daftar server tempat bot berada dengan owner, jumlah member, dan link invite'),
    async execute(interaction) {
        const client = interaction.client;
        let serverList = [];

        for (const [id, guild] of client.guilds.cache) {
            let invite = "Tidak dapat membuat invite";
            let memberCount = guild.memberCount || "Tidak diketahui";
            let owner = "Tidak diketahui";

            try {
                // Mendapatkan owner server
                const ownerUser = await guild.fetchOwner();
                owner = ownerUser ? `${ownerUser.user.tag} (${ownerUser.id})` : "Tidak diketahui";

                // Mencari channel yang bisa digunakan untuk membuat invite
                const channels = guild.channels.cache.filter(channel => 
                    channel.isTextBased() && channel.permissionsFor(client.user).has('CreateInstantInvite')
                );

                if (channels.size > 0) {
                    try {
                        const inviteChannel = channels.first();
                        const inviteLink = await inviteChannel.createInvite({ 
                            maxAge: 0, 
                            maxUses: 0,
                            unique: true
                        });
                        invite = `[Invite Link](${inviteLink.url})`;
                    } catch (inviteError) {
                        console.error(`Gagal membuat invite untuk ${guild.name}:`, inviteError);
                        invite = "Tidak dapat membuat invite (Error)";
                    }
                }
            } catch (error) {
                console.error(`Gagal mendapatkan data untuk ${guild.name}:`, error);
            }

            serverList.push(`- **${guild.name}** (${guild.id})  
  **👥 ${memberCount} member**  
  **👑 Owner:** ${owner}  
  🔗 ${invite}`);
        }

        if (serverList.length === 0) {
            return interaction.reply({ content: "Bot tidak ada di server mana pun.", ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setTitle("Daftar Server Bot")
            .setDescription(serverList.join("\n\n"))
            .setColor("Yellow")
            .setFooter({ text: `Total: ${client.guilds.cache.size} server` });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
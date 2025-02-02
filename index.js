const { blue } = require("colorette");
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
  Events,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  ButtonBuilder,
  AttachmentBuilder,
  ActionRow,
  ActionRowBuilder,
  InteractionType,
  AuditLogEvent,
} = require(`discord.js`);
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

require("dotenv").config();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  for (file of functions) {
    require(`./src/functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();

/* =================== Product Discord =================== */
client.on(Events.InteractionCreate, async (interaction) => {
  if (
    interaction.isButton() &&
    ["nitro", "boost", "account"].includes(interaction.customId)
  ) {
    switch (interaction.customId) {
      case "nitro":
        const nitroEmbed = new EmbedBuilder()
          .setTitle("**Nitro Discord**")
          .addFields({
            name: "**Nitro Boost**",
            value: `1 Bulan Via Gift : Rp. 105.000
1 Tahun Via Gift : Rp. 700.000`,
          })
          .addFields({
            name: "**Nitro Basic**",
            value: `1 Bulan Via Gift : Rp. 30.000`,
          })
          .addFields({
            name: "Syarat & Ketentuan",
            value: `1. Aktivasi dengan gift link
2. Unlimited regen
3. Full warranty
4. Fresh link
5. Legal paid
6. 0% auto claim
7. Claim time 41h
8. Bisa di tumpuk 2 nitro
9. Tidak ada batasan umur akun
10. Bisa menggunakan akun yang sudah pernah nitro`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
        await interaction.reply({ embeds: [nitroEmbed], ephemeral: true });
        break;

      case "boost":
        const boostEmbed = new EmbedBuilder()
          .addFields({
            name: "**Boost Server**",
            value: `1 Bulan • 14X Boost : Rp. 55.000
3 Bulan • 14X Boost : Rp. 110.000`,
          })
          .addFields({
            name: "**Syarat & Ketentuan**",
            value: `- Anti revoke
- Kick/ban akun boost? garansi hangus
- Proses manual tidak pake tools`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
        await interaction.reply({ embeds: [boostEmbed], ephemeral: true });
        break;

        case "account":
          const accountEmbed = new EmbedBuilder().addFields({
            name: "Account Discord",
            value: `- 1 Bulan : IDR 6.000
- 2023 : IDR 11.000
- 2022 : IDR 20.000
- 2021 : IDR 25.000
- 2020 : IDR 30.000
- 2019 : IDR 40.000
- 2018 : IDR 50.000
- 2017 : IDR 70.000
- 2016 : IDR 135.000
- 2015 : IDR 970.000
`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
          await interaction.reply({ embeds: [accountEmbed], ephemeral: true });
    }
  }
});






/* =================== Product Premium App =================== */
client.on(Events.InteractionCreate, async (interaction) => {
  if (
    interaction.isButton() &&
    ["youtube", "netflix", "spotify"].includes(interaction.customId)
  ) {
    switch (interaction.customId) {
      case "youtube":
        const youtubeEmbed = new EmbedBuilder()
          .setTitle("**Nitro Discord**")
          .addFields({
            name: "**Nitro Boost**",
            value: `1 Bulan Via Gift : Rp. 105.000
1 Tahun Via Gift : Rp. 700.000`,
          })
          .addFields({
            name: "**Nitro Basic**",
            value: `1 Bulan Via Gift : Rp. 30.000`,
          })
          .addFields({
            name: "Syarat & Ketentuan",
            value: `1. Aktivasi dengan gift link
2. Unlimited regen
3. Full warranty
4. Fresh link
5. Legal paid
6. 0% auto claim
7. Claim time 41h
8. Bisa di tumpuk 2 nitro
9. Tidak ada batasan umur akun
10. Bisa menggunakan akun yang sudah pernah nitro`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
        await interaction.reply({ embeds: [youtubeEmbed], ephemeral: true });
        break;

      case "netflix":
        const netflixEmbed = new EmbedBuilder()
          .addFields({
            name: "**Boost Server**",
            value: `1 Bulan • 14X Boost : Rp. 55.000
3 Bulan • 14X Boost : Rp. 110.000`,
          })
          .addFields({
            name: "**Syarat & Ketentuan**",
            value: `- Anti revoke
- Kick/ban akun boost? garansi hangus
- Proses manual tidak pake tools`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
        await interaction.reply({ embeds: [netflixEmbed], ephemeral: true });
        break;

        case "spotify":
          const spotifyEmbed = new EmbedBuilder().addFields({
            name: "Account Discord",
            value: `- 1 Bulan : IDR 6.000
- 2023 : IDR 11.000
- 2022 : IDR 20.000
- 2021 : IDR 25.000
- 2020 : IDR 30.000
- 2019 : IDR 40.000
- 2018 : IDR 50.000
- 2017 : IDR 70.000
- 2016 : IDR 135.000
- 2015 : IDR 970.000
`,
          })
          .setColor("#0000cd")
          .setFooter({ text: "MARA STORE" });
          await interaction.reply({ embeds: [spotifyEmbed], ephemeral: true });
    }
  }
});
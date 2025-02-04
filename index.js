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
  async function connectWithRetry(maxAttempts = 5) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await client.login(process.env.token);
        console.log("Successfully connected to Discord!");
        return;
      } catch (error) {
        console.error(`Connection attempt ${attempt}/${maxAttempts} failed:`, error.message);
        if (attempt === maxAttempts) {
          console.error("Max retry attempts reached. Please check Discord's status and your token.");
          throw error;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  connectWithRetry().catch(error => {
    console.error("Failed to start bot:", error.message);
  });
})();



/* =================== Bot Monitoring =================== */


require("dotenv").config();
const axios = require("axios");

const webhookUrl = process.env.WEBHOOK_URL;

async function sendWebhookMessage(content) {
  if (!webhookUrl) {
    console.error("Webhook URL is not set in environment variables.");
    return;
  }

  try {
    await axios.post(webhookUrl, { content }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      validateStatus: function (status) {
        return status < 500; // Only treat 500+ errors as actual errors
      },
      maxRedirects: 5,
      retry: 3,
      retryDelay: 1000
    });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    // Continue bot operation even if webhook fails
  }
}


client.once("ready", () => {
  sendWebhookMessage(`✅ Bot **${client.user.tag}** is now online!`);
});


client.on("disconnect", () => {
  sendWebhookMessage("⚠️ Bot has been disconnected from Discord!");
});


process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  sendWebhookMessage(`❌ Bot mengalami error: \`${err.message}\``);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  sendWebhookMessage(`❌ Unhandled Rejection: \`${reason}\``);
});


process.on("exit", () => {
  sendWebhookMessage("🔴 Bot is now offline!");
});

process.on("SIGTERM", () => {
  sendWebhookMessage("🔴 Bot is shutting down!");
  process.exit(0);
});




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
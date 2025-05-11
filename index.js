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
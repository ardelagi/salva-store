require("colors");
const { ActivityType } = require("discord.js");
const {
  green,
  yellow,
  magenta,
  cyan,
  red,
  blue,
  magentaBright,
  white,
} = require("colorette");

console.log(green(`░██████╗░██████╗░██╗███╗░░░███╗███████╗`));
console.log(green("██╔════╝░██╔══██╗██║████╗░████║╚════██║"));
console.log(green("██║░░██╗░██████╔╝██║██╔████╔██║░░███╔═╝"));
console.log(green("██║░░╚██╗██╔══██╗██║██║╚██╔╝██║██╔══╝░░"));
console.log(green("╚██████╔╝██║░░██║██║██║░╚═╝░██║███████╗"));
console.log(green("░╚═════╝░╚═╝░░╚═╝╚═╝╚═╝░░░░░╚═╝╚══════╝"));

const date = new Date();

console.log(
  cyan(
    `[${date.toLocaleTimeString()}] ${blue(
      "=================================="
    )}`
  )
);
console.log(
  cyan(
    `[${date.toLocaleTimeString()}] ${white("Grimz ProjectBot Starting...")}`
  )
);
console.log(cyan(`[${date.toLocaleTimeString()}] ${white("Version: v1.0.0")}`));
console.log(
  cyan(`[${date.toLocaleTimeString()}] ${white("Author: Grimz Development")}`)
);
console.log(
  cyan(
    `[${date.toLocaleTimeString()}] ${white(
      `Discord.js Version: ${require("discord.js").version}`
    )}`
  )
);
console.log(
  cyan(
    `[${date.toLocaleTimeString()}] ${blue(
      "=================================="
    )}`
  )
);

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`[INFO]`.blue + ` ${client.user.tag} is online!`);

    client.user.setPresence({
      activities: [{ name: "MARA STORE", type: ActivityType.Playing }],
      status: "idle",
    });
  },
};

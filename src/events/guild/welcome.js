const { Events, EmbedBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas"); // install ini via npm

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const welcomeChannelId = "1131180403810652260"; // ganti dengan ID channel welcome
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) return;

    // Buat Canvas
    const canvas = Canvas.createCanvas(800, 400);
    const ctx = canvas.getContext("2d");

    // Background
    const background = await Canvas.loadImage("https://i.imgur.com/FUIdr1p.png"); // ganti dengan gambar latar
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Avatar
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: "png" }));
    ctx.beginPath();
    ctx.arc(400, 200, 80, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 320, 120, 160, 160);

    // Teks
    ctx.font = "bold 28px Sans";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Welcome ${member.user.username}!`, 250, 320);

    const attachment = {
      files: [{ attachment: canvas.toBuffer("image/png"), name: "welcome.png" }],
    };

    const embed = new EmbedBuilder()
      .setTitle(`Selamat datang, ${member.user.username}!`)
      .setDescription(`Kamu adalah member ke-${member.guild.memberCount}`)
      .setColor("Yellow")
      .setImage("attachment://welcome.png");

    channel.send({ embeds: [embed], ...attachment });
  },
};
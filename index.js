const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const prefix = "oreo";

const historial = {};

client.once("ready", () => {
  console.log(`✅ ${client.user.tag} está online!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  let args = [];
  let command = "";

  if (message.content.startsWith("/")) {
    const sinSlash = message.content.slice(1);
    args = sinSlash.split(" ");
    command = args.shift().toLowerCase();
  } else {
    args = message.content.split(" ");
    command = args.shift().toLowerCase();
  }

  // OREO HELP
  if (command === "oreohelp") {
    message.reply(`
🍪 **Comandos de Oreo Bot**

oreohelp
oreomute @usuario tiempo razón(opcional)
oreoban @usuario razón(opcional)
oreoexpulsar @usuario razón(opcional)
oreowarn @usuario razón(opcional)
oreohistorial @usuario

Ejemplos:
oreomute @Sara 10m spam
oreoban @Sara insultos
oreowarn @Sara lenguaje tóxico
`);
  }

  // OREO WARN
  if (command === "oreowarn") {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return message.reply("❌ No tienes permisos.");
    }

    const usuario = message.mentions.users.first();
    if (!usuario) return message.reply("⚠️ Menciona un usuario.");

    const razon = args.slice(1).join(" ") ||

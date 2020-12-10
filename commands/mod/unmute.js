const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.js');
const { Command } = require('discord.js-commando');
const got = require('got');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      aliases: ['unm'],
      group: 'mod',
      memberName: 'unmute',
      guildOnly: true,
      description: 'Unmute a member on a text channel',
      userPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],

      args: [
        {
          key: 'name',
          prompt: 'Member to work?',
          type: 'user'
        }
      ]
    });
  }
  
  run(message, { name }) {
if(message.author.bot) return;

    let perms = name.permissions;


      message.channel.updateOverwrite(name, {
  SEND_MESSAGES: true
}).then(
  message.channel.send(`Unmuted ${name}`)
  )
  

  

}
}
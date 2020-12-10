const fetch = require('node-fetch');
const { tenorAPI } = require('../../config.js');
const { Command } = require('discord.js-commando');
const got = require('got');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      aliases: ['silence'],
      group: 'mod',
      memberName: 'mute',
      guildOnly: true,
      description: 'Mute a member on a text channel',
      userPermissions: ['MANAGE_ROLES'],
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


//  if (name.hasPermission('MANAGE_ROLES')) return
message.channel.updateOverwrite(name, {
  SEND_MESSAGES: false
})
    .then(message.channel.send(`Muted ${name}`))
    .catch(err => message.channel.send("Oops I can't do that! The person probably has a higher role than me or I lack permissions to mute."));

}
}




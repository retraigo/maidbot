const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'cleanup',
      aliases: ['prune'],
      memberName: 'cleanup',
      group: 'mod',
      description: 'Cleanup inactive members.',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      args: [
        {
          key: 'days',
          prompt: 'Number of days of inactivity!',
          type: 'integer',
          default: ""
        }
      ]
    });
  }

  run(message, { days }) {
    if(message.author.bot) return;
    if (!days) return message.reply("Format: `a!cleanup <days of inactivity>`")
    console.log(days + message.guild.name)
    
    if (days == 0) return message.reply("Format: `a!cleanup <days of inactivity>`")

    message.guild.members
      .prune({ days: days, reason: "Cleanup by the maid."})
      .then(members => {
        const banEmbed = new MessageEmbed()
          .setTitle("Cleanup Successful!")
          .addField('Days of Inactivity:', days)
          .addField('Members Kicked:', members)
          .setColor('#ffffff');
        message.channel.send(banEmbed);
      })
      .catch(e => {
        message.say(
          'Something went wrong when trying to exterminate the zombies, I probably do not have the permission to kick them in the butt.'
        );
        return console.error(e);
      });
  }
};

const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: ['banhammer'],
      memberName: 'ban',
      group: 'mod',
      description: 'Bans mentioned member',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToBan',
          prompt:
            'Mention the one you wanna ban!',
          type: 'user',
          default: ""
        },
        {
          key: 'reason',
          prompt: 'Reason for ban? You do not want the poor fellow to wonder why they got kicked, right?',
          type: 'string',
          default: "Banished by the maid."
        }
      ]
    });
  }

  run(message, { userToBan, reason }) {
    if(message.author.bot) return;
    if (!userToBan) return message.reply("Whom should I ban, master? Repeat the command with the name of the user.")
    console.log(userToBan)
    const user = userToBan
    if (user == message.author) return message.reply("Why does master wish to ban themselves?")
    var reasoN = '"' + reason + '"'

    message.guild.members
      .ban(user, { reason: reasoN})
      .then(() => {
        const banEmbed = new MessageEmbed()
          .setTitle("User Banned")
          .addField('User:', userToBan)
          .addField('Reason', reason)
          .setColor('#ffffff');
        message.channel.send(banEmbed);
      })
      .catch(e => {
        message.say(
          'Something went wrong when trying to ban this user, I probably do not have the permission to ban them'
        );
        return console.error(e);
      });
  }
};

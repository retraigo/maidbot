const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['kick-out', 'throw'],
      memberName: 'kick',
      group: 'mod',
      description: 'Kicks a tagged member',
      guildOnly: true,
      userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
      args: [
        {
          key: 'userToKick',
          prompt: 'Who is the victim of thy rage?',
          type: 'user'
        },
        {
          key: 'reason',
          prompt: 'May I know the reason for kicking?',
          type: 'string',
          default: "Kicked by the maid."
        }
      ]
    });
  }

  run(message, { userToKick, reason }) {
    if(message.author.bot) return;
    const user = message.guild.member(userToKick)
    if (user == undefined) return message.reply("The person you're trying to kick doesn't seem to be valid, master!")
    if (userToKick == message.author) return message.reply("I need a user to kick, master!")
    
      user.kick(reason)
      .then(() => {
        //message.say(`Kicked ${userToKick} reason: ${reason}`)
        const kickEmbed = new MessageEmbed()
          .setTitle("User Kicked")

          .addField('User:', userToKick)
          .addField('Reason:', reason)
          .setColor('#ffffff');
        message.channel.send(kickEmbed);
      })
      .catch(e => {
        message.say(
          "An error occured. Check my permissions and the member's permissions once!"
        );
        return console.error(e);
      });
  }
};

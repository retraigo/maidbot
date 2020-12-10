const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanListCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'banlist',
      aliases: ['bans'],
      memberName: 'banlist',
      group: 'mod',
      description: 'Fetch banned members!',
      guildOnly: true,
      userPermissions: ['KICK_MEMBERS', 'BAN_MEMBERS']
    });
  }

 async run(message) {
    if(message.author.bot) return;
  let banneds = await message.guild.fetchBans()
    let banned = banneds.array() 
    let i = 0;
    let list = "";
            const banEmbed = new MessageEmbed()
          .setTitle("Users banned from " + message.guild.name)     
    while (i < banned.length){
      
      banEmbed.addField(banned[i].user.username, banned[i].reason, false)
      i += 1
      
    }
    


          banEmbed.setColor('#944dff');
        message.channel.send(banEmbed);    



  }
};

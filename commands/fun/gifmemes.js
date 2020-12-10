const { tenorAPI } = require('../../config.js');
const { Command } = require('discord.js-commando');
const animemes = require("animemes")
const Discord = require("discord.js");

module.exports = class GifCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'Animemes',
      aliases: ['word'],
      group: 'fun',
      memberName: 'memes',
      guildOnly: true,
      description: 'Search for a gif from Animemes!',
      args: [
        {
          key: 'query',
          prompt: 'What do you want to search for?',
          type: 'memes',
          default: ""
          
        }
      ]
    
    });
  
  }

  
 async run(message, { query }) {
if(message.author.bot) return;
    if (!query) return message.reply("I can't search for nothing!") 

   var list = await animemes.getAllResults(query) //'966c6a86e1fecc5b5a9b65cb165661d7525265a467ed9abad9a4f5a62f9 

   let listA = list[Math.floor(Math.random() * list.length)]
if (listA == undefined) return message.reply("Oi thats pretty bad ya know! I can't find this word or whatever ya wanna search!")
   var word = listA.word
var deF = listA.definition

    const listEmbed = new Discord.MessageEmbed()
      .setColor("#944dff")
      .addFields(
        { name: `Word`, value: word },
        { name: `Result`, value: deF },
   )
   message.channel.send(listEmbed)
        .then(sent => console.log(`Sent a reply to ${message.author.username}`))
    
  
}

}

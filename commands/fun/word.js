const { tenorAPI } = require('../../config.js');
const { Command } = require('discord.js-commando');
const urbanDictionary = require("very-urban")
const dictionary = new urbanDictionary()
const Discord = require("discord.js");

module.exports = class GifCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      aliases: ['word'],
      group: 'fun',
      memberName: 'urban',
      guildOnly: true,
      description: 'Search for a word from urbandictionary!',
      args: [
        {
          key: 'query',
          prompt: 'What do you want to search for?',
          type: 'string',
          default: ""
          
        }
      ]
    
    });
  
  }

  
 async run(message, { query }) {
if(message.author.bot) return;
    if (!query) return message.reply("I can't search for nothing!") 

   var list = await dictionary.getAllResults(query) //searches for the word "urban"

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

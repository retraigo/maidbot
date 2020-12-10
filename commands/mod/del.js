const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'delete',
      aliases: ['del'],
      description: 'Delete recent messages! (max 60)',
      group: 'mod',
      memberName: 'delete',
      guildOnly: true,
      userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
      args: [
        {
          key: 'count',
          prompt: 'Number of messages to disintegrate?',
          type: 'integer',
          default: 2
        }
      ]
    });
  }

  run(message, args) {
    var delC = args.count;
    message.channel
      .bulkDelete(delC)
//      .then(messages => message.say(`Purged the last ${messages.size} messages successfully!`))
      .catch(err => {
        console.error(err);
        return message.say(
          'Sorry, but an unexpected error when trying to purge the messages~'
        );
      });
  }
};
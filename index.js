const Discord = require("discord.js");
const Commando = require('discord.js-commando');

const client = new Commando.Client({
    owner: '254950404050255872',
    commandPrefix: 'a!'
});
var apiai = require("apiai");
var config = require("./config");
var app = apiai(config.Dialogflow);
console.log(config);

client.on("ready", function() {
  console.log("Morning, master~");
  client.user.setActivity("Maid", { type: "WATCHING" }).catch(console.error);
  //console.log(client.user.username);
});


const express = require("express");
const aPP = express();

aPP.use(express.static("public"));


aPP.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

const listener = aPP.listen(process.env.PORT, () => {
  console.log("Your aPP is listening on port " + listener.address().port);
});


const path = require('path');

client.registry
  .registerDefaultTypes()
    .registerGroups([
        ['fun', 'Fun commands'],
        ['mod', 'Moderator Commands']
    ])

  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: true,
    prefix: false,
    ping: false,
    commandState: false,
    help: false,
    unknownCommand: false
  })

    .registerCommandsIn(path.join(__dirname, 'commands'));


client.login(config.Discord);

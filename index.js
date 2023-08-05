const { bprefix, developerID } = require("./config.json")
const math = require("mathjs")
const { config } = require("dotenv");
const fetch = require("node-fetch");
const db =require("quick.db");
const moment = require("moment");
const ima = require("image-cord")
const Discord = require('discord.js')
const { Client, MessageEmbed, Collection }  = require('discord.js');
const { readdirSync } = require("fs");
const { join } = require("path");
const disbut = require('discord-buttons')
const client = new Discord.Client({
  disableEveryone: false
});
disbut(client)
client.queue = new Map();
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
let cooldown = new Set();
let cdseconds = 3; 
 const DisTube = require("distube")
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

const yts = require('yt-search');

const ads = require("./JSON/ad.json")



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
process.on('UnhandledRejection', console.error);
 

client.on("message", async message => {
  let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = bprefix
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
  
   const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {

    let embed = new MessageEmbed()
        .setTitle(`${client.user.username} is Here!`)
        .setDescription(`Hey **${message.author.username},** eu fui feito por <@${developerID}> 

        Bot Prefix: \`${prefix}\`
        Link de convite: [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)

        :question: Ainda precisa de ajuda? [Click aqui](https://discord.gg/Q9FtePQzuZ) para entrar no servidor
        `)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("#006732")
        .setFooter(`Obrigado por me usar`)

    return message.channel.send(embed);
  }


    
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
let ad = ads.ad[Math.floor((Math.random() * ads.ad.length))];
  if(cooldown.has(message.author.id)){

    return message.channel.send(`**${message.author.username}** aguarde 3 segundos para usar este comando novamente! \n\n ${an}`)
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
cooldown.delete(message.author.id)}, cdseconds * 1000)

  if (!message.member)
    message.member = message.guild.fetchMember(message);


  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command.premium) {
    let guild = await db.get(`premium_${message.guild.id}`);


    if (!guild) {
      return message.channel.send(`Você pode usar este comando apenas no servidor premium. \n **Deseja tornar seu servidor premium?** Doe NÓS!: https://discord.gg/ZZ3SueTWmZ`)
    }

  }
   let ops = {
            queue: queue,
            queue2: queue2,
            queue3: queue3,
            games: games
        }


  if (command) command.run(client, message, args, ops);
  

});



client.on("message", async message => {

const channel = db.get(`count_${message.guild.id}`);


const chan = client.channels.cache.get(channel);
 if (message.channel.id == chan) {
    if (message.author.bot) return;
    message.channel.startTyping();

     if(isNaN(message.content)) {
       message.delete();
                return message.author.send(`Você deve incluir apenas o número!`)
            
            }
message.channel.send(`${math.evaluate(`${message.content} + 1`)}`)
 message.channel.stopTyping();

 }

        
});


// Do not change anything here
require('http').createServer((req, res) => res.end(`
|---------------------------------------| 
| Informações                           | 
|---------------------------------------| 
|• Vivo: 24/7                           | 
|---------------------------------------| 
|• Autor: vitorgamer05#0                |
|---------------------------------------|
|• Servidor: https://discord.gg/TEMauza | 
|---------------------------------------|
|• Github: https://github.com/@vitorgamer052 |
|---------------------------------------|
|• Licença: Licença Apache 2.0 | 
|---------------------------------------|
`)).listen(3000) //Dont remove this 

client.on("ready", () => {
   client.user.setStatus("dnd"); // Você pode alterá-lo para online, dnd, ocioso

 console.log(`Login com sucesso como ${client.user.tag} `)
});




//  Para assistir status
// client.on("ready", () => {
// client.user.setActivity(`Relaxando com o proprietário`, { type:         "TRANSMISSÃO",
// url: "https://www.youtube/tanjiro-bot"})
// console.log(`Sucesso loconsole.log(`iniciado com sucesso como ${client.user.tag}});

client.login(process.env.TOKEN);

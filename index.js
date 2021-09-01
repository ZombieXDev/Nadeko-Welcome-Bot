const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require('discord.js')
const client = new Discord.Client()
const Database = require("st.db")
const db = new Database("Setting")
const ms = require("ms")
////////////////////////////
const prefix = "Your Prefix"
////////////////////////////
client.on("message", message =>{
if(message.content === prefix + "help"){
const ch = db.fetch("channel")
const time = db.fetch("time")
const msg = db.fetch("msg")
const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())
.addField("Commands:", `\`${prefix}set-welcome\` : To Change Welcome Channel and Delete time and Message`, true)
.addField("Config:",`Welcome Channel: [<#${ch}>]\nDelete Time: [${time}]\nMessage: [${msg}]`, true)
message.channel.send(embed)
}
if(message.content.startsWith(prefix + "set-welcome")){
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌ | Error")
.setColor("RED")
.setDescription("You Dont Have \`ADMINISTRATOR\` Permission"))

const ch = message.mentions.channels.first()
if(!ch) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌ | Error")
.setColor("RED")
.setDescription("Please Mention Welcome Channel")) 
const args = message.content.split(" ")
const time = args[2]
if(!time) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌ | Error")
.setColor("RED")
.setDescription("Please Change Delete Time. EX: 1s,1m,1h,1d"))
const msg = message.content.split(" ").slice(3).join(" ")
if(!msg) return message.channel.send(new Discord.MessageEmbed()
.setTitle("❌ | Error")
.setColor("RED")
.setDescription("Please Type Welcome Message"))
db.set("channel", ch.id)
db.set("time", time)
db.set("msg", msg)
const embed = new Discord.MessageEmbed()
.setTitle("✅ | Done")
.setColor("GREEN")
.setDescription("Done Changed All Setting")
message.channel.send(embed)
} 
})

client.on("guildMemberAdd", member=> {
const ch = db.fetch("channel")
const time = db.fetch("time")
const msg = db.fetch("msg")
const chh = client.channels.cache.get(ch)

chh.send(`<@${member.id}> ${msg}`).then(m =>{
setTimeout(function(){
m.delete()
}, ms(time))
})
.catch(() => {console.log(` `)})
});

client.login(process.env.token)

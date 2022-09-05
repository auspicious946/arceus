const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents : [
        "3276799"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) =>{
    if (message.content == "hi"){
        message.reply("Hello World!")
    }
})


const welcomeChannelId = "1012068960365199410"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> has joined the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)
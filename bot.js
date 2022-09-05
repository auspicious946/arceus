const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents : [
        "3276799"
    ]
})

console.log("Arceus is waking up from His sleep...")

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

let bot = {
    client,
    prefix: ["arc", "arceus"],
    owners: ["784805830611697665", "839824624178823188"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)

module.exports = bot

const welcomeChannelId = "1012068960365199410"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `I have succesfuly created <@${member.id}>!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)
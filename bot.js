console.log("Arceus is waking up from His sleep...")

const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents : [
        "3276799"
    ]
})

let bot = {
    client,
    prefix: ["arc", "arceus"],
    owners: ["784805830611697665", "839824624178823188"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

client.on("ready", () => {
    console.log(`Succesfully logged in as ${client.user.tag}`)
    
    client.user.setStatus('dnd')
    client.user.setPresence({
        game: {
            name: 'Surya edit my code',
            type: 'WATCHING'
        }
    });
})

const welcomeChannelId = "1012068960365199410"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `I have succesfuly created <@${member.id}>!`,
        files: [img]
    })
})

module.exports = bot

client.login(process.env.TOKEN)
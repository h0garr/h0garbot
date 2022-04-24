const Discord = require("discord.js")
const generateImage = require("./generateImage")

require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Loged in as ${client.user.tag}`)
})

client.on("messageCreate", (message)=>{
    if (message.content == "cao"){
        message.reply("hi")
    }
})

const welcomeChannelId = "967891885018472549"

client.on("guildMemberAdd", async (member)=>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!!!`,
        files: [img]
    })
    
})

client.login(process.env.TOKEN)


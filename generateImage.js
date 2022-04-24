const Canvas = require("canvas")
const Discord = require("discord.js")

const background = "https://wallpapercave.com/dwp1x/wp4920554.jpg"

const dim = {
    height: 393,
    width: 700,
    margin: 10
}

const av = {
    size: 256,
    x: 222,
    y: 72
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size:av.size})

    const canvas = Canvas.createCanvas(dim.width,dim.height)
    const ctx = canvas.getContext("2d")

    //draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg,0,0)
    
    //draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    //write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    //draw in welcome
    ctx.font = "40px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 50)

    //draw in the username
    ctx.font = "30px Roboto"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 35)

    //draw in to the server
    ctx.font = "20px Roboto"
    ctx.fillText("to the server", dim.width/2, dim.height - dim.margin - 15)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage
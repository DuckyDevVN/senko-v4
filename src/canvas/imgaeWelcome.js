const Canvas = require("canvas")
const { AttachmentBuilder } = require("discord.js")
const background = "https://media.discordapp.net/attachments/973951116477861928/981557845935931392/Resizer_16540919855601.jpeg"

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.displayName
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    ctx.font = "50px Roboto"
    ctx.fillText(`CHÀO MỪNG TỚI ${member.guild.name}`, dim.width/2, dim.margin + 70)

    ctx.font = "60px Roboto"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    ctx.font = "40px Roboto"
    ctx.fillText(`BẠN LÀ MEMBER THỨ ${member.guild.memberCount}`, dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage
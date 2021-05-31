const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const button = require("discord-buttons")(client);

function checksettings(){
    if(!config.discord.logschannelid) {
        console.error("[VERIFY BOT] Logs channel ID is not defined!")
        client.destroy()
        return
        } else if(!config.discord.token) {
            console.error("[VERIFY BOT] Bot token is not defined!")
            client.destroy()
            return
        } else if(!config.discord.verifychannelid) {
        console.error("[VERIFY BOT] Verify channel ID is not defined!")
        client.destroy()
        return
        } else if(!config.discord.verifiedroleid) {
            console.error("[VERIFY BOT] Verified role ID is not defined!")
            client.destroy()
            return
        } else if(!config.discord.rolewithpermissionsid) {
            console.error("[VERIFY BOT] Role with Permissions ID is not defined!")
            client.destroy()
            return
        } else if(!config.discord.serverid) {
            console.error("[VERIFY BOT] Server ID is not defined!")
            client.destroy()
            return
        } else {
            console.log("[VERIFY BOT] Bot is online!")
        }
}

client.on("ready", () => {
    console.log("[VERIFY BOT] Checking settings...")
    checksettings()
    client.user.setActivity("verify!")
})

client.on("message", (message) => {
    if(message.content === config.discord.prefix+"setup") {
    if(!message.member.roles.cache.some(r => r.id === config.discord.rolewithpermissionsid)) {
    message.reply('You cannot use this command!')
    message.delete()
    return
    }
    let verifybutton = new button.MessageButton().setStyle("gray").setLabel("Verify").setID("verifybutton")
    let verifychannel = client.channels.cache.get(config.discord.verifychannelid)
    let myembed = new Discord.MessageEmbed().setDescription('``Verify yourself with clicking button below!``').setColor("BLUE");
    message.delete()
    verifychannel.send({ button: verifybutton, embed: myembed });
    console.log("[VERIFY BOT] Setup message has been sended!")
    }
})


client.on('clickButton', async (button) => {
    let logschannel = client.channels.cache.get(config.discord.logschannelid)
    let guild = client.guilds.cache.get(config.discord.serverid)
    let member = guild.members.cache.get(button.clicker.user.id)
    if(member.roles.cache.some(r => r.id === config.discord.verifiedroleid)) return member.send("```[VERIFY BOT] You are already verified.```")
    if (button.id === 'verifybutton') {
    button.defer()
    member.roles.add(config.discord.verifiedroleid)
    member.send("```[VERIFY BOT] Successfully verified.```")
    logschannel.send("```"+button.clicker.user.tag + " verified!```")
    }
  });

client.login(config.discord.token)
// bot by bb.#9999

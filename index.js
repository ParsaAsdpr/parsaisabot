const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require('moment');
const prefix = '$';
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port)

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  client.user.setActivity(` 85 servers | type $help`,{type: 'WATCHING'});
  client.user.setStatus('idle')
});


client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});



client.on("message", async message => {
  if(message.author.bot) return;
  
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  



  if (message.channel.type == "dm") return;
  


  if(command === "kick") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
    return;
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.send(new Discord.MessageEmbed().setDescription("That user seems invalid"));
    if(!member.kickable) 
      return message.send("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      return message.channel.send(new Discord.MessageEmbed().setTitle(':no_entry: User Kicked').setColor(0x5CD800).addField('Username',member.user.tag).setFooter(`Moderator: ${message.author.tag}`).setTimestamp(Date.now()).addField("User ID",member.id));
  }
  



  if (command === "ban") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
    return;
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason).then((member) => {
       return message.channel.send(new Discord.MessageEmbed().setTitle(':no_entry: User Banned').setColor(0x5CD800).addField('Username',member.user.tag).setFooter(`Moderator: ${message.author.tag}`).setTimestamp(Date.now()).addField("User ID",member.id));
    })    .catch(() => {
        if (!message.author.hasPermission(['BAN_MEMBERS'])) {
            message.send("You cannot ban members");
        } else if (member.hasPermission(['BAN_MEMBERS',])) {
            message.send("You cannont ban this member");
        }
    }) 
}   
  


  if(command === "purge") {
    const deleteus = message.member.hasPermission("MANAGE_MESSAGES");
    if (!deleteus){
      message.channel.send(new Discord.MessageEmbed().setTitle('You don\'t have permissions to delete messages').setColor(0xff0000))
    }

    message.delete().catch(O_o=>{}); 
    if (deleteus){
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(new Discord.MessageEmbed().setTitle('Please pick a number between 2 and 100 to delete messagess').setColor(0xfc0303))

    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(new Discord.MessageEmbed().setTitle(`Couldn't delete messages because of: ${error}`).setColor(0xfc0303)));
  }
  }
//.................................................Emotes.......................................................................................................................................................................


  if(command === 'hug') {
   
    var hug = ["https://media.tenor.com/images/9fe95432f2d10d7de2e279d5c10b9b51/tenor.gif","https://media.tenor.com/images/8f44c083c55620c02f59c6bea378dca4/tenor.gif","https://media.tenor.com/images/778282e02d511fbc061e1439a5105c6f/tenor.gif", "https://i.imgur.com/r9aU2xv.gif", "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif"];
var hugs = Math.floor(Math.random() * hug.length);

    const sayhug = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(sayhug).setImage(hug[hugs]).setColor('RANDOM'));
  }


  if(command === 'cry') {

    var crys = ["https://media.tenor.com/images/c8f6d1972f6051cf40fec17da7b18a53/tenor.gif","https://media.tenor.com/images/19089cd2b4970740debff2cdfc43329a/tenor.gif","https://media.tenor.com/images/eda88aaad47aaab5d861c19a03d73e27/tenor.gif","https://media.tenor.com/images/eda88aaad47aaab5d861c19a03d73e27/tenor.gif","https://media.tenor.com/images/a901f319531c79f6115e270ef510fdb3/tenor.gif"];
    var cry = Math.floor(Math.random() * crys.length);
    
    const saycry = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(saycry).setImage(crys[cry]).setColor('RANDOM'));
  }


  if(command === 'dance') {

    var dances = ["https://i.imgur.com/GKHY47d.gif","https://i.imgur.com/5ULGhAn.gif","https://i.imgur.com/YbdJb5Z.gif","https://i.imgur.com/VV8f9TC.gif","https://i.imgur.com/P3pdnij.gif"];
    var dance = Math.floor(Math.random() * dances.length);

    const saydance = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(saydance).setImage(dances[dance]).setColor('RANDOM'));
  }


  if(command === 'sing') {

    var sings = ['https://media.tenor.com/images/99f96ee7c0e789c420c958af86716b91/tenor.gif','https://media.tenor.com/images/6c6b2fe4151d2f761b6c27bd7f7db7ac/tenor.gif','https://media.tenor.com/images/6c6b2fe4151d2f761b6c27bd7f7db7ac/tenor.gif'];
    var sing = Math.floor(Math.random() * sings.length);

    const saysing = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(saysing).setImage(sings[sing]).setColor('RANDOM'));
  }


  if(command === 'shrug') {

    var shrugs = ['https://media.tenor.com/images/bc00453086dad3bae19108404e7aebdd/tenor.gif','https://media.tenor.com/images/6def41cfbfc28b3be8c20be9d6ef2dde/tenor.gif','https://media.tenor.com/images/0dfa9456551647a03326a40c0938110f/tenor.gif','https://media.tenor.com/images/f9269d307f3c5e4ff0d37c3dfdaebb56/tenor.gif'];
    var shrug = Math.floor(Math.random() * shrugs.length);

    const sayshrug = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(sayshrug).setImage(shrugs[shrug]).setColor('RANDOM'));
  }

  if(command === 'kiss') {

    var kisses = ['https://media.tenor.com/images/924c9665eeb727e21a6e6a401e60183b/tenor.gif','https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif?itemid=6155670','https://media.tenor.com/images/68d59bb29d7d8f7895ce385869989852/tenor.gif','https://media.tenor.com/images/02b3ad0fb1d6aa77daeee0ace21d5774/tenor.gif','https://media.tenor.com/images/a75800a31f350c6a29ef2343931492b2/tenor.gif'];
    var kiss = Math.floor(Math.random() * kisses.length);

    const saykiss = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(saykiss).setImage(kisses[kiss]).setColor('RANDOM'));
  }

  if(command === 'slap') {

    var slaps = ['https://i.imgur.com/fm49srQ.gif','https://i.imgur.com/fm49srQ.gif','https://i.imgur.com/fm49srQ.gif','https://i.imgur.com/Agwwaj6.gif','https://i.imgur.com/YA7g7h7.gif','https://i.imgur.com/oRsaSyU.gif'];
    var slap = Math.floor(Math.random() * slaps.length);

    const sayslap = args.join(" ");
message.channel.send(new Discord.MessageEmbed().setDescription(sayslap).setImage(slaps[slap]).setColor('RANDOM'));
  }

//.................................................Fun.......................................................................................................................................................................



if(command === "fban") {

  if(message.mentions.users.size){
  var member = message.mentions.members.first();

if(member){
    const embfban=new Discord.MessageEmbed().setTitle(':no_entry: User Banned').setColor(0x5CD800).addField('Username',member.user.tag).setTimestamp(Date.now()).setFooter(`Moderator: ${message.author.username}`).addField("User ID",member.user.id);
    message.channel.send(embfban)
}
else{
    message.channel.send(new Discord.MessageEmbed().setDescription("Cannot find user with that name.").setColor(0xff1100))
}
}else{
    const embifban=new Discord.MessageEmbed().setTitle("Mention a valid user c:").setColor(0xff1100)
    message.channel.send(embifban)
}
  
}


if (command === 'reverse'){
  let strng = args.join(' ');
  let reverse = strng.split("").reverse().join("");

  message.channel.send(reverse)
}


  if(command === 'haram') {

    var harams = ['https://i.kym-cdn.com/photos/images/newsfeed/001/126/069/c48.jpg','https://img-comment-fun.9cache.com/media/aX9Worv/aGj54ejX_700w_0.jpg',"https://miro.medium.com/max/625/0*6DA6zvlLGOD8W8N3.jpg"];
    var haram = Math.floor(Math.random() * harams.length);

message.channel.send(new Discord.MessageEmbed().setImage(harams[haram]).setColor('RANDOM'));
  }




  if(command === 'penis') {
    var member = message.mentions.members.first();

    var pps = ['8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8===========D','8=============D','8================D','Wow! This penis is bigger than your screen'];
    var pp = Math.floor(Math.random() * pps.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('penis size').addField(`${message.author.username}'s penis size`,pps[pp]).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('penis size').addField(`${member.displayName}'s penis size`,pps[pp]).setColor('RANDOM'))
  }
  }



  if(command === 'pp') {
    var member = message.mentions.members.first();

    var pps = ['8D','8=D','8==D','8===D','8====D','8=====D','8======D','8=======D','8========D','8=========D','8==========D','8===========D','8===========D','8=============D','8================D','Wow! This penis is bigger than your screen'];
    var pp = Math.floor(Math.random() * pps.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('penis size').addField(`${message.author.username}'s penis size`,pps[pp]).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('penis size').addField(`${member.displayName}'s penis size`,pps[pp]).setColor('RANDOM'))
  }
  }

  if(command === 'howgay') {
    var member = message.mentions.members.first();

    var gays = ['0','5','9','13','15','2','21','23','26','33','42','40','38','48','50','52','56','59','63','69','71','75','79','83','80','85','88','94','99,9999','100'];
    var gay = Math.floor(Math.random() * gays.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Gay Rate Machine').setDescription(`You are ${gays[gay]}% gay :rainbow_flag:`).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Gay Rate Machine').setDescription(`${member.displayName} is ${gays[gay]}% gay :rainbow_flag:`).setColor('RANDOM'))
  }
  }

  if(command === 'howsimp') {
    var member = message.mentions.members.first();

    var simps = ['0','5','9','13','15','2','21','23','26','33','42','40','38','48','50','52','56','59','63','69','71','75','79','83','80','85','88','94','99,9999','100'];
    var simp = Math.floor(Math.random() * simps.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Simp Rate Machine').setDescription(`You are ${simps[simp]}% simp :bouquet: `).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Simp Rate Machine').setDescription(`${member.displayName} is ${simps[simp]}% simp :bouquet: `).setColor('RANDOM'))
  }
  }

  if(command === 'howthicc') {
    var member = message.mentions.members.first();

    var thiccs = ['0','5','9','13','15','2','21','23','26','33','42','40','38','48','50','52','56','59','63','69','71','75','79','83','80','85','88','94','99,9999','100'];
    var thicc = Math.floor(Math.random() * thiccs.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Thicc Rate Machine').setDescription(`You are ${thiccs[thicc]}% thicc :person_frowning: `).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Thicc Rate Machine').setDescription(`${member.displayName} is ${thiccs[thicc]}% thicc :person_frowning:`).setColor('RANDOM'))
  }
  }


  if(command === 'covidtest') {
    var member = message.mentions.members.first();

    var covids = ['Positive','Negative'];
    var covid = Math.floor(Math.random() * covids.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}'s Covid Test`).setDescription(`I did some covid test on you`).setThumbnail('https://advancetitan.com/wp-content/uploads/2020/05/CoronavirusSARS-CoV-2_without_background-896x900.png').addField('**__Result__**',covids[covid]).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle(`${member.displayName}'s Covid Test`).setDescription(`I did some covid test on you`).setThumbnail('https://advancetitan.com/wp-content/uploads/2020/05/CoronavirusSARS-CoV-2_without_background-896x900.png').addField('**__Result__**',covids[covid]).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`))
  }
  }    


  if(command === 'coronatest') {
    var member = message.mentions.members.first();

    var covids = ['Positive','Negative'];
    var covid = Math.floor(Math.random() * covids.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username}'s Covid Test`).setDescription(`I did some covid test on you`).setThumbnail('https://advancetitan.com/wp-content/uploads/2020/05/CoronavirusSARS-CoV-2_without_background-896x900.png').addField('**__Result__**',covids[covid]).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle(`${member.displayName}'s Covid Test`).setDescription(`I did some covid test on you`).setThumbnail('https://advancetitan.com/wp-content/uploads/2020/05/CoronavirusSARS-CoV-2_without_background-896x900.png').addField('**__Result__**',covids[covid]).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`))
  }
  }    


  if(command === 'coinflip') {
    var coins = ['Heads','Tails'];
    var coin = Math.floor(Math.random() * coins.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username} Flipped a Coin`).addField(`**__Result__**`,coins[coin]).setThumbnail('https://st2.depositphotos.com/1734074/5187/v/950/depositphotos_51875125-stock-illustration-gold-coin-flat-icon.jpg').setColor('RANDOM'))
  }
  }



  if(command === 'howstupid') {
    var member = message.mentions.members.first();

    var stupids = ['0','5','9','13','15','2','21','23','26','33','42','40','38','48','50','52','56','59','63','69','71','75','79','83','80','85','88','94','99,9999','100'];
    var stupid = Math.floor(Math.random() * stupids.length);

    if (!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Stupid Rate Machine').setDescription(`You are ${stupids[stupid]}% stupid :man_shrugging: `).setColor('RANDOM'))
  }
  if(member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Stupid Rate Machine').setDescription(`${member.displayName} is ${stupids[stupid]}% stupid :man_shrugging:`).setColor('RANDOM'))
  }
  }


  
  if(command === 'deathclock') {
    var member = message.mentions.members.first();

    var dies = ['5 Seconds','1 Hour','30 Minutes','4 Hours','14 Years','9 Hours','1 Day','2 Days','5 Years','1 Week','3 Weeks','1 Month','8 Months','6 Years','12 Years','9 Years','21 Years','29 Years','32 Years','37 Years','40 Years','30 Years','45 Years','49 Years','53 Years','57 Years','68 Years','60 Years','61 Years','71 Years','78 Years'];
    var die = Math.floor(Math.random() * dies.length);

    if (member){
      return;
      }
  if(!member){
    message.channel.send(new Discord.MessageEmbed().setTitle('Death Clock').setThumbnail('https://o.remove.bg/downloads/a4128424-e42d-45b9-a115-9c00819dbf56/t-shirt-sticker-headstone-rest-in-peace-zazzle-tomb-cliparts-silhouette-thumbnail-removebg-preview.png').setDescription(`You will die in **${dies[die]}** :skull:`).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`))
  }
  }


  if(command === "8ball") {
    var balls = ['No','Yes','Absolutely','I dunno','Nope','i don\'t wanna answer that dumb question'];
    var answ = Math.floor(Math.random() * balls.length);

    const ball = args.join(" ");
    message.channel.send(new Discord.MessageEmbed().setTitle('8Ball').addField('Question',ball).addField('8ball',balls[answ]).setColor('RANDOM'));
  }  

// if(command === 'etch'){
//   const etchembed = new Discord.MessageEmbed()
//     .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
//     .setTitle('🎨 Etch-A-Sketch 🎨')
//     .setColor("#f66868")
//     .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
//     .attachFiles(`etch.png`)
//     .setImage(`attachment://etch.png`)
//     .setTimestamp();
//     message.channel.send(etchembed)
// }

//.................................................Utility.......................................................................................................................................................................


if(command === 'serverinfo'){
  const date = message.guild.createdAt;
  const newDate = date.toLocaleDateString();
  const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;
    const regions = {
      brazil: 'Brazil',
      europe: 'Europe',
      hongkong: 'Hong Kong',
      india: 'India',
      japan: 'Japan',
      russia: 'Russia',
      singapore: 'Singapore',
      southafrica: 'South Africa',
      sydeny: 'Sydeny',
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-west': 'US West',
      'us-south': 'US South'
    };

message.channel.send(new Discord.MessageEmbed()
.setTitle('Server Informations')
  .addField("Name", message.guild.name)
  .addField("ID", message.guild.id)
  .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
  .addField('Region',`${regions[message.guild.region]}`)
  .addField("Creation Date", `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
  .addField("Total Members",message.guild.memberCount)
  .addField("Channels", channels.size)
  .addField("Emoji Count", ` ${emojis.size} emojis`)
  .addField("Roles Count", ` ${roles.length} roles`)
  .setThumbnail(message.guild.iconURL())
  .setColor('RANDOM')
)
}



if (command === 'avatar') {
    
        
  if(message.mentions.users.size){
      let member=message.mentions.users.first()
  if(member){
      const emb=new Discord.MessageEmbed().setThumbnail(member.displayAvatarURL()).setImage(member.displayAvatarURL()).setTitle(`${member.username}'s Avatar`).addField("Avatar URL",member.displayAvatarURL()).setColor('RANDOM').setTimestamp(Date.now())
      message.channel.send(emb)
  }
  else{
      message.channel.send(new Discord.MessageEmbed().setTitle('cannot find anyone with that username'))
  }
  }else{
      const emb=new Discord.MessageEmbed().setThumbnail(message.author.displayAvatarURL()).setImage(message.author.displayAvatarURL()).setColor('RANDOM').setTitle(`${message.author.username}'s Avatar`).addField("Avatar URL",message.author.displayAvatarURL()).setTimestamp(Date.now())
      message.channel.send(emb)
  }
}


if (command === 'av') {
  
      
if(message.mentions.users.size){
    let member=message.mentions.users.first()
if(member){
    const emb=new Discord.MessageEmbed().setThumbnail(member.displayAvatarURL()).setImage(member.displayAvatarURL()).setTitle(`${member.username}'s Avatar`).addField("Avatar URL",member.displayAvatarURL()).setColor('RANDOM').setTimestamp(Date.now())
    message.channel.send(emb)
}
else{
    message.channel.send(new Discord.MessageEmbed().setTitle('cannot find anyone with that username'))
}
}else{
    const emb=new Discord.MessageEmbed().setThumbnail(message.author.displayAvatarURL()).setImage(message.author.displayAvatarURL()).setColor('RANDOM').setTitle(`${message.author.username}'s Avatar`).addField("Avatar URL",message.author.displayAvatarURL()).setTimestamp(Date.now())
    message.channel.send(emb)
}
}




if(command === "ping") {
  const m = await message.channel.send(new Discord.MessageEmbed().setDescription('pinging...').setColor('RANDOM'));
  m.edit(new Discord.MessageEmbed().setTitle('Pong! :ping_pong:').addField(`Latency is `,`${m.createdTimestamp - message.createdTimestamp}ms.`).addField(`API Latency is `,`${Math.round(client.ws.ping)}ms`).setColor('RANDOM') );
}





if(command === 'sinfo'){
  const date = message.guild.createdAt;
  const newDate = date.toLocaleDateString();
  const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;
    const regions = {
      brazil: 'Brazil',
      europe: 'Europe',
      hongkong: 'Hong Kong',
      india: 'India',
      japan: 'Japan',
      russia: 'Russia',
      singapore: 'Singapore',
      southafrica: 'South Africa',
      sydeny: 'Sydeny',
      'us-central': 'US Central',
      'us-east': 'US East',
      'us-west': 'US West',
      'us-south': 'US South'
    };

message.channel.send(new Discord.MessageEmbed()
.setTitle('Server Informations')
  .addField("Name", message.guild.name)
  .addField("ID", message.guild.id)
  .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
  .addField('Region',`${regions[message.guild.region]}`)
  .addField("Creation Date", `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
  .addField("Total Members",message.guild.memberCount)
  .addField("Channels", channels.size)
  .addField("Emoji Count", ` ${emojis.size} emojis`)
  .addField("Roles Count", ` ${roles.length} roles`)
  .setThumbnail(message.guild.iconURL())
  .setColor('RANDOM')
)
}






if(command === 'sicon'){
  message.channel.send(new Discord.MessageEmbed().setTitle('Server Icon').setImage(message.guild.iconURL()).addField('Icon URL',message.guild.iconURL()).setColor('RANDOM').setThumbnail(message.author.displayAvatarURL()))
}

if(command === 'servericon'){
  message.channel.send(new Discord.MessageEmbed().setTitle('Server Icon').setImage(message.guild.iconURL()).addField('Icon URL',message.guild.iconURL()).setColor('RANDOM').setThumbnail(message.author.displayAvatarURL()))
}


if(command === "say") {
  const ath = message.member.hasPermission('MANAGE_MESSAGES');

  if(!ath){
    message.channel.send(new Discord.MessageEmbed().setColor(0xff0000).setTitle('Only people with MANAGE MESSAGES Permission can use this command'))
  }
  if(ath){
  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{}); 
  message.channel.send(sayMessage);
}
}

  if(command === 'uinfo'){
    var menmember = message.mentions.members.first();
    if(menmember){
      const joinDiscord = moment(menmember.createdAt).format('llll');
      const joinServer = moment(menmember.joinedAt).format('llll');

      message.channel.send(new Discord.MessageEmbed()
      .setTitle('User Informations')
      .setThumbnail(menmember.user.displayAvatarURL())
      .addField('Username',menmember.user.tag)
      .addField('User ID',menmember.id)
      .addField('Joined at',`${moment.utc(menmember.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField('Account Created At', `${moment.utc(menmember.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField("Game", `${menmember.presence.game ? menmember.presence.game.name : 'None'}`)
      .addField('Status', menmember.presence.status)
      .setColor('RANDOM'))
    }
    if(!menmember){
      const joinDiscord = moment(message.author.createdAt).format('llll');
      const joinServer = moment(message.author.joinedAt).format('llll');

      message.channel.send(new Discord.MessageEmbed()
      .setTitle('User Informations')
      .addField('Username',message.author.tag)
      .addField('User ID',message.author.id)
      .addField('Joined at:', `${moment.utc(message.author.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField('Account Created At:', `${moment.utc(message.author.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField("Game:", `${message.author.presence.game ? message.author.presence.game.name : 'None'}`)
      .addField('Status:', message.author.presence.status)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor('RANDOM'))
    }
  }


  if(command === 'userinfo'){
    var member = message.mentions.members.first();
    if(member){
      const joinDiscord = moment(member.createdAt).format('llll');
      const joinServer = moment(member.joinedAt).format('llll');

      message.channel.send(new Discord.MessageEmbed()
      .setTitle('User Informations')
      .setThumbnail(member.user.displayAvatarURL())
      .addField('Username',member.user.tag)
      .addField('User ID',member.id)
      .addField('Joined at',`${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField('Account Created At', `${moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField("Game", `${member.presence.game ? member.presence.game.name : 'None'}`)
      .addField('Status', member.presence.status)
      .setColor('RANDOM'))
    }
    if(!member){
      const joinDiscord = moment(message.author.createdAt).format('llll');
      const joinServer = moment(message.author.joinedAt).format('llll');

      message.channel.send(new Discord.MessageEmbed()
      .setTitle('User Informations')
      .addField('Username',message.author.tag)
      .addField('User ID',message.author.id)
      .addField('Joined at:', `${moment.utc(message.author.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField('Account Created At:', `${moment.utc(message.author.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
      .addField("Game:", `${message.author.presence.game ? message.author.presence.game.name : 'None'}`)
      .addField('Status:', message.author.presence.status)
      .setThumbnail(message.author.displayAvatarURL())
      .setColor('RANDOM'))
    }
  }


  if(command === "sayembed") {
    const ath = message.member.hasPermission('MANAGE_MESSAGES');

    if(!ath){
      message.channel.send(new Discord.MessageEmbed().setColor(0xff0000).setTitle('Only people with MANAGE MESSAGES Permission can use this command'))
    }
    if(ath){
    const sayemb = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(new Discord.MessageEmbed().setDescription(sayemb).setColor('RANDOM').setFooter(`Author: ${message.author.tag}`));
  }
  }


  // let score;
  // if (message.guild) {
  //     score = client.getScore.get(message.author.id, message.guild.id);
  //     if (!score) {
  //         score = {
  //             id: `${message.guild.id}-${message.author.id}`,
  //             user: message.author.id,
  //             guild: message.guild.id,
  //             points: 0,
  //             level: 1,
  //         };
  //     }
  //     const xpAdd = Math.floor(Math.random() * 10) + 50;
  //     const curxp = score.points;
  //     const curlvl = score.level;
  //     const levels = [0, 5000, 15000, 30000, 50000, 75000];
  //     nextLevel = 5000 * Math.round( score.level * (score.level + 1) / 2 );      if (nxtLvl <= score.points) {
  //         score.level = curlvl + 1;
  //         const lvlup = new MessageEmbed()
  //             .setAuthor(
  //                 `Congrats ${message.author.username}`,
  //                 message.author.displayAvatarURL()
  //             )
  //             .setTitle('You have leveled up!')
  //             .setThumbnail('https://i.imgur.com/lXeBiMs.png')
  //             .setColor(color)
  //             .addField('New Level', curlvl + 1);
  //         message.channel.send(lvlup)
              
            
  //       }
  //     client.setScore.run(score);
  //     }



//.................................................Animals.......................................................................................................................................................................
  if(command === 'cat') {

    var cats = ['https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg','https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730__340.jpg','https://cdn.pixabay.com/photo/2014/11/30/14/11/kitty-551554__340.jpg','https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg','https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662__340.jpg','https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg','https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404__340.jpg','https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404__340.jpg','https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720__340.jpg','https://cdn.pixabay.com/photo/2014/03/29/09/17/cat-300572__340.jpg','https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775__340.jpg','https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__340.jpg','https://cdn.pixabay.com/photo/2020/07/09/17/39/puppy-5388151__340.jpg','https://cdn.pixabay.com/photo/2018/11/29/23/34/cat-3846780__340.jpg','https://cdn.pixabay.com/photo/2018/07/13/10/20/cat-3535404__340.jpg','https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__340.jpg','https://cdn.pixabay.com/photo/2017/02/15/12/12/cat-2068462__340.jpg','https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089__340.jpg'];
    var cat = Math.floor(Math.random() * cats.length);

message.channel.send(new Discord.MessageEmbed().setImage(cats[cat]).setColor('RANDOM'));
  }


  if(command === 'dog') {

    var dogs = ['https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074__340.jpg','https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg','https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566__340.jpg','https://cdn.pixabay.com/photo/2019/08/19/07/45/dog-4415649__340.jpg','https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186__340.jpg','https://cdn.pixabay.com/photo/2014/08/21/14/51/pet-423398__340.jpg','https://cdn.pixabay.com/photo/2016/10/31/14/55/rottweiler-1785760__340.jpg','https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg','https://cdn.pixabay.com/photo/2016/01/05/17/51/dog-1123016__340.jpg','https://cdn.pixabay.com/photo/2020/06/30/22/34/dog-5357794__340.jpg','https://cdn.pixabay.com/photo/2018/01/09/11/04/dog-3071334__340.jpg','https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816__340.jpg','https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733__340.jpg','https://cdn.pixabay.com/photo/2017/09/25/13/14/dog-2785077__340.jpg','https://cdn.pixabay.com/photo/2018/03/18/18/06/australian-shepherd-3237735__340.jpg','https://cdn.pixabay.com/photo/2019/11/18/00/38/dog-4633734__340.jpg','https://cdn.pixabay.com/photo/2017/09/25/13/11/dog-2785066__340.jpg'];
    var dog = Math.floor(Math.random() * dogs.length);

message.channel.send(new Discord.MessageEmbed().setImage(dogs[dog]).setColor('RANDOM'));
  }

  if(command === 'panda'){
    var pandas = ['http://www.cutestpaw.com/wp-content/uploads/2016/01/s-Exhausted-panda-bear..jpg','http://www.cutestpaw.com/wp-content/uploads/2016/02/s-Shy-panda..jpg','http://www.cutestpaw.com/wp-content/uploads/2016/02/s-Panda-puff..jpghttp://www.cutestpaw.com/wp-content/uploads/2016/02/s-Panda-pal..jpg','http://www.cutestpaw.com/wp-content/uploads/2016/01/s-Hi-you-wanna-play.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/11/s-May-I-have-a-lick.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/11/s-The-panda-nursery..jpeg','http://www.cutestpaw.com/wp-content/uploads/2015/12/s-Look-at-those-precious-little-paws.png','http://www.cutestpaw.com/wp-content/uploads/2015/11/s-Panda-pal..jpg','http://www.cutestpaw.com/wp-content/uploads/2015/10/s-These-Newborn-Pandas-Snuggling-In-a-Crib.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/10/s-Cute-baby-pand.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/09/s-Panda-bady.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/07/s-Panda-peek-a-boo..jpeg','http://www.cutestpaw.com/wp-content/uploads/2015/07/s-Playful-pandas..jpeg','http://www.cutestpaw.com/wp-content/uploads/2015/07/s-6-panda.jpg','http://www.cutestpaw.com/wp-content/uploads/2015/07/s-nursery-chengdu-research-basen-breeding.jpg'];
    var panda = Math.floor(Math.random() * pandas.length);

message.channel.send(new Discord.MessageEmbed().setImage(pandas[panda]).setColor('RANDOM'));
  }

  if(command === 'babyanimal'){
    var babies = ['https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-2.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-12.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-33.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-30.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-31.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-7.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-20.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-13.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-23.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-4.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-35.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-36.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-1.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-32.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-38.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-34.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-17.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-8.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-9.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-10.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-39.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-15.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-18.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-27.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-26.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-19.jpg'];
    var baby = Math.floor(Math.random() * babies.length);

    message.channel.send(new Discord.MessageEmbed().setImage(babies[baby]).setColor('RANDOM'));
  }

  if(command === 'babyanimals'){
    var babies = ['https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-2.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-12.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-33.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-30.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-31.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-7.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-20.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-13.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-23.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-4.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-35.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-36.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-1.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-32.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-38.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-34.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-17.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-8.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-9.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-10.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-39.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-15.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-18.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-27.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-26.jpg','https://static.boredpanda.com/blog/wp-content/uuuploads/cute-baby-animals/cute-baby-animals-19.jpg'];
    var baby = Math.floor(Math.random() * babies.length);

    message.channel.send(new Discord.MessageEmbed().setImage(babies[baby]).setColor('RANDOM'));
  }

  if(command === 'kitty'){
        var kitties = ['https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-64-57b32778a2fe1__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-9-57b30aa5797eb__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-11-57b30aa95f3c6__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-10-57b30aa763583__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-31-57b30ad5ccbc8__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-69-57b32c431e8a7__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-67-57b32a998544a__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-63-57b326d0e181d__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-8-57b30aa345790__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-33-57b31e94e94e6__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-14-57b30aafd3a33__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-39-57b3248e11e11__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kitten-61-57b32666478e1__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-32-57b31b31b1ee7__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-44-57b31a310dc6f__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-38-57b323a453ca9__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-13-57b30aad52c17__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-37-57b3168e787ac__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-38-57b316f168922__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-52-57b31fd767bf3__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-49-57b31f2e5a384__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-46-57b323088a692__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-5-57b30a9d668f0__605.jpg'];
    var kitty = Math.floor(Math.random() * kitties.length);

    message.channel.send(new Discord.MessageEmbed().setImage(kitties[kitty]).setColor('RANDOM'));
  }

  if(command === 'kitten'){
    var kitties = ['https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-64-57b32778a2fe1__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-29-57b30ad229af3__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-30-57b30ad41bc90__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-9-57b30aa5797eb__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-11-57b30aa95f3c6__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-4-57b30a939dff5__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-10-57b30aa763583__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-31-57b30ad5ccbc8__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-69-57b32c431e8a7__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-67-57b32a998544a__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-63-57b326d0e181d__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-8-57b30aa345790__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-33-57b31e94e94e6__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-14-57b30aafd3a33__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-39-57b3248e11e11__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kitten-61-57b32666478e1__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-32-57b31b31b1ee7__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-44-57b31a310dc6f__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-38-57b323a453ca9__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-13-57b30aad52c17__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-37-57b3168e787ac__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-38-57b316f168922__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-52-57b31fd767bf3__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-49-57b31f2e5a384__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/Cute-kittens-46-57b323088a692__605.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2016/08/cute-kittens-5-57b30a9d668f0__605.jpg'];
var kitty = Math.floor(Math.random() * kitties.length);

message.channel.send(new Discord.MessageEmbed().setImage(kitties[kitty]).setColor('RANDOM'));
}

if(command === 'cosplay'){
  var coss = ['https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_01.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_02.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_03.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_05.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_06.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_10.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_11.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_14.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_15.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_16.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_20.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_21.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_22.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_23.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_28.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_30.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_34.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_35.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_37.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_40.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_42.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_46.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_50.jpg','https://izispicy.com/old-img/img11/20180331/640/best_cosplay_is_sexy_cosplay_640_high_53.jpg'];
var cos = Math.floor(Math.random() * coss.length);

message.channel.send(new Discord.MessageEmbed().setImage(coss[cos]).setColor('RANDOM'));
}


  if (command === 'help' ) {
    message.channel.send(new Discord.MessageEmbed()
    .setTitle('Ririchiyo Command List')
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(' i\'m under construction, help us to get better :smiley:')
    .addField(":tools: Moderation", "``ban`` , ``kick`` , ``purge``")
    .addField(":smiley: Emotes","``cry``, ``slap`` , ``shrug`` , ``kiss``, ``hug`` , ``sing`` , ``dance`` ")
    .addField(':wrench: Utility','``ping`` , ``say`` , ``SayEmbed`` , ``avatar`` , ``servericon``, ``userinfo`` , ``serverinfo``')
    .addField(':joy: Fun','``penis`` , ``haram`` , ``fban`` , ``howsimp`` , ``howgay`` , ``howthicc`` , ``howstupid``, ``deathclock`` , ``covidtest`` , ``reverse`` , ``coinflip`` , ``cosplay``')
    .addField(':dog: Animals','``cat`` , ``dog`` , ``panda`` , ``babyanimals`` , ``kitty``')
    .setColor(' RANDOM')
    .setFooter("Type $invite to invite Ririchiyo to your server."))
  }

  if(command === 'invite') {
    message.channel.send(' https://discord.com/oauth2/authorize?client_id=714149186987229184&scope=bot&permissions=939846662')
  }



});

client.on('error', err => {
  console.log(err);
})

client.login(process.env.TOKEN);

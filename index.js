const data = require("./data.json");
const config = require("./config.json");
const fs = require('fs')
var moment = require('moment');

const {
    Client,
    Intents,
    MessageEmbed
} = require('discord.js');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.login(config.botToken);

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});
let Data = data




let listWin = ["You passed the chemistry quiz with flying colors! You get a star!",
    "Your english quiz came back with a perfect score! Here's a star!",
    "Your late night studying resulted in a perfect score on the algebra quiz! Congrats!",
    "You got a star for passing the science quiz!",
    "Congrats fren! You got a perfect score on the english quiz!"
]
let listLose = ["You studied for the chemistry quiz and failed. Try a retake!",
    "Your science quiz results are back. It's not looking great...",
    "Ouch, you failed the math quiz. Do a retake!",
    "You studied all night for the social studies quiz, but didn't pass.",
    "Oh no! You got a failing grade on the final paper.",
    "You take the geology quiz, but didn't pass. Try again later.",
    "Whoops! You got a failing grade on the science paper.",
    "Bad news! Your biology quiz isn't looking too great...",
    "Try again! You didn't pass the math quiz."
]

let winPrecentOfK = 25;
client.on('messageCreate', message => {
    try {
        let d = new Date()
        let role = message.guild.roles.cache.get(`${config.roleID}`);
        if (message.content.startsWith(config.command)) {
            let userTime = Data.id[message.author.id];
            if (userTime == undefined) {
                // new user
                let percent = Math.floor(Math.random() * 10000);
                if (percent <= winPrecentOfK) {
                    let chosen = listWin[Math.floor(Math.random() * listWin.length)]
                    const embed = new MessageEmbed()
                        .setColor('#00FF00')
                        .setTitle('Boarding success!')
                        .setDescription(chosen + ` - <@${message.author.id}>`)
                        .setFooter({
                            text: "The role has been assigned."
                        });
                    Data.id[message.author.id] = (moment(d.getTime()).unix())
                    Data.result[message.author.id] = chosen
                    message.channel.send({
                        embeds: [embed]
                    });
                    message.member.roles.add(role);
                }
                if (percent > winPrecentOfK) {
                    let chosen = listLose[Math.floor(Math.random() * listLose.length)]
                    const embed = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Boarding failure')
                        .setDescription(chosen + ` - <@${message.author.id}>`)
                        .setFooter({
                            text: "Try again after 24h."
                        });
                    Data.id[message.author.id] = (moment(d.getTime()).unix())
                    Data.result[message.author.id] = chosen
                    message.channel.send({
                        embeds: [embed]
                    });
                }

            } else {
                // old user
                if (userTime + (6 * 60 * 60) < (moment(d.getTime()).unix()) && listLose.includes(Data.result[message.author.id])) {
                    let percent = Math.floor(Math.random() * 10000);
                    if (percent <= winPrecentOfK) {
                        let chosen = listWin[Math.floor(Math.random() * listWin.length)]
                        const exampleEmbed = new MessageEmbed()
                            .setColor('#00FF00')
                            .setTitle('Boarding success!')
                            .setDescription(chosen + ` - <@${message.author.id}>`)
                            .setFooter({
                                text: "The role has been assigned."
                            });
                        Data.id[message.author.id] = (moment(d.getTime()).unix())
                        Data.result[message.author.id] = chosen
                        message.channel.send({
                            embeds: [exampleEmbed]
                        });
                        message.member.roles.add(role);
                    }
                    if (percent > winPrecentOfK) {
                        let chosen = listLose[Math.floor(Math.random() * listLose.length)]
                        const exampleEmbed = new MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Boarding failure')
                            .setDescription(chosen + ` - <@${message.author.id}>`)
                            .setFooter({
                                text: "Try again after 6h."
                            });
                        data.id[message.author.id] = (moment(d.getTime()).unix())
                        Data.result[message.author.id] = chosen
                        message.channel.send({
                            embeds: [exampleEmbed]
                        });

                    }

                } else {
                    /*   if (Data.result[message.author.id] >= (list.length - 3)) {

                           const exampleEmbed = new MessageEmbed()
                               .setColor('#00FF00')
                               .setTitle('Boarding success!')
                               .setDescription(list[Data.result[message.author.id]] + ` - <@${message.author.id}>`)
                               .setFooter({
                                   text: "The role has been assigned."
                               });

                           message.channel.send({
                               embeds: [exampleEmbed]
                           });

                       }
                       if (Data.result[message.author.id] < (list.length - 3)) {
                           const exampleEmbed = new MessageEmbed()
                               .setColor('#FF0000')
                               .setTitle('Boarding failure')
                               .setDescription(list[Data.result[message.author.id]] + ` - <@${message.author.id}>`)
                               .setFooter({
                                   text: "Try again later." + ` -- ${moment.duration(Data.id[message.author.id] - (moment(d.getTime()).unix()) ,'seconds').humanize()} left`
                               });

                           message.channel.send({
                               embeds: [exampleEmbed]
                           });

                       }*/

                }
            }
            fs.writeFile('data.json', JSON.stringify(Data), function (err) {
                if (err) throw err;

            });
        }
    } catch (error) {
        console.log(error)
    }

})
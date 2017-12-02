
const schedule = require('node-schedule');
const dashButton = require('node-dash-button');
const slashTalk = require ('../../modules/slashTalk');
module.exports = {

    start: function (bot) {

        bot.on('message', (message) => {
            if (typeof message.entities !== 'undefined') {
                if (message.entities[0].type === 'mention') {
                    bot.sendMessage(message.chat.id, slashTalk.genericResponse());
                }
            }
        });

        bot.onText(/\/start/, (message) => {
            bot.sendMessage(message.chat.id, 'slash', {
            'reply_markup': {
                'keyboard': [['/slash']]
                }
            });
        });

        bot.onText(/\/slash/, (message) => {
            bot.sendMessage(message.chat.id, slashTalk.genericResponse());
        });

    },

    scheduledHungry: function (bot, config) {
        schedule.scheduleJob('30 7,19 * * *', function () {
            bot.sendMessage(config.groupId, slashTalk.hungryMessage());
        });
    },

    scheduledThirsty: function (bot, config) {
        schedule.scheduleJob('30 15 * * *', function () {
            bot.sendMessage(config.groupId, slashTalk.thirstyMessage());
        });
    },

    listenDashButton: function (bot, config) {
        var dash = dash_button(config.dashButtonMAC, null, null, 'all');
        dash.on('detected', function (){
            bot.sendMessage(config.groupId, slashTalk.thanksMessage());
        });
    }

}



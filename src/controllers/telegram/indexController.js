
const schedule = require('node-schedule');
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

    scheduled: function (bot, config) {
        const j = schedule.scheduleJob('30 7,19 * * *', function () {
            bot.sendMessage(config.groupId, slashTalk.hungryMessage());
        });
    }

}



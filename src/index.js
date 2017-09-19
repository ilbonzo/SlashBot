const telegramBot = require('node-telegram-bot-api');
const util = require('util');

const config = require ('../config.json');
const slashTalk = require ('./modules/slashTalk');

const bot = new telegramBot(config.telegramToken, {polling: true});

bot.on('message', (message) => {
    bot.sendMessage(message.chat.id, slashTalk.genericResponse());
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


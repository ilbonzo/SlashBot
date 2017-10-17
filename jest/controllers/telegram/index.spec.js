const telegramController = require('../../../src/controllers/telegram/indexController.js');

test('get response of generic message in telegram', () => {
    const telegramBot = require('node-telegram-bot-api');

    const botMock = new telegramBot('xxxxxx', { polling: false });
    botMock.sendMessage = function (chatId, message) {
        expect(message).toContain('Bau');
    }

    telegramController.start(botMock);

    botMock.emit('message', {
                'text': 'Hi slash',
                'chat': {
                    'id': 10
                },
                'entities': [{'type': 'mention'}]
            });
});

test('get not send response of generic message in telegram', () => {
    const telegramBot = require('node-telegram-bot-api');

    const botMock = new telegramBot('xxxxxx', { polling: false });

    telegramController.start(botMock);

    botMock.emit('message', {
                'text': 'Hi slash',
                'chat': {
                    'id': 10
                }
            });
});


test('get response of command /start in telegram', () => {
    const telegramBot = require('node-telegram-bot-api');

    const botMock = new telegramBot('xxxxxx', { polling: false });
    botMock.sendMessage = function (chatId, message, arg) {
        expect(message).toEqual('slash');
        expect(arg).toEqual({
            'reply_markup': {
                'keyboard': [['/slash']]
                }
            });
    }

    telegramController.start(botMock);
    const message = {
        'text': '/start',
        'chat': {
            'id': 10
        },
        'entities': [
            { 'offset': 0, 'length': 6, 'type': 'bot_command' }
        ]
    };

    botMock.emit('message', message);
    botMock.processUpdate({ 'message': message });
});

test('get response of command /slash in telegram', () => {
    const telegramBot = require('node-telegram-bot-api');

    const botMock = new telegramBot('xxxxxx', { polling: false });
    botMock.sendMessage = function (chatId, message) {
        expect(message).toContain('Bau');
    }

    telegramController.start(botMock);

    const message = {
        'text': '/slash',
        'chat': {
            'id': 10
        },
        'entities': [
            { 'offset': 0, 'length': 6, 'type': 'bot_command' }
        ]
    };
    botMock.emit('message', message);
    botMock.processUpdate({ 'message': message });
});

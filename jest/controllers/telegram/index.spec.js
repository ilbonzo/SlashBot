const lolex = require('lolex');
const telegramController = require('../../../src/controllers/telegram/indexController.js');

describe('start tests', () => {
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

});

describe('tests scheduled', () => {
    beforeEach(() => {
        clock = lolex.install();
    });

    afterEach(() => {
        clock = clock.uninstall();
    });

    test('get feed the dog message', () => {
        const telegramBot = require('node-telegram-bot-api');
        const config = {
            "groupId": "xxxxx"
        };
        const timeout = 12 * 60 * 60 * 1000 + 150;

        const botMock = new telegramBot('xxxxxx', { polling: false });

        botMock.sendMessage = function (chatId, message) {
            expect(message).toEqual('I\'m hungry');
        }

        telegramController.scheduledHungry(botMock, config.groupId);

        clock.tick(timeout);
    });

    test('get quench thirst the dog message', () => {
        const telegramBot = require('node-telegram-bot-api');
        const config = {
            "groupId": "xxxxx"
        };
        const timeout = 24 * 60 * 60 * 1000 + 150;

        const botMock = new telegramBot('xxxxxx', { polling: false });

        botMock.sendMessage = function (chatId, message) {
            expect(message).toEqual('I\'m thirsty');
        }

        telegramController.scheduledThirsty(botMock, config.groupId);

        clock.tick(timeout);
    });

});

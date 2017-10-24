const slashTalk = require('../../src/modules/slashTalk');

test('get generic response', () => {
    expect(slashTalk.genericResponse()).toContain('Bau Bau');
});

test('get hungry message', () => {
    expect(slashTalk.hungryMessage()).toEqual('I\'m hungry');
});

test('get thirsty message', () => {
    expect(slashTalk.thirstyMessage()).toEqual('I\'m thirsty');
});
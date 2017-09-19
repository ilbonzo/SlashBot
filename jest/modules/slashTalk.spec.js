const slashTalk = require('../../src/modules/slashTalk');

test('get generic response', () => {
    expect(slashTalk.genericResponse()).toContain('Bau Bau');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import { HtmlRenderer } from '../src/HtmlRenderer.ts';

test('HtmlRenderer renders a sample panel without throwing', async () => {
    const sample = `)ATTR
@ TYPE(TEXT) COLOR(RED)
+ INTENS(HI)
)BODY
%Hello world _NAME
)PROC
IF (&NAME = 'X')
`;

    const renderer = new HtmlRenderer(sample);
    const out = renderer.render();
    assert.ok(typeof out === 'string');
    assert.ok(out.length > 0);
});

test('readSourceFile throws for non-existent path and returns file contents for existing', () => {
    const tmp = './test-tmp.txt';
    try {
        fs.rmSync(tmp, { force: true });
    } catch {}

    assert.throws(() => HtmlRenderer.readSourceFile('./no-such-file.txt'));

    fs.writeFileSync(tmp, 'hello');
    const content = HtmlRenderer.readSourceFile(tmp);
    assert.equal(content, 'hello');
    fs.rmSync(tmp, { force: true });
});

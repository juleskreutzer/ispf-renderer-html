import test from 'node:test';
import assert from 'node:assert/strict';
import { TextRenderer } from '../../src/renderers/text.renderer.ts';
import { ElementType } from 'ispf-core';

test('TextRenderer renders span for text elements', () => {
    const element = { type: ElementType.TEXT, value: 'hello', length: 5 };
    const renderer = new TextRenderer(element as any);
    const out = renderer.render();
    assert.equal(out, '<span>hello</span>');
});

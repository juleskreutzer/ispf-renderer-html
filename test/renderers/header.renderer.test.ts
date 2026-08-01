import test from 'node:test';
import assert from 'node:assert/strict';
import { HeaderRenderer } from '../../src/renderers/header.renderer.ts';
import { ElementType } from 'ispf-core';

test('HeaderRenderer renders h1 for header elements', () => {
    const element = { type: ElementType.HEADER, value: 'Title' };
    const renderer = new HeaderRenderer(element as any);
    const out = renderer.render();
    assert.equal(out, '<h1>Title</h1>');
});

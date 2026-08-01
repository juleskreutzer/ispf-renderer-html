import test from 'node:test';
import assert from 'node:assert/strict';
import { InputRenderer } from '../../src/renderers/input.renderer.ts';
import { ElementType } from 'ispf-core';

test('InputRenderer renders an input element with correct attributes', () => {
    const element = { type: ElementType.INPUT, id: 'fld1', length: 10, value: 'abc' };
    const renderer = new InputRenderer(element as any);
    const out = renderer.render();
    assert.ok(out.includes('input'));
    assert.ok(out.includes('maxLength="10"'));
    assert.ok(out.includes('id="fld1"'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { SelectRenderer } from '../../src/renderers/select.renderer.ts';
import { ElementType } from 'ispf-core';

test('SelectRenderer renders a select element with basic attributes', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['option1', 'option2', 'option3']
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.includes('select'), 'Should include select tag');
    assert.ok(out.includes('class="ispf-select"'), 'Should have ispf-select class');
    assert.ok(out.includes('name="sel1"'), 'Should have name attribute');
    assert.ok(out.includes('id="sel1-select"'), 'Should have id attribute');
});

test('SelectRenderer renders all options from values array', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['opt1', 'opt2', 'opt3']
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.includes('<option value="opt1" >opt1</option>'), 'Should include opt1');
    assert.ok(out.includes('<option value="opt2" >opt2</option>'), 'Should include opt2');
    assert.ok(out.includes('<option value="opt3" >opt3</option>'), 'Should include opt3');
});

test('SelectRenderer renders empty select when values array is empty', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: []
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.includes('<select'), 'Should include select tag');
    assert.ok(out.includes('</select>'), 'Should close select tag');
    assert.ok(!out.includes('<option'), 'Should not include option tags');
});

test('SelectRenderer marks selected option when resolveVariables matches value', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['red', 'blue', 'green']
    };
    const resolveVariables = { sel1: 'blue' };
    const renderer = new SelectRenderer(element as any, new Map(), resolveVariables);
    const out = renderer.render();
    
    assert.ok(out.includes('<option value="red" >red</option>'), 'Should include red without selected');
    assert.ok(out.includes('<option value="blue" selected>blue</option>'), 'Should mark blue as selected');
    assert.ok(out.includes('<option value="green" >green</option>'), 'Should include green without selected');
});

test('SelectRenderer does not mark selected when resolveVariables is undefined', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['option1', 'option2']
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.includes('<option value="option1" >option1</option>'), 'Should not have selected attribute');
    assert.ok(out.includes('<option value="option2" >option2</option>'), 'Should not have selected attribute');
});

test('SelectRenderer does not mark selected when variable value does not match', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['apple', 'banana', 'cherry']
    };
    const resolveVariables = { sel1: 'orange' };
    const renderer = new SelectRenderer(element as any, new Map(), resolveVariables);
    const out = renderer.render();
    
    assert.ok(out.includes('<option value="apple" >apple</option>'));
    assert.ok(out.includes('<option value="banana" >banana</option>'));
    assert.ok(out.includes('<option value="cherry" >cherry</option>'));
    assert.ok(!out.includes('selected'), 'Should not mark any option as selected');
});

test('SelectRenderer handles special characters in option values', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'sel1', 
        required: false,
        values: ['<script>', '&quot;test&quot;', 'normal']
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.includes('<option value="<script>" ><script></option>'));
    assert.ok(out.includes('<option value="&quot;test&quot;" >&quot;test&quot;</option>'));
    assert.ok(out.includes('<option value="normal" >normal</option>'));
});

test('SelectRenderer throws error for invalid element type', () => {
    const element = { type: ElementType.TEXT };
    
    assert.throws(
        () => new SelectRenderer(element as any, new Map()),
        /Invalid element type/,
        'Should throw error for non-SELECTION element type'
    );
});

test('SelectRenderer renders correct structure with mixed option values', () => {
    const element = { 
        type: ElementType.SELECTION, 
        id: 'mySelect', 
        required: true,
        values: ['', 'One', 'Two', 'Three']
    };
    const renderer = new SelectRenderer(element as any, new Map());
    const out = renderer.render();
    
    assert.ok(out.startsWith('<select'), 'Should start with select tag');
    assert.ok(out.endsWith('</select>'), 'Should end with closing select tag');
    assert.ok(out.includes('name="mySelect"'));
    assert.ok(out.includes('id="mySelect-select"'));
    assert.ok(out.includes('<option value="" >'), 'Should include empty option');
    assert.ok(out.includes('<option value="One" >One</option>'));
});

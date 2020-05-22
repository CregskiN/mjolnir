

test('test common matcher', () => {
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5);
})

test('test to be true of false', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})

test('test number', () => {
    expect(4).toBeGreaterThan(3);
    expect(2).toBeLessThan(3);
})

test('test object', () => {
    // toBe表示完全相同
    // expect({name: 'CregskiN'}).toBe({name: 'CregskiN'});

    // toEqual 表示值相同
    expect({name: 'CregskiN'}).toEqual({name: 'CregskiN'});

})
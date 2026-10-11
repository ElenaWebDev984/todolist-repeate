import {expect, test} from "vitest";

export function sum(a, b) {
    return a + b
}

test('sum numbers', () => {
    const a = 10
    const b = 16
    expect(sum(a,b)).toBe(26)
})

test('two plus two is four', () => {
    expect(2 + 2).toBe(4)
})

test('sum negative numbers', () => {
    const a = -10
    const b = -20
    expect(sum(a,b)).toBe(-30)
})
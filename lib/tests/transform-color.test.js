"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_transform_target_1 = require("../src/color-transform-target");
test('transformOpacity', () => {
    expect(color_transform_target_1.transformColor("red", {
        opacity: "-0.5"
    }).opacity).toBe(0.5);
    expect(color_transform_target_1.transformColor("red", {
        opacity: "0.8"
    }).opacity).toBe(0.8);
    expect(color_transform_target_1.transformColor("red", {
        opacity: 0.8
    }).opacity).toBe(0.8);
    expect(color_transform_target_1.transformColor("red", {
        opacity: "+0.8"
    }).opacity).toBe(1);
    expect(color_transform_target_1.transformColor("red", {
        opacity: "-2"
    }).opacity).toBe(0);
    expect(color_transform_target_1.transformColor("red", {
        opacity: "+abc"
    }).opacity).toBe(1);
    expect(color_transform_target_1.transformColor("rgba(255, 255, 255, 0.1)", {
        opacity: "+0.8"
    }).opacity).toBe(0.9);
});
test('transformHsl', () => {
    // red: hsl(0deg 100% 50%)
    expect(color_transform_target_1.transformColor("red", {
        opacity: 2,
        hslTransformValue: {
            h: "+30",
            s: "-0.2",
            l: "abc",
        }
    })).toEqual({
        h: 30,
        s: 0.8,
        l: 0.5,
        opacity: 1
    });
});
test('transformRgb', () => {
    // red: rgb(255, 0, 0)
    expect(color_transform_target_1.transformColor("red", {
        opacity: 0.8,
        rgbTransformValue: {
            r: "+40",
            g: "+100",
            b: "abc",
        }
    }).rgb()).toEqual({
        r: 255,
        g: 100,
        b: 0,
        opacity: 0.8
    });
});
test('transformFn', () => {
    // red: rgb(255, 0, 0)
    // red: hsl(0deg 100% 50%)
    expect(color_transform_target_1.transformColor("rgba(255, 0, 0, 0.8)", {
        opacity: 0.4,
        transformFn: (baseColor, transformTarget) => {
            transformTarget.opacity = Number((transformTarget.opacity * baseColor.opacity).toFixed(2));
            return transformTarget;
        }
    })).toEqual({
        h: 0,
        s: 1,
        l: 0.5,
        opacity: 0.32
    });
});

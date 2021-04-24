"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformColor = void 0;
const d3_color_1 = require("d3-color");
function transformColor(baseColor, transformTarget) {
    const transform = (source, to, min, max) => {
        let target;
        if (typeof to === "string") {
            const transformValue = Number(to);
            if (Number.isFinite(transformValue)) {
                target = to.startsWith("+") || to.startsWith("-") ? source + transformValue : transformValue;
            }
        }
        else if (typeof to === "number") {
            target = to;
        }
        if (target === undefined) {
            target = source;
        }
        if (min !== undefined && target < min) {
            return min;
        }
        else if (max !== undefined && target > max) {
            return max;
        }
        else {
            return target;
        }
    };
    let color = d3_color_1.hsl(baseColor);
    if (transformTarget.hslTransformValue) {
        const hslColor = color;
        color = d3_color_1.hsl(transform(hslColor.h, transformTarget.hslTransformValue.h, 0, 360), transform(hslColor.s, transformTarget.hslTransformValue.s, 0, 1), transform(hslColor.l, transformTarget.hslTransformValue.l, 0, 1), color.opacity);
    }
    if (transformTarget.rgbTransformValue) {
        const rgbColor = d3_color_1.rgb(color || baseColor);
        color = d3_color_1.hsl(d3_color_1.rgb(transform(rgbColor.r, transformTarget.rgbTransformValue.r, 0, 255), transform(rgbColor.g, transformTarget.rgbTransformValue.g, 0, 255), transform(rgbColor.b, transformTarget.rgbTransformValue.b, 0, 255), color.opacity));
    }
    if (transformTarget.opacity) {
        color.opacity = transform(color.opacity, transformTarget.opacity, 0, 1);
    }
    if (transformTarget.markPercent) {
        const hslToString = color.toString.bind(color);
        color.toString = () => `${hslToString()} ${transformTarget.markPercent}`;
    }
    return color;
}
exports.transformColor = transformColor;

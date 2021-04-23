"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformColor = void 0;
const d3_color_1 = require("d3-color");
function transformColor(baseColor, transformTarget) {
    const transform = (source, to) => {
        var _a, _b;
        if (typeof to === "string") {
            if (to.startsWith("+")) {
                return source + Number((_a = to.match(/\+(.*)/)) === null || _a === void 0 ? void 0 : _a[1]);
            }
            if (to.startsWith("-")) {
                return source - Number((_b = to.match(/-(.*)/)) === null || _b === void 0 ? void 0 : _b[1]);
            }
        }
        else if (typeof to === "number") {
            return to;
        }
        return source;
    };
    let color = d3_color_1.hsl(baseColor);
    if (transformTarget.hslTransformValue) {
        const hslColor = color;
        color = d3_color_1.hsl(transform(hslColor.h, transformTarget.hslTransformValue.h), transform(hslColor.s, transformTarget.hslTransformValue.s), transform(hslColor.l, transformTarget.hslTransformValue.l), color.opacity);
    }
    if (transformTarget.rgbTransformValue) {
        const rgbColor = d3_color_1.rgb(color || baseColor);
        color = d3_color_1.hsl(d3_color_1.rgb(transform(rgbColor.r, transformTarget.rgbTransformValue.r), transform(rgbColor.g, transformTarget.rgbTransformValue.g), transform(rgbColor.b, transformTarget.rgbTransformValue.b), color.opacity));
    }
    if (transformTarget.opacity) {
        color.opacity = transform(color.opacity, transformTarget.opacity);
    }
    return color;
}
exports.transformColor = transformColor;

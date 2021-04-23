"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorToLinearGradient = void 0;
const color_transform_target_1 = require("./color-transform-target");
/**
 * convert color to linearGradient
 *
 * @export
 * @param {string} baseColor
 * @param {LinearGradientConvertOptions} convertOptions
 * @returns
 */
function colorToLinearGradient(baseColor, convertOptions) {
    var _a;
    const colorStops = (_a = convertOptions.colorStopTransformTargets) === null || _a === void 0 ? void 0 : _a.map((x, index) => { var _a; return `${color_transform_target_1.transformColor(baseColor, x)} ${((_a = convertOptions.colorStopTransformTargets) === null || _a === void 0 ? void 0 : _a[index].markPercent) || ""}`; });
    return `linear-gradient(${convertOptions.angle}deg, ${colorStops === null || colorStops === void 0 ? void 0 : colorStops.join(', ')})`;
}
exports.colorToLinearGradient = colorToLinearGradient;

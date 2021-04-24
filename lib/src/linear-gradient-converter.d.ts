import { ColorTransformTargets } from "./color-transform-target";
export interface LinearGradientConvertOptions {
    /**
     * The gradient line's angle of direction. A value of 0deg is equivalent to to top; increasing values rotate clockwise from there.
     *
     * @type {number} from 0-360
     * @memberof LinearGradientConvertOptions
     */
    angle?: number;
    /**
     * use for calc color stops
     *
     * @type {ColorTransformTargets}
     * @memberof LinearGradientConvertOptions
     */
    colorStopTransformTargets: ColorTransformTargets;
}
/**
 * convert color to linearGradient
 *
 * @export
 * @param {string} baseColor
 * @param {LinearGradientConvertOptions} convertOptions
 * @returns
 */
export declare function colorToLinearGradient(baseColor: string, convertOptions: LinearGradientConvertOptions): string;

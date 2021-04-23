import { HSLColor } from "d3-color";
/**
 * If the value is a numeric or a purely numeric character, the associated parameter uses the value as the absolute value
 *
 * If the value is a character that starts with '+' or '-', the relative value is computed with the parameters associated with the base color
 */
export declare type ColorTransformValue = number | string;
/**
 * Use for calc next color-stop with common color
 *
 * @export
 * @interface GradientHint
 */
export interface ColorTransformTarget {
    /**
     * By default, if there is no color with a 0% stop, the first color declared will be at that point.
     * Similarly, the last color will continue to the 100% mark,
     * or be at the 100% mark if no length has been declared on that last stop.
     *
     * @type {string}
     * @memberof ColorTransformTarget
     */
    markPercent?: string;
    opacity?: ColorTransformValue;
    /**
     * Use for calc next color stop with hsl
     *
     * @type {{
     *         h?: ColorTransformValue;
     *         s?: ColorTransformValue;
     *         l?: ColorTransformValue;
     *     }}
     * @memberof ColorTransformTarget
     */
    hslTransformValue?: {
        h?: ColorTransformValue;
        s?: ColorTransformValue;
        l?: ColorTransformValue;
    };
    /**
     * Use for calc next color stop with rgb
     *
     * @type {{
     *         r?: ColorTransformValue;
     *         g?: ColorTransformValue;
     *         a?: ColorTransformValue;
     *     }}
     * @memberof ColorTransformTarget
     */
    rgbTransformValue?: {
        r?: ColorTransformValue;
        g?: ColorTransformValue;
        b?: ColorTransformValue;
    };
}
export declare type ColorTransformTargets = ColorTransformTarget[];
export declare function transformColor(baseColor: string, transformTarget: ColorTransformTarget): HSLColor;

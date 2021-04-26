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
     * @type {string} from 0%-100%
     * @memberof ColorTransformTarget
     */
    markPercent?: string;
    opacity?: ColorTransformValue;
    /**
     * Use for calc next color stop with hsl
     *
     * @type {{
     *         h?: ColorTransformValue; // from 0-360
     *         s?: ColorTransformValue; // from 0-1
     *         l?: ColorTransformValue; // from 0-1
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
     * Priority lower than hslTransformValue
     *
     * @type {{
     *         r?: ColorTransformValue; // from 0-255
     *         g?: ColorTransformValue; // from 0-255
     *         a?: ColorTransformValue; // from 0-255
     *     }}
     * @memberof ColorTransformTarget
     */
    rgbTransformValue?: {
        r?: ColorTransformValue;
        g?: ColorTransformValue;
        b?: ColorTransformValue;
    };
    /**
     * Provide a function for specified transform color;
     *
     * Priority lower than hslTransformValue and rgbTransformValue
     */
    transformFn?: (baseColor: HSLColor, transformTarget: HSLColor) => undefined | HSLColor;
}
export declare type ColorTransformTargets = ColorTransformTarget[];
export declare function transformColor(baseColor: string, transformTarget: ColorTransformTarget): HSLColor;

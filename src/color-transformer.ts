import { hsl, HSLColor, rgb, RGBColor } from "d3-color";

/**
 * If the value is a numeric or a purely numeric character, the associated parameter uses the value as the absolute value
 *
 * If the value is a character that starts with '+' or '-', the relative value is computed with the parameters associated with the base color
 */
export type ColorTransformValue = number | string;

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

export type ColorTransformTargets = ColorTransformTarget[];

export function transformColor(
  baseColor: string,
  transformTarget: ColorTransformTarget
): HSLColor {
  const transform = (source: number, to: ColorTransformValue | undefined, min?: number, max?: number) => {
    let target: number | undefined;
    if (typeof to === "string") {
      const transformValue = Number(to);
      if(Number.isFinite(transformValue)) {
        target = to.startsWith("+") || to.startsWith("-") ? source + transformValue : transformValue;
      }
    } else if (typeof to === "number") {
      target = to;
    }
    if (target === undefined) {
      target = source;
    }
    if (min !== undefined && target < min) {
      return min;
    } else if (max !== undefined && target > max) {
      return max;
    } else {
      return target;
    }
  };
  let color: HSLColor = hsl(baseColor);
  if (transformTarget.hslTransformValue) {
    const hslColor = color;
    color = hsl(
        transform(hslColor.h, transformTarget.hslTransformValue.h, 0, 360),
        transform(hslColor.s, transformTarget.hslTransformValue.s, 0, 1),
        transform(hslColor.l, transformTarget.hslTransformValue.l, 0, 1),
        color.opacity
    );
  }
  if (transformTarget.rgbTransformValue) {
    const rgbColor = rgb(color || baseColor);
    color = hsl(rgb(
        transform(rgbColor.r, transformTarget.rgbTransformValue.r, 0, 255),
        transform(rgbColor.g, transformTarget.rgbTransformValue.g, 0, 255),
        transform(rgbColor.b, transformTarget.rgbTransformValue.b, 0, 255),
        color.opacity
    ));
  }
  if (transformTarget.opacity) {
    color.opacity = transform(color.opacity, transformTarget.opacity, 0, 1);
  }
  if (transformTarget.transformFn) {
    color = transformTarget.transformFn(hsl(baseColor), color) || color;
  }
  if (transformTarget.markPercent) {
    const hslToString = color.toString.bind(color);
    color.toString = () => `${hslToString()} ${transformTarget.markPercent}`;
  }
  return color;
}

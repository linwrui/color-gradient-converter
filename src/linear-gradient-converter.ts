import {
  ColorTransformTargets,
  transformColor,
} from "./color-transformer";

/**
 * see https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient()
 *
 * @export
 * @interface LinearGradientConvertOptions
 */
export interface LinearGradientConvertOptions {
  /**
   * The gradient line's angle of direction. A value of 0deg is equivalent to to top; increasing values rotate clockwise from there.
   *
   * @type {number} from 0-360
   * @memberof LinearGradientConvertOptions
   */
  angle?: number;

  /**
   * The position of the gradient line's starting point. 
   * If specified, it consists of the word to and up to two keywords: one indicates the horizontal side (left or right), and the other the vertical side (top or bottom). The order of the side keywords does not matter. 
   * If unspecified, it defaults to to bottom.
   * 
   * The values to top, to bottom, to left, and to right are equivalent to the angles 0deg, 180deg, 270deg, and 90deg, respectively. 
   * The other values are translated into an angle.
   *
   * PS: If both 'angle' and 'sideOrCorner' exist, use 'angle' preferentially
   * 
   * see https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient()
   * 
   * @type {string}
   * @memberof LinearGradientConvertOptions
   */
  sideOrCorner?: "to top left" | "to left" | "to bottom left" | "to bottom" | "to bottom right" | "to right" | "to top right" | "to top";

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
export function colorToLinearGradient(
  baseColor: string,
  convertOptions: LinearGradientConvertOptions
) {
  const colorStops = convertOptions.colorStopTransformTargets?.map((x) => transformColor(baseColor, x));
  return convertOptions.angle != null ? `linear-gradient(${convertOptions.angle}deg, ${colorStops?.join(', ')})` : `linear-gradient(${convertOptions.sideOrCorner}, ${colorStops?.join(', ')})`;
}

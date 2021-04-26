import {
  ColorTransformTargets,
  transformColor,
} from "./color-transformer";

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
export function colorToLinearGradient(
  baseColor: string,
  convertOptions: LinearGradientConvertOptions
) {
  const colorStops = convertOptions.colorStopTransformTargets?.map((x) => transformColor(baseColor, x));
  return `linear-gradient(${convertOptions.angle}deg, ${colorStops?.join(', ')})`;
}

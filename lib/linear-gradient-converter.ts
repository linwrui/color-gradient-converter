import {
  ColorTransformTargets,
  transformColor,
} from "./color-transform-target";

export interface LinearGradientConvertOptions {
  /**
   * The gradient line's angle of direction. A value of 0deg is equivalent to to top; increasing values rotate clockwise from there.
   *
   * @type {number}
   * @memberof LinearGradientConvertOptions
   */
  angle?: number;
  /**
   * 
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
  const colorStops = convertOptions.colorStopTransformTargets?.map((x, index) => `${transformColor(baseColor, x)} ${convertOptions.colorStopTransformTargets?.[index].markPercent || ""}`);
  return `linear-gradient(${convertOptions.angle}deg, ${colorStops?.join(', ')})`;
}

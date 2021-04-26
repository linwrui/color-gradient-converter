# color-gradient-converter
> Convert single-color to color-gradient

# Install
```
npm i color-gradient-converter

yarn add color-gradient-converter
```

# Usage
> see [color-transformer](./src/color-transformer.ts) for more info.

``` typescript
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
   * @type {string} from 0%-25%
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

export function transformColor(baseColor: string, transformTarget: ColorTransformTarget): HSLColor
```

## Sample
``` javascript
const linearGradient = colorToLinearGradient("red", {
    angle: 135,
    colorStopTransformTargets: [
        { opacity: 0.1 },
        { opacity: 0.6, rgbTransformValue: { g: "+25" }, markPercent: "25%" },
        { opacity: 0.1 },
    ],
});
console.log(linearGradient) // output： "linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 25, 0, 0.6) 25%, rgba(255, 0, 0, 0.1))"
```

# DEMO
* code: https://github.com/linwrui/my-react-app/blob/main/src/pages/color-gradient/index.tsx

* page: https://my-react-app-flax.vercel.app/#/color-gradient

* snapshot: 
![图 1](images/f571da30de0a2269ba4af32bf2435cf04014333e925f04ae5c06e39c77961b93.png)  
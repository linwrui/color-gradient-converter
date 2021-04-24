# color-gradient-converter
> Convert single-color to color-gradient

# Install
```
npm i color-gradient-converter

yarn add color-gradient-converter
```

# Usage Sample
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
![图 1](images/f571da30de0a2269ba4af32bf2435cf04014333e925f04ae5c06e39c77961b93.png)  


> code: https://github.com/linwrui/my-react-app/blob/main/src/pages/color-gradient/index.tsx

> page: https://my-react-app-flax.vercel.app/#/color-gradient

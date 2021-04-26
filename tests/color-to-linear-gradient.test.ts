import { colorToLinearGradient } from "../src/linear-gradient-converter";

test("colorToLinearGradient", () => {
    // red: rgb(255, 0, 0)
    expect(
      colorToLinearGradient("red", {
        angle: 135,
        colorStopTransformTargets: [
          { opacity: 0.1 },
          { opacity: 0.6, rgbTransformValue: { g: "+25" }, markPercent: "25%" },
          { opacity: 0.1 },
        ],
      })
    ).toBe("linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 25, 0, 0.6) 25%, rgba(255, 0, 0, 0.1))");
});
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeHeroHeading } from "./home-hero-heading";

function renderHeading() {
  return renderToStaticMarkup(<HomeHeroHeading />);
}

function lineTexts(html: string) {
  return [...html.matchAll(/<span[^>]*>([^<]*)<\/span>/g)].map(
    ([, text]) => text
  );
}

describe("HomeHeroHeading", () => {
  it("renders the headline as a single h1", () => {
    expect(renderHeading().match(/<h1\b/g)).toHaveLength(1);
  });

  it("puts each half of the headline on its own line, without a <br>", () => {
    const html = renderHeading();
    expect(html).not.toContain("<br");
    expect(lineTexts(html)).toEqual(["Learn to code,", "at your own pace"]);
  });
});

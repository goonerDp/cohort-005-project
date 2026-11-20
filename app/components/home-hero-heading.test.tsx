import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeHeroHeading } from "./home-hero-heading";

function render() {
  return renderToStaticMarkup(<HomeHeroHeading />);
}

describe("HomeHeroHeading", () => {
  it("renders the headline as a single h1", () => {
    const html = render();
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.replace(/<[^>]+>/g, "")).toBe("Learn to code,at your own pace");
  });

  it("breaks the two lines with block spans, not a hard <br>", () => {
    const html = render();
    expect(html).not.toContain("<br");
    expect(html.match(/<span class="block[ "]/g)).toHaveLength(2);
  });

  it("balances the wrap so no word is left alone on a narrow screen", () => {
    expect(render()).toMatch(/<h1 class="[^"]*\btext-balance\b/);
  });

  it("keeps the accent line readable by clipping a gradient to the text", () => {
    const html = render();
    expect(html).toMatch(
      /<span class="[^"]*\bbg-clip-text\b[^"]*\btext-transparent\b[^"]*">at your own pace<\/span>/
    );
  });
});

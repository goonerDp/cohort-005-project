import { describe, it, expect } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH as MAX } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("cannot save an empty box when there is no note yet", () => {
    expect(describeNoteDraft("", null)).toEqual({
      length: 0,
      max: MAX,
      tooLong: false,
      empty: true,
      unsaved: false,
      canSave: false,
    });
  });

  it("can save new text when there is no note yet", () => {
    const draft = describeNoteDraft("Generics are like parameters", null);
    expect(draft.unsaved).toBe(true);
    expect(draft.canSave).toBe(true);
    expect(draft.length).toBe(28);
  });

  it("treats whitespace-only text as empty", () => {
    const draft = describeNoteDraft("   \n ", null);
    expect(draft.empty).toBe(true);
    expect(draft.canSave).toBe(false);
  });

  it("has nothing to save when the box differs only by whitespace the server trims", () => {
    const draft = describeNoteDraft("saved text\n", "saved text");
    expect(draft.unsaved).toBe(false);
    expect(draft.canSave).toBe(false);
  });

  it("counts and limits the text as the server will store it", () => {
    const draft = describeNoteDraft(`  ${"a".repeat(MAX)}  `, null);
    expect(draft.length).toBe(MAX);
    expect(draft.tooLong).toBe(false);
  });

  it("has nothing to save when the box matches the saved note", () => {
    const draft = describeNoteDraft("saved text", "saved text");
    expect(draft.unsaved).toBe(false);
    expect(draft.canSave).toBe(false);
  });

  it("can save an edit to the saved note", () => {
    const draft = describeNoteDraft("saved text, edited", "saved text");
    expect(draft.unsaved).toBe(true);
    expect(draft.canSave).toBe(true);
  });

  it("allows exactly the maximum length", () => {
    const draft = describeNoteDraft("a".repeat(MAX), null);
    expect(draft.tooLong).toBe(false);
    expect(draft.canSave).toBe(true);
  });

  it("refuses one character over the maximum", () => {
    const draft = describeNoteDraft("a".repeat(MAX + 1), null);
    expect(draft.tooLong).toBe(true);
    expect(draft.length).toBe(MAX + 1);
    expect(draft.canSave).toBe(false);
  });
});

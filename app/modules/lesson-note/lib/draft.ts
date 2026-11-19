import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraft = {
  length: number;
  max: number;
  tooLong: boolean;
  empty: boolean;
  unsaved: boolean;
  canSave: boolean;
};

/** `savedBody` is null when the Student has no Note yet. */
export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraft {
  // The server stores the body trimmed; compare and count what it will store,
  // or a saved note with a trailing newline reads as "Unsaved changes" forever.
  const text = draft.trim();
  const tooLong = text.length > MAX_NOTE_LENGTH;
  const empty = text.length === 0;
  const unsaved = text !== (savedBody ?? "");

  return {
    length: text.length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    empty,
    unsaved,
    canSave: unsaved && !empty && !tooLong,
  };
}

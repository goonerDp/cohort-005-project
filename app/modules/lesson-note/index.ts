import { describeDraft, type NoteDraft } from "./lib/draft";

export type { NoteDraft };

/**
 * What the Lesson page's note editor shows for the text in the box: the
 * character count, whether it differs from the saved Note, and whether Save
 * should be enabled. `savedBody` is null when the Student has no Note yet.
 */
export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraft {
  return describeDraft(draft, savedBody);
}

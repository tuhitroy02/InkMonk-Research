// lib/toolkit/reviewerResponseEngine.ts
/**
 * InkMonk Research — Academic Reviewer Response Builder Engine
 * Assists authors in compiling structured, point-by-point rebuttal letters
 * for peer-reviewed journal revisions (IEEE, Elsevier, Springer, Nature, Scopus).
 * Never fabricates author replies or revisions.
 */

export interface ReviewerCommentItem {
  id: string;
  reviewerComment: string;
  authorResponse: string;
  locationChanged: string;
}

export interface ReviewerGroupItem {
  id: string;
  reviewerNumber: number;
  reviewerName: string; // e.g. "Reviewer #1", "Reviewer #2", "Editor / Associate Editor"
  comments: ReviewerCommentItem[];
}

export interface ManuscriptMetadata {
  manuscriptTitle: string;
  manuscriptId?: string;
  targetJournal?: string;
  authorName?: string;
}

/**
 * Checks for any unanswered comments or missing revision locations
 */
export function validateReviewerComments(groups: ReviewerGroupItem[]): {
  isFullyAnswered: boolean;
  unansweredComments: {
    reviewerName: string;
    commentIndex: number;
    missingField: 'response' | 'location' | 'both';
  }[];
} {
  const unanswered: {
    reviewerName: string;
    commentIndex: number;
    missingField: 'response' | 'location' | 'both';
  }[] = [];

  groups.forEach((group) => {
    group.comments.forEach((c, idx) => {
      const hasResponse = Boolean(c.authorResponse.trim());
      const hasLocation = Boolean(c.locationChanged.trim());

      if (!hasResponse && !hasLocation) {
        unanswered.push({
          reviewerName: group.reviewerName,
          commentIndex: idx + 1,
          missingField: 'both',
        });
      } else if (!hasResponse) {
        unanswered.push({
          reviewerName: group.reviewerName,
          commentIndex: idx + 1,
          missingField: 'response',
        });
      } else if (!hasLocation) {
        unanswered.push({
          reviewerName: group.reviewerName,
          commentIndex: idx + 1,
          missingField: 'location',
        });
      }
    });
  });

  return {
    isFullyAnswered: unanswered.length === 0,
    unansweredComments: unanswered,
  };
}

/**
 * Formats full academic response letter organized by reviewer and comment
 */
export function generateResponseLetter(
  meta: ManuscriptMetadata,
  groups: ReviewerGroupItem[]
): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const lines: string[] = [];

  // Header & Title
  lines.push('================================================================================');
  lines.push('POINT-BY-POINT RESPONSE TO EDITORS AND REVIEWERS');
  lines.push('================================================================================');
  lines.push('');
  lines.push(`Date: ${dateStr}`);
  lines.push(`Manuscript Title: ${meta.manuscriptTitle.trim() || '[Manuscript Title]'}`);
  if (meta.manuscriptId?.trim()) {
    lines.push(`Manuscript Tracking ID: ${meta.manuscriptId.trim()}`);
  }
  if (meta.targetJournal?.trim()) {
    lines.push(`Target Journal: ${meta.targetJournal.trim()}`);
  }
  if (meta.authorName?.trim()) {
    lines.push(`Corresponding Author(s): ${meta.authorName.trim()}`);
  }
  lines.push('');
  lines.push('Dear Editor and Reviewers,');
  lines.push('');
  lines.push(
    'We express our sincere gratitude to the Associate Editor and Reviewers for their constructive evaluation, insightful feedback, and rigorous comments on our manuscript. We have carefully considered every observation, incorporated the suggested modifications, and performed the necessary revisions to clarify methodology, strengthen empirical analyses, and update citations.'
  );
  lines.push('');
  lines.push(
    'A detailed point-by-point response addressing each comment in sequence is presented below, alongside the precise page, line, and section locations where modifications have been landed in the revised manuscript.'
  );
  lines.push('');

  // Iterate Reviewer Groups
  groups.forEach((group, gIdx) => {
    const revNum = gIdx + 1;
    lines.push('================================================================================');
    lines.push(`RESPONSES TO ${group.reviewerName.toUpperCase()}`);
    lines.push('================================================================================');
    lines.push('');

    if (group.comments.length === 0) {
      lines.push('[No specific comments registered for this reviewer.]');
      lines.push('');
      return;
    }

    group.comments.forEach((comment, cIdx) => {
      const commentTag = `Comment ${revNum}.${cIdx + 1}`;
      lines.push('--------------------------------------------------------------------------------');
      lines.push(`${commentTag}:`);
      lines.push(
        comment.reviewerComment.trim()
          ? `"${comment.reviewerComment.trim()}"`
          : '[Reviewer comment not provided]'
      );
      lines.push('');
      lines.push('Author Response:');
      lines.push(
        comment.authorResponse.trim()
          ? comment.authorResponse.trim()
          : '[Author response pending revision.]'
      );
      lines.push('');
      lines.push('Page / Line / Section Changed:');
      lines.push(
        comment.locationChanged.trim()
          ? comment.locationChanged.trim()
          : '[Location not specified.]'
      );
      lines.push('');
    });
  });

  // Closing
  lines.push('================================================================================');
  lines.push(
    'We trust that these revisions satisfactorily address all points raised by the reviewers and that the revised manuscript is now fully prepared for publication.'
  );
  lines.push('');
  lines.push('Respectfully submitted,');
  lines.push(meta.authorName?.trim() || 'The Authors');
  lines.push('');

  return lines.join('\n');
}

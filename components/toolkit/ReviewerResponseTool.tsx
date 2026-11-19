// components/toolkit/ReviewerResponseTool.tsx
'use client';

import React, { useState } from 'react';
import {
  ReviewerGroupItem,
  ReviewerCommentItem,
  ManuscriptMetadata,
  validateReviewerComments,
  generateResponseLetter,
} from '@/lib/toolkit/reviewerResponseEngine';

const INITIAL_GROUPS: ReviewerGroupItem[] = [
  {
    id: 'grp-1',
    reviewerNumber: 1,
    reviewerName: 'Reviewer #1',
    comments: [
      {
        id: 'c-1-1',
        reviewerComment:
          'The motivation for choosing a Bi-LSTM model over standard Transformer architectures for short-duration time series is not adequately justified in Section 3.',
        authorResponse:
          'We agree with the reviewer that this rationale required elaboration. In Section 3.2, we have expanded the discussion to detail why Bi-LSTM provides superior parameter efficiency and prevents overfitting on limited 1,000-sample microgrid telemetry datasets compared to multi-head self-attention mechanisms.',
        locationChanged: 'Page 6, Section 3.2, Lines 142–158',
      },
    ],
  },
  {
    id: 'grp-2',
    reviewerNumber: 2,
    reviewerName: 'Reviewer #2',
    comments: [
      {
        id: 'c-2-1',
        reviewerComment:
          'Please clarify whether the 5-fold cross-validation split was performed on patient-level or slice-level data to ensure no data leakage.',
        authorResponse:
          'We thank the reviewer for highlighting this critical methodological consideration. We confirm that all cross-validation partitioning was strictly executed at the patient cohort level, completely isolating patient data between training and validation folds.',
        locationChanged: 'Page 8, Section 4.1, Lines 210–222, and Table 2 Caption',
      },
    ],
  },
];

export default function ReviewerResponseTool() {
  const [meta, setMeta] = useState<ManuscriptMetadata>({
    manuscriptTitle: 'Optimized Deep Architecture for Microgrid Renewable Forecasting',
    manuscriptId: 'IEEE-TSE-2026-0891',
    targetJournal: 'IEEE Transactions on Sustainable Energy',
    authorName: 'Dr. Debabrata Roy & InkMonk Directorate',
  });

  const [groups, setGroups] = useState<ReviewerGroupItem[]>(INITIAL_GROUPS);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Generated Letter State
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const [unansweredList, setUnansweredList] = useState<{ reviewerName: string; commentIndex: number; missingField: string }[]>([]);
  const [copied, setCopied] = useState(false);

  // Add new reviewer group
  const handleAddGroup = () => {
    const nextNum = groups.length + 1;
    const newGroup: ReviewerGroupItem = {
      id: `grp-${Date.now()}`,
      reviewerNumber: nextNum,
      reviewerName: `Reviewer #${nextNum}`,
      comments: [
        {
          id: `c-${nextNum}-1`,
          reviewerComment: '',
          authorResponse: '',
          locationChanged: '',
        },
      ],
    };
    setGroups([...groups, newGroup]);
    setActiveGroupIndex(groups.length);
  };

  // Add comment to group
  const handleAddComment = (groupIndex: number) => {
    const group = groups[groupIndex];
    const newComment: ReviewerCommentItem = {
      id: `c-${group.reviewerNumber}-${Date.now()}`,
      reviewerComment: '',
      authorResponse: '',
      locationChanged: '',
    };
    const updated = [...groups];
    updated[groupIndex].comments.push(newComment);
    setGroups(updated);
  };

  // Delete comment
  const handleDeleteComment = (groupIndex: number, commentIndex: number) => {
    const updated = [...groups];
    updated[groupIndex].comments.splice(commentIndex, 1);
    setGroups(updated);
  };

  // Reorder comment Up
  const handleMoveUp = (groupIndex: number, commentIndex: number) => {
    if (commentIndex === 0) return;
    const updated = [...groups];
    const list = updated[groupIndex].comments;
    const temp = list[commentIndex - 1];
    list[commentIndex - 1] = list[commentIndex];
    list[commentIndex] = temp;
    setGroups(updated);
  };

  // Reorder comment Down
  const handleMoveDown = (groupIndex: number, commentIndex: number) => {
    const updated = [...groups];
    const list = updated[groupIndex].comments;
    if (commentIndex === list.length - 1) return;
    const temp = list[commentIndex + 1];
    list[commentIndex + 1] = list[commentIndex];
    list[commentIndex] = temp;
    setGroups(updated);
  };

  // Update a comment field
  const handleCommentChange = (
    groupIndex: number,
    commentIndex: number,
    field: keyof ReviewerCommentItem,
    value: string
  ) => {
    const updated = [...groups];
    updated[groupIndex].comments[commentIndex] = {
      ...updated[groupIndex].comments[commentIndex],
      [field]: value,
    };
    setGroups(updated);
    setGeneratedLetter(null);
  };

  // Delete reviewer group
  const handleDeleteGroup = (groupIndex: number) => {
    if (groups.length <= 1) return;
    const updated = groups.filter((_, idx) => idx !== groupIndex);
    setGroups(updated);
    setActiveGroupIndex(Math.max(0, groupIndex - 1));
  };

  // Build / Export Letter
  const handleGenerateClick = (force = false) => {
    const validation = validateReviewerComments(groups);

    if (!validation.isFullyAnswered && !force) {
      setUnansweredList(validation.unansweredComments);
      setShowUnansweredWarning(true);
      return;
    }

    setShowUnansweredWarning(false);
    const letter = generateResponseLetter(meta, groups);
    setGeneratedLetter(letter);
  };

  const handleCopyLetter = () => {
    if (!generatedLetter) return;
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!generatedLetter) return;
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = meta.manuscriptId
      ? `Rebuttal_${meta.manuscriptId.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
      : 'Response_to_Reviewers.txt';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetExample = () => {
    setGroups(INITIAL_GROUPS);
    setActiveGroupIndex(0);
    setGeneratedLetter(null);
    setShowUnansweredWarning(false);
  };

  const currentGroup = groups[activeGroupIndex] || groups[0];

  return (
    <div className="space-y-6 text-slate-900 dark:text-white">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>📝 Reviewer Response Builder</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
          Construct structured, publication-grade point-by-point rebuttal letters with comment reordering, location tracking, and unanswered item audits.
        </p>
      </div>

      {/* Manuscript Meta Controls */}
      <div className="card-clay-white p-5 border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
        <span className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block">
          Manuscript &amp; Submission Details:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
              Manuscript Title:
            </label>
            <input
              type="text"
              value={meta.manuscriptTitle}
              onChange={(e) => setMeta({ ...meta, manuscriptTitle: e.target.value })}
              className="w-full bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
              Manuscript Tracking ID:
            </label>
            <input
              type="text"
              value={meta.manuscriptId || ''}
              onChange={(e) => setMeta({ ...meta, manuscriptId: e.target.value })}
              placeholder="e.g. IEEE-TSE-2026-0891"
              className="w-full bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
              Target Journal:
            </label>
            <input
              type="text"
              value={meta.targetJournal || ''}
              onChange={(e) => setMeta({ ...meta, targetJournal: e.target.value })}
              placeholder="e.g. IEEE, Springer, Nature"
              className="w-full bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1">
              Author(s) / Signature:
            </label>
            <input
              type="text"
              value={meta.authorName || ''}
              onChange={(e) => setMeta({ ...meta, authorName: e.target.value })}
              className="w-full bg-slate-50/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl p-2 font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Reviewer Tabs & Add Group */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((group, idx) => (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeGroupIndex === idx
                  ? 'bg-[#1d4ed8] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-[#1d4ed8] hover:text-[#1d4ed8]'
              }`}
            >
              <span>{group.reviewerName}</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full">
                {group.comments.length}
              </span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleAddGroup}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold border border-dashed border-slate-300 dark:border-slate-700 cursor-pointer transition-all duration-200"
          >
            + Add Reviewer Group
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetExample}
            className="text-xs font-bold text-[#f97316] hover:text-[#ea580c] dark:hover:text-orange-400 hover:underline cursor-pointer transition-colors"
          >
            Reset to Sample Rebuttal
          </button>
        </div>
      </div>

      {/* Active Reviewer Group Comments */}
      {currentGroup && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentGroup.reviewerName}
                onChange={(e) => {
                  const updated = [...groups];
                  updated[activeGroupIndex].reviewerName = e.target.value;
                  setGroups(updated);
                }}
                className="font-serif text-lg font-black bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-[#1d4ed8] focus:outline-none px-1 py-0.5"
              />
              <span className="text-xs text-slate-400">
                ({currentGroup.comments.length} Comments in this section)
              </span>
            </div>

            {groups.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteGroup(activeGroupIndex)}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                Delete this Reviewer Group 🗑️
              </button>
            )}
          </div>

          {currentGroup.comments.map((comment, cIdx) => (
            <div
              key={comment.id}
              className="card-clay-white p-5 border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs space-y-3 relative group"
            >
              {/* Comment Numbering & Reorder Buttons */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="bg-[#1d4ed8] text-white text-xs font-black px-2.5 py-1 rounded-lg font-mono shadow-2xs">
                  Comment {currentGroup.reviewerNumber}.{cIdx + 1}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(activeGroupIndex, cIdx)}
                    disabled={cIdx === 0}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-all duration-200"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(activeGroupIndex, cIdx)}
                    disabled={cIdx === currentGroup.comments.length - 1}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-all duration-200"
                    title="Move Down"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteComment(activeGroupIndex, cIdx)}
                    className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/40 cursor-pointer ml-1 transition-all duration-200"
                    title="Delete Comment"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Reviewer Comment Text */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 dark:text-slate-300 mb-1">
                  Reviewer Original Comment (Verbatim):
                </label>
                <textarea
                  rows={3}
                  value={comment.reviewerComment}
                  onChange={(e) =>
                    handleCommentChange(activeGroupIndex, cIdx, 'reviewerComment', e.target.value)
                  }
                  placeholder="Paste the exact wording from the reviewer report…"
                  className="w-full bg-slate-50/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                />
              </div>

              {/* Author Response Text */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 dark:text-slate-300 mb-1">
                  Author Rebuttal / Response:
                </label>
                <textarea
                  rows={3}
                  value={comment.authorResponse}
                  onChange={(e) =>
                    handleCommentChange(activeGroupIndex, cIdx, 'authorResponse', e.target.value)
                  }
                  placeholder="Detail your scientific justification, counter-argument, or how the comment was addressed…"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                />
              </div>

              {/* Location of Change */}
              <div>
                <label className="block text-[11px] font-black text-slate-700 dark:text-slate-300 mb-1">
                  Page / Line / Section Changed:
                </label>
                <input
                  type="text"
                  value={comment.locationChanged}
                  onChange={(e) =>
                    handleCommentChange(activeGroupIndex, cIdx, 'locationChanged', e.target.value)
                  }
                  placeholder="e.g. Page 7, Section 3.2, Lines 142–150"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20 transition-all duration-200 shadow-2xs"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => handleAddComment(activeGroupIndex)}
              className="btn-clay-white text-xs py-2 px-4 font-bold cursor-pointer rounded-xl shadow-2xs hover:shadow-xs focus:ring-2 focus:ring-slate-400/30 transition-all duration-200"
            >
              + Add Comment to {currentGroup.reviewerName}
            </button>
          </div>
        </div>
      )}

      {/* Unanswered Comments Flagging Warning Modal / Banner */}
      {showUnansweredWarning && (
        <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-800/80 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-sm">
            <span>⚠️</span>
            <span>Warning: Unanswered Reviewer Comments Detected</span>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
            The following comments do not have a completed Author Response or Manuscript Location:
          </p>
          <ul className="text-xs text-amber-800 dark:text-amber-300 list-disc list-inside space-y-1 font-mono">
            {unansweredList.map((item, idx) => (
              <li key={idx}>
                {item.reviewerName} (Comment #{item.commentIndex}) — Missing {item.missingField}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleGenerateClick(true)}
              className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer shadow-2xs transition-all duration-200"
            >
              Export Anyway with Placeholders →
            </button>
            <button
              type="button"
              onClick={() => setShowUnansweredWarning(false)}
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer shadow-2xs transition-all duration-200"
            >
              Continue Editing Responses
            </button>
          </div>
        </div>
      )}

      {/* Generate Letter Trigger */}
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={() => handleGenerateClick(false)}
          className="btn-clay-orange text-xs sm:text-sm py-3 px-8 font-extrabold flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f97316]/50 transition-all duration-200"
        >
          <span>Generate Official Response Letter</span>
          <span>→</span>
        </button>
      </div>

      {/* Rendered Response Letter Preview */}
      {generatedLetter && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="font-serif text-lg font-black text-slate-900 dark:text-white">
                Official Rebuttal Document Preview
              </h4>
              <p className="text-xs text-slate-500">
                Point-by-point document formatted for IEEE, Elsevier, Springer, Nature &amp; Scopus editors.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLetter}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 text-slate-800 dark:text-slate-100 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs focus:ring-2 focus:ring-slate-400/30"
              >
                {copied ? '✓ Letter Copied!' : '📋 Copy Letter'}
              </button>
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="btn-clay-orange text-xs py-2 px-4 font-bold cursor-pointer shadow-xs hover:shadow-sm focus:ring-2 focus:ring-[#f97316]/40 transition-all duration-200"
              >
                💾 Download .txt File
              </button>
            </div>
          </div>

          <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto border-2 border-slate-800 shadow-inner">
            <pre className="whitespace-pre-wrap">{generatedLetter}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

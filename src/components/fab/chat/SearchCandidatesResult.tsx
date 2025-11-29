import {
  Check,
  CheckSquare,
  Square,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react';
import { JSX, useState } from 'react';

import { SearchCandidate } from '@/types/candidate';
import CandidateCard from './CandidateCard';
import { CHAT_COLORS } from './types';

export interface SearchCandidatesOutput {
  candidates: SearchCandidate[];
  totalFound: number;
}

interface ActionItem {
  id: string;
  label: string;
  icon: JSX.Element;
  variant?: 'default' | 'primary' | 'danger';
  onClick: () => void;
}

type ConfirmingAction = 'approve' | 'reject' | null;

const getConfirmationBackground = (action: ConfirmingAction): string => {
  if (action === 'approve') {
    return `linear-gradient(to right, ${CHAT_COLORS.success}08, ${CHAT_COLORS.success}03)`;
  }
  if (action === 'reject') {
    return `linear-gradient(to right, ${CHAT_COLORS.error}08, ${CHAT_COLORS.error}03)`;
  }
  return 'transparent';
};

const getButtonStyle = (variant: ActionItem['variant'] = 'default') => {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: CHAT_COLORS.primary,
        color: '#FFFFFF',
        border: 'none',
      };
    case 'danger':
      return {
        backgroundColor: 'transparent',
        color: CHAT_COLORS.error,
        border: `1px solid ${CHAT_COLORS.error}40`,
      };
    default:
      return {
        backgroundColor: 'transparent',
        color: CHAT_COLORS.text.secondary,
        border: `1px solid ${CHAT_COLORS.border}`,
      };
  }
};

export default function SearchCandidatesResult({
  output,
  onViewCandidate,
}: {
  output: SearchCandidatesOutput;
  onViewCandidate?: (candidateId: string) => void;
}): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmingAction, setConfirmingAction] =
    useState<ConfirmingAction>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isSelectionMode = selectedIds.size > 0;
  const allSelected =
    output.candidates.length > 0 &&
    selectedIds.size === output.candidates.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const handleSelectionChange = (id: string, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setConfirmingAction(null);
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(output.candidates.map((c) => c.id)));
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmingAction || selectedIds.size === 0) return;

    setIsProcessing(true);
    try {
      // TODO: Implement actual API call for approve/reject
      // await api[confirmingAction](Array.from(selectedIds));
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 500);
      }); // Simulated delay

      // Clear selection after successful action
      setSelectedIds(new Set());
      setConfirmingAction(null);
    } catch {
      // Handle error
    } finally {
      setIsProcessing(false);
    }
  };

  const cancelConfirmation = () => {
    if (!isProcessing) {
      setConfirmingAction(null);
    }
  };

  const actions: ActionItem[] = [
    {
      id: 'reject',
      label: 'Reject',
      icon: <ThumbsDown size={16} strokeWidth={2.5} />,
      variant: 'danger',
      onClick: () => setConfirmingAction('reject'),
    },
    {
      id: 'approve',
      label: 'Approve',
      icon: <ThumbsUp size={16} strokeWidth={2.5} />,
      variant: 'primary',
      onClick: () => setConfirmingAction('approve'),
    },
  ];

  return (
    <div className='space-y-4'>
      {/* Success indicator + Actions Toolbar */}
      <div
        className='overflow-hidden rounded-xl border'
        style={{
          backgroundColor: CHAT_COLORS.surface,
          borderColor: CHAT_COLORS.border,
        }}
      >
        {/* Top row: Success message + Select toggle */}
        <div
          className='flex items-center justify-between border-b px-4 py-2.5'
          style={{ borderColor: CHAT_COLORS.borderLight }}
        >
          <div className='flex items-center gap-2'>
            <Check
              size={16}
              style={{ color: CHAT_COLORS.success }}
              className='shrink-0'
            />
            <span
              className='text-sm font-medium'
              style={{ color: CHAT_COLORS.text.primary }}
            >
              Found {output.totalFound} candidate
              {output.totalFound !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Select All / Clear toggle */}
          <button
            type='button'
            onClick={handleSelectAll}
            className='flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-opacity-80'
            style={{
              backgroundColor: isSelectionMode
                ? `${CHAT_COLORS.primary}12`
                : 'transparent',
              color: isSelectionMode
                ? CHAT_COLORS.primary
                : CHAT_COLORS.text.muted,
            }}
          >
            {allSelected && (
              <>
                <CheckSquare size={14} strokeWidth={2} />
                Deselect all
              </>
            )}
            {someSelected && (
              <>
                <CheckSquare size={14} strokeWidth={2} />
                Select all
              </>
            )}
            {!allSelected && !someSelected && (
              <>
                <Square size={14} strokeWidth={2} />
                Select
              </>
            )}
          </button>
        </div>

        {/* Actions bar - transforms to confirmation when action is pending */}
        <div
          className='relative overflow-hidden transition-all duration-200'
          style={{
            background: isSelectionMode
              ? `linear-gradient(to right, ${CHAT_COLORS.primary}06, ${CHAT_COLORS.primary}02)`
              : 'transparent',
            opacity: isSelectionMode ? 1 : 0.4,
            pointerEvents: isSelectionMode ? 'auto' : 'none',
          }}
        >
          {/* Default state: Selection count + Actions */}
          <div
            className='flex items-center justify-between gap-2 px-4 py-3 transition-all duration-200'
            style={{
              opacity: confirmingAction ? 0 : 1,
              transform: confirmingAction
                ? 'translateY(-100%)'
                : 'translateY(0)',
              position: confirmingAction ? 'absolute' : 'relative',
              inset: confirmingAction ? 0 : 'auto',
              pointerEvents: confirmingAction ? 'none' : 'auto',
            }}
          >
            {/* Selection count */}
            <div className='flex items-center gap-2'>
              <span
                className='flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold transition-all duration-200'
                style={{
                  backgroundColor: isSelectionMode
                    ? CHAT_COLORS.primary
                    : CHAT_COLORS.border,
                  color: '#FFFFFF',
                }}
              >
                {selectedIds.size || 0}
              </span>
              <span
                className='text-sm font-medium'
                style={{ color: CHAT_COLORS.text.secondary }}
              >
                selected
              </span>
            </div>

            {/* Actions */}
            <div className='flex items-center gap-1'>
              {actions.map((action) => (
                <button
                  key={action.id}
                  type='button'
                  title={action.label}
                  aria-label={action.label}
                  onClick={action.onClick}
                  disabled={!isSelectionMode}
                  className='flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed'
                  style={getButtonStyle(action.variant)}
                >
                  {action.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Confirmation state - compact single line */}
          <div
            className='flex items-center justify-between gap-2 px-4 py-3 transition-all duration-200'
            style={{
              opacity: confirmingAction ? 1 : 0,
              transform: confirmingAction
                ? 'translateY(0)'
                : 'translateY(100%)',
              position: confirmingAction ? 'relative' : 'absolute',
              inset: confirmingAction ? 'auto' : 0,
              pointerEvents: confirmingAction ? 'auto' : 'none',
              background: getConfirmationBackground(confirmingAction),
            }}
          >
            <span
              className='text-xs font-medium'
              style={{
                color:
                  confirmingAction === 'approve'
                    ? CHAT_COLORS.success
                    : CHAT_COLORS.error,
              }}
            >
              {confirmingAction === 'approve' ? 'Approve' : 'Reject'}{' '}
              {selectedIds.size} candidate{selectedIds.size !== 1 ? 's' : ''}?
            </span>

            <div className='flex items-center gap-1'>
              <button
                type='button'
                onClick={cancelConfirmation}
                disabled={isProcessing}
                className='flex h-6 w-6 items-center justify-center rounded-md transition-all hover:opacity-80 disabled:opacity-50'
                style={{ color: CHAT_COLORS.text.muted }}
                title='Cancel'
                aria-label='Cancel'
              >
                <X size={14} />
              </button>
              <button
                type='button'
                onClick={handleConfirmAction}
                disabled={isProcessing}
                className='flex h-6 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium text-white transition-all hover:opacity-90 disabled:opacity-70'
                style={{
                  backgroundColor:
                    confirmingAction === 'approve'
                      ? CHAT_COLORS.success
                      : CHAT_COLORS.error,
                }}
              >
                {isProcessing ? (
                  <span
                    className='h-4 w-3 animate-spin rounded-full border-2 border-white border-t-transparent'
                    aria-hidden='true'
                  />
                ) : (
                  <Check size={12} />
                )}
                {isProcessing ? '...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Cards */}
      <div className='space-y-3'>
        {output.candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            selectable
            selected={selectedIds.has(candidate.id)}
            isHovered={hoveredId === candidate.id}
            onSelectionChange={handleSelectionChange}
            onViewCandidate={onViewCandidate}
            onHoverChange={(hovered) =>
              setHoveredId(hovered ? candidate.id : null)
            }
          />
        ))}
      </div>
    </div>
  );
}

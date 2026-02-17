/*
 * This file is part of JunctionRelay.
 *
 * Copyright (C) 2024-present Jonathan Mills, CatapultCase
 *
 * JunctionRelay is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JunctionRelay is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JunctionRelay. If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { ColumnDefinition } from '../types/ColumnDefinition';

export interface UseColumnVisibilityReturn<T extends string> {
  /** Visible columns in effective order (start-pinned first, end-pinned last). For the table. */
  visibleColumns: T[];
  /** All columns (visible + hidden) in effective order. For the column picker. */
  orderedColumns: T[];
  /** Set of currently hidden column fields. For the column picker. */
  hiddenColumns: Set<T>;
  toggleColumn: (field: T, visible: boolean) => void;
  moveColumn: (field: T, direction: 'up' | 'down') => void;
  /** Reset column order and visibility to defaults (definition order, defaultHidden respected). */
  resetToDefault: () => void;
  anchorEl: HTMLElement | null;
  openPopover: (e: React.MouseEvent<HTMLElement>) => void;
  closePopover: () => void;
}

/**
 * Hook for managing table column visibility, ordering, and persistence.
 *
 * Columns marked `pinned: 'start'` always appear first (in definition order).
 * Columns marked `pinned: 'end'` always appear last (in definition order).
 * Middle columns can be freely reordered. Hidden columns keep their position
 * in the picker and can still be reordered while hidden.
 */
export function useColumnVisibility<T extends string>(
  localStorageKey: string,
  allColumns: ColumnDefinition<T>[],
): UseColumnVisibilityReturn<T> {
  const allFields = useMemo(() => allColumns.map((c) => c.field), [allColumns]);

  // Load persisted state with migration from old format (plain array -> { order, hidden })
  const [columnOrder, setColumnOrder] = useState<T[]>(() => {
    try {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Old format: plain array of visible column fields
          const valid = parsed.filter((f: T) => allFields.includes(f));
          const missing = allFields.filter((f) => !valid.includes(f));
          return [...valid, ...missing];
        }
        if (parsed && parsed.order) {
          // New format: { order, hidden }
          const valid = (parsed.order as T[]).filter((f) => allFields.includes(f));
          const missing = allFields.filter((f) => !valid.includes(f));
          return [...valid, ...missing];
        }
      }
    } catch { /* fall through to default */ }
    return allFields;
  });

  const [hiddenSet, setHiddenSet] = useState<Set<T>>(() => {
    try {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Old format: fields NOT in the array are hidden
          const visible = new Set(parsed as T[]);
          return new Set(allFields.filter((f) => !visible.has(f)));
        }
        if (parsed && parsed.hidden) {
          return new Set((parsed.hidden as T[]).filter((f) => allFields.includes(f)));
        }
      }
    } catch { /* fall through to default */ }
    // Default: hide columns marked defaultHidden
    return new Set<T>(allColumns.filter((c) => c.defaultHidden).map((c) => c.field));
  });

  // Reconcile when the column definition changes (e.g. dynamic columns added/removed after mount).
  // Append any new fields and remove any stale ones so late-arriving columns appear.
  useEffect(() => {
    setColumnOrder((prev) => {
      const prevSet = new Set(prev);
      const newFields = allFields.filter((f) => !prevSet.has(f));
      if (newFields.length === 0 && prev.length === allFields.length) return prev;
      const validFields = new Set(allFields);
      const filtered = prev.filter((f) => validFields.has(f));
      return [...filtered, ...newFields];
    });
    // Also clean up hidden set — remove fields that no longer exist
    setHiddenSet((prev) => {
      const validFields = new Set(allFields);
      const next = new Set([...prev].filter((f) => validFields.has(f)));
      if (next.size === prev.size) return prev;
      return next;
    });
  }, [allFields]);

  // Persist to localStorage (new format)
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify({
      order: columnOrder,
      hidden: [...hiddenSet],
    }));
  }, [columnOrder, hiddenSet, localStorageKey]);

  // Pinned field sets (preserved in definition order)
  const startPinnedFields = useMemo(
    () => allColumns.filter((c) => c.pinned === 'start').map((c) => c.field),
    [allColumns],
  );

  const endPinnedFields = useMemo(
    () => allColumns.filter((c) => c.pinned === 'end').map((c) => c.field),
    [allColumns],
  );

  // Effective order: start-pinned -> user-ordered middle -> end-pinned
  const effectiveOrder = useMemo(() => {
    const start = startPinnedFields.filter((f) => columnOrder.includes(f));
    const end = endPinnedFields.filter((f) => columnOrder.includes(f));
    const middle = columnOrder.filter(
      (f) => !startPinnedFields.includes(f) && !endPinnedFields.includes(f),
    );
    return [...start, ...middle, ...end];
  }, [columnOrder, startPinnedFields, endPinnedFields]);

  // Visible columns = effective order minus hidden
  const visibleColumns = useMemo(
    () => effectiveOrder.filter((f) => !hiddenSet.has(f)),
    [effectiveOrder, hiddenSet],
  );

  const toggleColumn = useCallback((field: T, visible: boolean) => {
    // Cannot hide alwaysVisible columns
    const colDef = allColumns.find((c) => c.field === field);
    if (!visible && colDef?.alwaysVisible) return;

    setHiddenSet((prev) => {
      const next = new Set(prev);
      if (visible) {
        next.delete(field);
      } else {
        next.add(field);
      }
      return next;
    });
  }, [allColumns]);

  const resetToDefault = useCallback(() => {
    setColumnOrder(allFields);
    setHiddenSet(new Set<T>(allColumns.filter((c) => c.defaultHidden).map((c) => c.field)));
  }, [allFields, allColumns]);

  const moveColumn = useCallback((field: T, direction: 'up' | 'down') => {
    const colDef = allColumns.find((c) => c.field === field);
    if (colDef?.pinned) return; // pinned columns cannot be reordered

    setColumnOrder((prev) => {
      const i = prev.indexOf(field);
      if (i < 0) return prev;
      const j = direction === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= prev.length) return prev;
      // Don't allow swapping with a pinned column
      const targetDef = allColumns.find((c) => c.field === prev[j]);
      if (targetDef?.pinned) return prev;
      const copy = [...prev];
      copy.splice(i, 1);
      copy.splice(j, 0, field);
      return copy;
    });
  }, [allColumns]);

  // Popover anchor state
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openPopover = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const closePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    visibleColumns,
    orderedColumns: effectiveOrder,
    hiddenColumns: hiddenSet,
    toggleColumn,
    moveColumn,
    resetToDefault,
    anchorEl,
    openPopover,
    closePopover,
  };
}

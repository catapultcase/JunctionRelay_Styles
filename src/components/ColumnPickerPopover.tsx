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

import React from 'react';
import {
  Popover,
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { ColumnDefinition } from '../types/ColumnDefinition';

interface ColumnPickerPopoverProps<T extends string> {
  allColumns: ColumnDefinition<T>[];
  /** All column fields in effective order (start-pinned first, end-pinned last). */
  orderedColumns: T[];
  /** Set of currently hidden column fields. */
  hiddenColumns: Set<T>;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onToggle: (field: T, visible: boolean) => void;
  onMove: (field: T, direction: 'up' | 'down') => void;
  /** Reset column order and visibility to defaults. */
  onReset: () => void;
}

function ColumnPickerPopoverInner<T extends string>({
  allColumns,
  orderedColumns,
  hiddenColumns,
  anchorEl,
  onClose,
  onToggle,
  onMove,
  onReset,
}: ColumnPickerPopoverProps<T>) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Box sx={{ p: 2, minWidth: 200 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2">Columns</Typography>
          <Tooltip title="Reset to default">
            <IconButton size="small" onClick={onReset}>
              <RestartAltIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ mb: 1 }} />

        {orderedColumns.map((field, idx) => {
          const colDef = allColumns.find((c) => c.field === field);
          if (!colDef) return null;

          const isPinned = !!colDef.pinned;
          const isChecked = !hiddenColumns.has(field);

          // Move arrow constraints: can't move into pinned zones
          const prevDef = idx > 0
            ? allColumns.find((c) => c.field === orderedColumns[idx - 1])
            : null;
          const nextDef = idx < orderedColumns.length - 1
            ? allColumns.find((c) => c.field === orderedColumns[idx + 1])
            : null;

          return (
            <Box key={field} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    disabled={colDef.alwaysVisible}
                    onChange={(e) => onToggle(field, e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={hiddenColumns.has(field) ? { color: 'text.disabled' } : undefined}
                  >
                    {colDef.label}
                  </Typography>
                }
                sx={{ flex: 1, m: 0 }}
              />
              {isPinned ? (
                <Box sx={{ width: 64 }} /> /* spacer matching arrow buttons width */
              ) : (
                <>
                  <IconButton
                    size="small"
                    onClick={() => onMove(field, 'up')}
                    disabled={idx === 0 || !!prevDef?.pinned}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onMove(field, 'down')}
                    disabled={idx === orderedColumns.length - 1 || !!nextDef?.pinned}
                  >
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          );
        })}
      </Box>
    </Popover>
  );
}

const ColumnPickerPopover = React.memo(
  ColumnPickerPopoverInner,
) as typeof ColumnPickerPopoverInner;

export default ColumnPickerPopover;

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

// ============================================================================
// Configure Page Styles — Single Source of Truth
// ============================================================================
//
// Shared layout constants for all Configure pages (ConfigurePayload,
// ConfigureCollector, future ConfigureElement). These pages share a common
// structure: page header with Back/Delete, accordion sections with
// icon+title headers and right-side controls, chips row, two-column
// info layout, and profile settings sub-accordions with 2-column field grids.
//
// NOTE: Constants are typed as plain objects (no SxProps<Theme> annotation)
// to avoid cross-package Theme type incompatibility. They are structurally
// compatible with SxProps when consumed.
// ============================================================================

/** Page header row: title left, Back/Delete buttons right. Responsive column on xs. */
export const CONFIGURE_PAGE_HEADER_SX = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'stretch', sm: 'center' },
  mb: 2,
  gap: 2,
} as const;

/** Chips/info row inside the Configure accordion. Flex wrap with gap. */
export const CONFIGURE_CHIPS_ROW_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
  flexWrap: 'wrap',
} as const;

/** Two-column flex wrap for Configuration + Protocol Info side-by-side. */
export const CONFIGURE_TWO_COLUMN_SX = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 3,
  mb: 2,
} as const;

/** Individual column inside the two-column layout. Flex-grows with 300px basis. */
export const CONFIGURE_COLUMN_SX = {
  flex: '1 1 300px',
  minWidth: '280px',
} as const;

/**
 * 2-column CSS grid for profile settings field groups.
 * Gap varies by edit mode: 2 (16px) for edit controls, 0.5 (4px) for read-only.
 */
export const getFieldGridSx = (editMode: boolean) => ({
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
  gap: editMode ? 2 : 0.5,
}) as const;

/** Full-width spanning for fields that need the entire grid row (json, checkboxGroup, slider). */
export const CONFIGURE_FIELD_FULL_WIDTH_SX = {
  gridColumn: '1 / -1',
} as const;

/** Preview message type code block. Dark background with monospace font. */
export const CONFIGURE_PREVIEW_CODE_SX = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  margin: 0,
  p: 2,
  bgcolor: 'grey.900',
  color: 'grey.100',
  borderRadius: 1,
  fontFamily: 'monospace',
  fontSize: 12,
  minHeight: 100,
  maxHeight: 500,
  overflow: 'auto',
} as const;

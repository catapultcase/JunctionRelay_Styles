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
// Tab Layout Styles — Single Source of Truth
// ============================================================================
//
// ALL management tabs (LocalTab, AssetsTab, CollectorPluginsTab,
// ElementPluginsTab, ServerTab, CloudTab) import from this file.
// Never hardcode tab-level layout values (container padding, search bar
// wrappers, accordion detail padding, table header rows) in tab files.
//
// NOTE: Constants are typed as plain objects (no SxProps<Theme> annotation)
// to avoid cross-package Theme type incompatibility. They are structurally
// compatible with SxProps when consumed.
// ============================================================================

/** Outer container for all management tabs. padding: 2, no flex/gap. */
export const TAB_CONTAINER_SX = { padding: 2 } as const;

/** Search bar wrapper. Flex row with gap, mb for sibling spacing. Wraps on narrow viewports. */
export const SEARCH_BAR_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
  flexWrap: 'wrap',
} as const;

/** Table header row background. */
export const TABLE_HEADER_ROW_SX = { bgcolor: 'action.hover' } as const;

/** AccordionDetails padding based on view mode. Tables bleed edge-to-edge (p:0), cards get p:2. */
export const getAccordionDetailsSx = (viewMode: string) => ({
  p: viewMode === 'table' ? 0 : 2,
});

/** Data table accordion summary — pr:2 for right-side controls. */
export const ACCORDION_SUMMARY_SX = { pr: 2 } as const;

/** Inner Box for data table accordion headers — flex space-between with pr:2. */
export const ACCORDION_HEADER_BOX_SX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  pr: 2,
} as const;

/** Right-side controls group inside accordion headers. */
export const ACCORDION_CONTROLS_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
} as const;

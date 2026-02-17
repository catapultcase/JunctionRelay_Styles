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
// Plugin & Category Styles — Single Source of Truth
// ============================================================================
//
// CATEGORY_CHIP_COLORS maps plugin/collector categories to MUI Chip color props.
// Import from @junctionrelay/styles instead of defining inline.
// ============================================================================

/** Collector category → MUI Chip color mapping. */
export const CATEGORY_CHIP_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'> = {
  'System Monitoring': 'primary',
  'Cloud Services': 'info',
  'Home & IoT': 'success',
  'Media & Calendars': 'secondary',
  'System & Testing': 'warning',
  'Protocol': 'primary',
  'Data': 'info',
};

/** Card thumbnail height per view mode. */
export const THUMBNAIL_HEIGHTS = { standard: 153, mini: 108 };

/**
 * JunctionRelay Styles
 * Copyright (C) 2024-present Jonathan Mills, CatapultCase
 * All rights reserved.
 *
 * CLOSED SOURCE - DO NOT MODIFY
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

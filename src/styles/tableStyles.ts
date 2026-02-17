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
// Table Cell Styles — Single Source of Truth
// ============================================================================

/** Standard table cell padding and no-wrap. */
export const TABLE_CELL_SX = { whiteSpace: 'nowrap' as const, padding: '8px 16px' };

/** Table header cell with bold font weight. */
export const TABLE_HEADER_CELL_SX = { whiteSpace: 'nowrap' as const, padding: '8px 16px', fontWeight: 600 };

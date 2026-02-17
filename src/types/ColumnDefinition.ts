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

export interface ColumnDefinition<T extends string = string> {
  field: T;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  minWidth?: number | string;
  /** If true, column cannot be hidden via the column picker */
  alwaysVisible?: boolean;
  /** If set, column is pinned to this position and cannot be reordered.
   * 'start' = always first, 'end' = always last. */
  pinned?: 'start' | 'end';
  /** If true, column is hidden by default (user can show it via column picker) */
  defaultHidden?: boolean;
}

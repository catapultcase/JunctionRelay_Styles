/**
 * JunctionRelay Styles
 * Copyright (C) 2024-present Jonathan Mills, CatapultCase
 * All rights reserved.
 *
 * CLOSED SOURCE - DO NOT MODIFY
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

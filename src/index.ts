/**
 * JunctionRelay Styles
 * Copyright (C) 2024-present Jonathan Mills, CatapultCase
 * All rights reserved.
 *
 * CLOSED SOURCE - DO NOT MODIFY
 */

// ============================================================================
// @junctionrelay/styles — Barrel Export
// ============================================================================

// Card styles
export {
  CARD_STYLES,
  getCardBaseSx,
  getCardContentSx,
  getIconButtonSx,
} from './styles/cardStyles';
export type { CardViewMode } from './styles/cardStyles';

// Tab styles
export {
  TAB_CONTAINER_SX,
  SEARCH_BAR_SX,
  TABLE_HEADER_ROW_SX,
  getAccordionDetailsSx,
  ACCORDION_SUMMARY_SX,
  ACCORDION_HEADER_BOX_SX,
  ACCORDION_CONTROLS_SX,
} from './styles/tabStyles';

// Modal styles
export {
  MODAL_SHELL_SX,
  MODAL_HEADER_SX,
  MODAL_TITLE_SX,
  MODAL_LOADING_SX,
  MODAL_CONTENT_SX,
  MODAL_LEFT_PANEL_SX,
  MODAL_GROUP_HEADER_SX,
  MODAL_LIST_ITEM_SX,
  MODAL_LIST_ITEM_ICON_SX,
  MODAL_LIST_ITEM_EMOJI_SX,
  MODAL_RIGHT_PANEL_SX,
  MODAL_FORM_AREA_SX,
  MODAL_MOBILE_DROPDOWN_SX,
  MODAL_MOBILE_GROUP_HEADER_SX,
  MODAL_TYPE_DESCRIPTION_SX,
  MODAL_INSTRUCTIONS_PANEL_SX,
  MODAL_INSTRUCTIONS_TOGGLE_SX,
  MODAL_INSTRUCTIONS_CONTENT_SX,
  MODAL_ACTIONS_SX,
} from './styles/modalStyles';

// Table styles
export {
  TABLE_CELL_SX,
  TABLE_HEADER_CELL_SX,
} from './styles/tableStyles';

// Plugin styles
export {
  CATEGORY_CHIP_COLORS,
  THUMBNAIL_HEIGHTS,
} from './styles/pluginStyles';

// Types
export type { ColumnDefinition } from './types/ColumnDefinition';

// Hooks
export { useColumnVisibility } from './hooks/useColumnVisibility';
export type { UseColumnVisibilityReturn } from './hooks/useColumnVisibility';

// Components
export { default as ColumnPickerPopover } from './components/ColumnPickerPopover';

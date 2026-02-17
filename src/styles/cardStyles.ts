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
// Card View Mode Styles — Single Source of Truth
// ============================================================================
//
// ALL card components (LocalCard, AssetCard, DownloadedLayoutCard, ServerCard,
// CloudCard) import from this file. Never hardcode view-mode-dependent values
// (dimensions, padding, title styles, chip sizes, button gaps) in card files.
// ============================================================================

export type CardViewMode = 'standard' | 'mini';

/**
 * View-mode-dependent card styling tokens.
 *
 * Usage:
 *   const cfg = CARD_STYLES[viewMode];
 *   <Typography variant={cfg.title.variant} sx={cfg.title.sx}>
 *   <Chip sx={{ height: cfg.chip.height, fontSize: cfg.chip.fontSize }}>
 */
export const CARD_STYLES = {
  standard: {
    card: { width: '272px', height: '370px' },
    content: { pt: 1, pb: 1, px: 1 },
    title: {
      variant: 'h6' as const,
      sx: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.3,
        mb: 0.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      },
    },
    titleMb: 1,
    descriptionSlot: { mb: 1, minHeight: 40 } as const,
    descriptionText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
      fontSize: '0.85rem',
    },
    chip: { height: 24, fontSize: '0.7rem' },
    chipGap: 1,
    buttonGap: 1,
    iconButton: { padding: '5px', iconSize: '1.25rem' },
    actionButton: { px: 2, fontSize: '0.8125rem' },
    showDescription: true,
  },
  mini: {
    card: { width: '192px', height: '270px' },
    content: { pt: 1, pb: 1, px: 1 },
    title: {
      variant: 'subtitle2' as const,
      sx: {
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
      },
    },
    titleMb: 0.5,
    descriptionSlot: null,
    descriptionText: null,
    chip: { height: 18, fontSize: '0.65rem' },
    chipGap: 0.5,
    buttonGap: 0.75,
    iconButton: { padding: '3px', iconSize: '1rem' },
    actionButton: { px: 1, fontSize: '0.7rem' },
    showDescription: false,
  },
} as const;

/**
 * Base Card sx shared by ALL card types.
 * Spread into Card sx and add card-specific overrides (cursor, borderColor, etc.).
 *
 * Usage:
 *   <Card variant="outlined" sx={{ ...getCardBaseSx(viewMode), cursor: 'pointer' }}>
 */
export const getCardBaseSx = (mode: CardViewMode) => ({
  display: 'flex',
  flexDirection: 'column' as const,
  position: 'relative' as const,
  width: CARD_STYLES[mode].card.width,
  height: CARD_STYLES[mode].card.height,
  border: '2px solid',
  borderColor: 'divider',
  transition: 'all 0.2s ease-in-out',
  overflow: 'hidden' as const,
  '&:hover': {
    boxShadow: 6,
    transform: 'translateY(-4px)',
  },
});

/**
 * Base CardContent sx shared by ALL card types.
 *
 * Usage:
 *   <CardContent sx={getCardContentSx(viewMode)}>
 */
export const getCardContentSx = (mode: CardViewMode) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
  ...CARD_STYLES[mode].content,
  '&:last-child': { pb: CARD_STYLES[mode].content.pb },
});

/**
 * Bordered icon button sx for a given MUI palette color.
 * Includes disabled state styling (safe to include on all buttons — only applies when disabled).
 * Pass mode to get compact-appropriate padding.
 *
 * Usage:
 *   <IconButton size="small" sx={getIconButtonSx('primary', viewMode)}>
 *   <IconButton size="small" disabled={isInUse} sx={getIconButtonSx('error', viewMode)}>
 */
export const getIconButtonSx = (color: string, mode: CardViewMode = 'standard') => ({
  padding: CARD_STYLES[mode].iconButton.padding,
  color: `${color}.main`,
  border: '1px solid',
  borderColor: `${color}.main`,
  '&:hover': {
    backgroundColor: `${color}.main`,
    color: `${color}.contrastText`,
  },
  '&.Mui-disabled': {
    borderColor: 'action.disabled',
    color: 'action.disabled',
  },
});

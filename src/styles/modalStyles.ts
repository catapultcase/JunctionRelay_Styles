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
// Configuration Modal Styles — Single Source of Truth
// ============================================================================
//
// ALL configuration modals (Collector, Payload, Junction) import from this file.
// Never hardcode modal shell, header, panel, or action button styles in
// individual modal files — import from here and spread/extend as needed.
//
// Companion: ui-style-guide.md § Configuration Modals
// ============================================================================

/**
 * Outer modal shell — the centered Box inside <Modal>.
 *
 * Usage:
 *   <Modal open={open} onClose={onClose}>
 *     <Box sx={MODAL_SHELL_SX}>
 */
export const MODAL_SHELL_SX = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 'auto', sm: '90%', md: '80%' },
    maxWidth: { xs: '95vw', md: 900 },
    minWidth: { xs: 320, sm: 400 },
    height: 'auto',
    minHeight: { xs: 320, md: 450 },
    maxHeight: { xs: '90vh', md: '85vh' },
    bgcolor: 'background.paper',
    p: 0,
    boxShadow: 24,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
};

/**
 * Modal header — title + subtitle above the divider.
 *
 * Usage:
 *   <Box sx={MODAL_HEADER_SX}>
 *     <Typography variant="h6" sx={MODAL_TITLE_SX}>Title</Typography>
 *     <Typography variant="caption" color="text.secondary">Subtitle</Typography>
 *   </Box>
 */
export const MODAL_HEADER_SX = {
    p: { xs: 2, md: 3 },
    pb: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
};

/**
 * Modal title typography sx.
 */
export const MODAL_TITLE_SX = {
    fontSize: { xs: '1.1rem', md: '1.25rem' },
};

/**
 * Loading spinner container — centered, flex: 1.
 *
 * Usage:
 *   <Box sx={MODAL_LOADING_SX}><CircularProgress size={40} /></Box>
 */
export const MODAL_LOADING_SX = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    py: 8,
};

/**
 * Two-panel content container — wraps left panel + right panel.
 *
 * Usage:
 *   <Box sx={MODAL_CONTENT_SX}>
 *     <Paper sx={MODAL_LEFT_PANEL_SX}>...</Paper>
 *     <Box sx={MODAL_RIGHT_PANEL_SX}>...</Box>
 *   </Box>
 */
export const MODAL_CONTENT_SX = {
    display: 'flex',
    flexDirection: { xs: 'column' as const, md: 'row' as const },
    flex: 1,
    overflow: 'hidden' as const,
    minHeight: 0,
};

/**
 * Left panel — type selection list, desktop only (240px).
 *
 * Usage:
 *   <Paper variant="outlined" sx={MODAL_LEFT_PANEL_SX}>
 *     <List dense disablePadding>...</List>
 *   </Paper>
 */
export const MODAL_LEFT_PANEL_SX = {
    width: { md: 240 },
    flexShrink: 0,
    borderRadius: 0,
    border: 0,
    borderRight: { md: '1px solid' },
    borderColor: 'divider',
    overflowY: 'auto' as const,
    display: { xs: 'none', md: 'block' },
};

/**
 * Left panel group header typography sx.
 *
 * Usage:
 *   <Typography variant="caption" sx={MODAL_GROUP_HEADER_SX}>{group.name}</Typography>
 */
export const MODAL_GROUP_HEADER_SX = {
    display: 'block',
    px: 2,
    pt: 1.5,
    pb: 0.5,
    fontWeight: 'bold',
    color: 'text.secondary',
    textTransform: 'uppercase' as const,
    fontSize: '0.65rem',
    letterSpacing: '0.05em',
};

/**
 * Left panel list item selected state sx.
 * Spread into ListItemButton sx.
 *
 * Usage:
 *   <ListItemButton sx={MODAL_LIST_ITEM_SX}>
 */
export const MODAL_LIST_ITEM_SX = {
    py: 0.75,
    '&.Mui-selected': {
        backgroundColor: 'action.selected',
        borderLeft: '3px solid',
        borderLeftColor: 'primary.main',
    },
    '&.Mui-selected:hover': {
        backgroundColor: 'action.selected',
    },
};

/**
 * Left panel list item icon sx.
 */
export const MODAL_LIST_ITEM_ICON_SX = {
    minWidth: 32,
};

/**
 * Left panel list item emoji typography sx.
 */
export const MODAL_LIST_ITEM_EMOJI_SX = {
    fontSize: '1rem',
};

/**
 * Right panel — flex column for form area + optional instructions + actions.
 *
 * Usage:
 *   Box sx={MODAL_RIGHT_PANEL_SX}
 *     Box sx={MODAL_FORM_AREA_SX} (scrollable form)
 *     Optional: instructions panel
 *     Box sx={MODAL_ACTIONS_SX} (action buttons)
 */
export const MODAL_RIGHT_PANEL_SX = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
    order: { xs: 1, md: 2 },
};

/**
 * Scrollable form area inside the right panel.
 *
 * Usage:
 *   Box sx={MODAL_FORM_AREA_SX}
 *     Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
 *       (form fields)
 *     /Box
 *   /Box
 */
export const MODAL_FORM_AREA_SX = {
    p: { xs: 2, md: 3 },
    overflowY: 'auto' as const,
    flex: 1,
};

/**
 * Mobile-only type dropdown container.
 * Hides on md+ where the left panel is visible.
 *
 * Usage:
 *   <Box sx={MODAL_MOBILE_DROPDOWN_SX}><FormControl ...>...</FormControl></Box>
 */
export const MODAL_MOBILE_DROPDOWN_SX = {
    display: { xs: 'block', md: 'none' },
};

/**
 * Mobile dropdown group header MenuItem sx.
 */
export const MODAL_MOBILE_GROUP_HEADER_SX = {
    opacity: 1,
    fontWeight: 'bold',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
};

/**
 * Type description alert sx.
 */
export const MODAL_TYPE_DESCRIPTION_SX = {
    py: 0.5,
};

/**
 * Collapsible instructions panel wrapper (desktop only).
 * Used by Junction and Collector modals (not Payload).
 *
 * Usage:
 *   <Paper variant="outlined" sx={MODAL_INSTRUCTIONS_PANEL_SX}>...</Paper>
 */
export const MODAL_INSTRUCTIONS_PANEL_SX = {
    display: { xs: 'none', md: 'block' },
    borderRadius: 0,
    border: 0,
    borderTop: '1px solid',
    borderColor: 'divider',
};

/**
 * Instructions panel toggle header sx.
 */
export const MODAL_INSTRUCTIONS_TOGGLE_SX = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 2,
    py: 1,
    cursor: 'pointer',
    '&:hover': { bgcolor: 'action.hover' },
};

/**
 * Instructions panel content area sx (inside Collapse).
 */
export const MODAL_INSTRUCTIONS_CONTENT_SX = {
    maxHeight: '200px',
    p: 2,
    overflowY: 'auto' as const,
    bgcolor: 'action.hover',
};

/**
 * Action buttons bar — right-aligned, responsive column/row.
 * Sits at the bottom of the right panel.
 *
 * Usage:
 *   <Box sx={MODAL_ACTIONS_SX}>
 *     <Button sx={{ order: { xs: 3, sm: 1 } }}>Cancel</Button>
 *     <Button sx={{ order: { xs: 2, sm: 2 } }}>Primary</Button>
 *     <Button sx={{ order: { xs: 1, sm: 3 } }}>Secondary</Button>
 *   </Box>
 */
export const MODAL_ACTIONS_SX = {
    p: { xs: 2, md: 3 },
    borderTop: '1px solid',
    borderColor: 'divider',
    display: 'flex',
    flexDirection: { xs: 'column' as const, sm: 'row' as const },
    gap: { xs: 1, sm: 2 },
    flexShrink: 0,
    justifyContent: 'flex-end',
};

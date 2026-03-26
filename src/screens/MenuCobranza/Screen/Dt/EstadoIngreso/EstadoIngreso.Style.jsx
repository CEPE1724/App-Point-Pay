import { StyleSheet } from 'react-native';

const C = {
  bg: '#F0F4F8',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  accent: '#0f766e',
  accentLight: '#CCFBF1',
  navy: '#1E3A5F',
  navyDark: '#0f172a',
  selected: '#FFF7ED',
  selectedBorder: '#F97316',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  red: '#DC2626',
  green: '#16A34A',
  amber: '#D97706',
  headerRow: '#1E3A5F',
  headerText: '#FFFFFF',
  rowAlt: '#F8FAFC',
  colW: 120,
  colWide: 160,
};

export const styles = StyleSheet.create({
  // ─── Layout ──────────────────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // ─── Header ──────────────────────────────────────────
  pageHeader: {
    backgroundColor: C.navyDark,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pageHeaderTitle: {
    color: C.headerText,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
    flex: 1,
  },
  pageHeaderSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ─── Offline banner ──────────────────────────────────
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  offlineBannerText: {
    color: '#FEE2E2',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },

  // ─── Search bar ──────────────────────────────────────
  searchBar: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    margin: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: C.textPrimary,
  },
  clearBtn: {
    padding: 4,
  },
  searchBtn: {
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginLeft: 6,
  },
  searchBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },

  // ─── Count badge ─────────────────────────────────────
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 6,
  },
  countBadge: {
    backgroundColor: '#FEE2E2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  countText: {
    color: C.red,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  countBadgeSuccess: {
    backgroundColor: '#DCFCE7',
  },
  countTextSuccess: {
    color: C.green,
  },
  countLabel: {
    color: C.textSecondary,
    fontSize: 12,
  },

  // ─── Section title ────────────────────────────────────
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },

  // ─── Master table ─────────────────────────────────────
  tableWrapper: {
    marginHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
    backgroundColor: C.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: C.headerRow,
    paddingVertical: 11,
  },
  tableHeaderCell: {
    color: C.headerText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: C.border,
    alignItems: 'center',
  },
  tableRowAlt: {
    backgroundColor: C.rowAlt,
  },
  tableRowSelected: {
    backgroundColor: C.selected,
    borderLeftWidth: 3,
    borderLeftColor: C.selectedBorder,
  },
  tableCell: {
    fontSize: 12,
    color: C.textPrimary,
    paddingHorizontal: 10,
  },
  tableCellMuted: {
    color: C.textSecondary,
  },

  // ─── Status pill ─────────────────────────────────────
  statusPill: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─── Column widths ────────────────────────────────────
  colEstado: { width: 100 },
  colOrigen: { width: 90 },
  colCliente: { width: 150 },
  colFecha: { width: 100 },
  colRuc: { width: 120 },
  colNombre: { width: 160 },
  colTecnico: { width: 130 },
  colCodigo: { width: 110 },
  colDetalle: { width: 260 },
  colSerial: { width: 180 },
  colDano: { width: 200 },

  // ─── Detail panel ─────────────────────────────────────
  detailContainer: {
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.selectedBorder,
    overflow: 'hidden',
    backgroundColor: C.surface,
    shadowColor: C.selectedBorder,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  detailHeader: {
    backgroundColor: C.selectedBorder,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailHeaderTitle: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
    flex: 1,
  },
  detailHeaderSub: {
    color: '#FFF',
    fontSize: 11,
    opacity: 0.85,
  },
  detailTableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#FDBA74',
  },
  detailTableHeaderCell: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#FEF3C7',
    alignItems: 'center',
  },
  detailRowAlt: {
    backgroundColor: '#FFFBEB',
  },
  detailCell: {
    fontSize: 12,
    color: C.textPrimary,
    paddingHorizontal: 10,
  },

  // ─── Detail column widths ─────────────────────────────
  dColFecha: { width: 100 },
  dColBodega: { width: 110 },
  dColEstado: { width: 120 },
  dColResponsable: { width: 130 },
  dColNotas: { width: 180 },

  // ─── Empty / placeholder ─────────────────────────────
  emptyDetail: {
    paddingVertical: 28,
    alignItems: 'center',
    gap: 6,
  },
  emptyDetailText: {
    color: C.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
  },
  emptyDetailSub: {
    color: C.textMuted,
    fontSize: 11,
  },

  // ─── Movement modal ────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: C.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 14,
    paddingBottom: 24,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalHeader: {
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 3,
  },
  modalTitle: {
    color: C.navyDark,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  modalSubtitle: {
    color: C.textSecondary,
    fontSize: 12,
  },
  modalList: {
    paddingHorizontal: 12,
  },
  modalCloseBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: C.accent,
    borderRadius: 12,
    paddingVertical: 12,
  },
  modalCloseBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  movementCard: {
    backgroundColor: C.rowAlt,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: C.accent,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  movementCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  movementCardFecha: {
    fontSize: 13,
    fontWeight: '700',
    color: C.accent,
  },
  movementCardBadge: {
    backgroundColor: C.accentLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  movementCardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  movementCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  movementCardLabel: {
    fontSize: 10,
    color: C.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    flex: 1,
  },
  movementCardValue: {
    fontSize: 11,
    color: C.textPrimary,
    fontWeight: '600',
    flex: 1.2,
    textAlign: 'right',
  },
  movementCardNotes: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  movementCardNotesLabel: {
    fontSize: 10,
    color: C.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  movementCardNotesText: {
    fontSize: 12,
    color: C.textPrimary,
    lineHeight: 18,
  },
  detailHeaderSearchBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export { C };

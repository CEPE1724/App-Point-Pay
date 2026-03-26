import { StyleSheet } from "react-native";

// ── Design tokens ──────────────────────────────────────────────
const C = {
  surface:       '#FFFFFF',
  surfaceAlt:    '#F8FAFC',
  primary:       '#0F172A',
  accent:        '#0F766E',
  border:        '#E5E7EB',
  shadow:        '#0F172A',
  textPrimary:   '#111827',
  textSecondary: '#6B7280',
  textMuted:     '#9CA3AF',
  white:         '#FFFFFF',
  iconPrimary:   '#374151',
  iconSecondary: '#6B7280',
  // buttons
  green:         '#2E7D32',
  blue:          '#1565C0',
  amber:         '#B45309',
  violet:        '#6D28D9',
  orange:        '#C2410C',
  teal:          '#0E7490',
};

export const styles = StyleSheet.create({
  // ── Card ───────────────────────────────────────────────────
  card: {
    backgroundColor: C.surface,
    borderRadius: 20,
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: C.border,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  customerBlock: {
    flex: 1,
    paddingRight: 12,
  },
  customerLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: C.accent,
    marginBottom: 6,
  },
  customerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: C.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  customerName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: C.primary,
    lineHeight: 22,
  },
  statusBadge: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // ── Info rows ──────────────────────────────────────────────
  infoSection: {
    backgroundColor: C.surfaceAlt,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowIcon: {
    width: 30,
    marginRight: 8,
    marginTop: 1,
  },
  metaContent: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: C.textPrimary,
    fontWeight: '600',
    lineHeight: 19,
  },
  textCell: {
    fontSize: 13,
    color: C.textSecondary,
    lineHeight: 18,
  },

  // ── Divider ────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 14,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: C.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 10,
  },

  // ── Action buttons ─────────────────────────────────────────
  actionsSection: {
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 14,
    gap: 8,
  },
  btnFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    gap: 8,
  },
  btnAmortizacion: { backgroundColor: C.green  },
  btnCelular:      { backgroundColor: C.blue   },
  btnGestiones:    { backgroundColor: C.amber  },
  btnReferencias:  { backgroundColor: C.violet },
  btnProductos:    { backgroundColor: C.orange },
  btnDetalles:     { backgroundColor: C.teal   },
  btnLabel: {
    color: C.white,
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Footer values ──────────────────────────────────────────
  summarySection: {
    marginTop: 16,
    backgroundColor: C.surfaceAlt,
    borderRadius: 16,
    padding: 14,
  },
  rowProyect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  labelProyect: {
    fontSize: 11,
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  textProyect: {
    fontSize: 16,
    fontWeight: '700',
    color: C.textPrimary,
  },
  metricValueRight: {
    textAlign: 'right',
  },
});

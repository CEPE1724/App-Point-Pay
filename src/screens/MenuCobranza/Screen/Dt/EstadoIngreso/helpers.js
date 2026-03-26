// Convierte color BGR Windows ("0x00BBGGRR") a string RGB "#RRGGBB"
export function bgrToRgb(bgrHex) {
  if (!bgrHex) return '#E2E8F0';
  const clean = bgrHex.replace(/^0x/i, '').padStart(8, '0');
  const rr = clean.slice(6, 8);
  const gg = clean.slice(4, 6);
  const bb = clean.slice(2, 4);
  return `#${rr}${gg}${bb}`;
}

// Retorna color de texto oscuro o blanco según luminancia del fondo
export function getContrastText(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1E3A5F' : '#FFFFFF';
}

export function formatFecha(isoDate) {
  if (!isoDate) return '—';
  const d = new Date(isoDate);
  const dd = d.getUTCDate().toString().padStart(2, '0');
  const mm = (d.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${dd}/${mm}/${d.getUTCFullYear()}`;
}

export function formatHora(isoDate) {
  if (!isoDate) return '—';
  const d = new Date(isoDate);
  return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
}

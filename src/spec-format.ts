/** Format scalar vehicle specifications for Persian interfaces. */
const integer = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 });

const UNIT_LABELS: Record<string, string> = {
  hp: 'اسب بخار', kw: 'کیلووات', kwh: 'کیلووات‌ساعت', km: 'کیلومتر',
  km_h: 'کیلومتر بر ساعت', sec: 'ثانیه', cc: 'سی‌سی', nm: 'نیوتن‌متر',
  mm: 'میلی‌متر', kg: 'کیلوگرم', l: 'لیتر', l_100km: 'لیتر بر ۱۰۰ کیلومتر',
  kwh_100km: 'کیلووات‌ساعت بر ۱۰۰ کیلومتر', min: 'دقیقه', in: 'اینچ', deg: 'درجه',
};
const INTEGER_FORMATS = new Set(['hp', 'km', 'km_h', 'cc', 'nm', 'mm', 'kg', 'min', 'count']);
const TEXT_LABELS: Record<string, string> = {
  BEV: 'برقی', PHEV: 'پلاگین هیبرید', HEV: 'هیبریدی', MHEV: 'هیبرید خفیف',
  ICE: 'درون‌سوز', GASOLINE: 'بنزین', PETROL: 'بنزین', DIESEL: 'دیزل',
  HYBRID: 'هیبریدی', ELECTRIC: 'برقی', PLUGIN_HYBRID: 'پلاگین هیبرید',
  AWD: 'چهار چرخ متحرک', FWD: 'محور جلو', RWD: 'محور عقب', '4WD': 'چهار چرخ متحرک',
  AUTOMATIC: 'اتوماتیک', MANUAL: 'دستی', CVT: 'پیوسته متغیر (CVT)', DCT: 'دو کلاچه',
  'TWIN TURBO': 'توربو دوقلو', TURBO: 'توربو', TURBOCHARGED: 'توربو',
  NATURALLY_ASPIRATED: 'تنفس طبیعی', SUPERCHARGED: 'سوپرشارژ',
  TRUE: 'بله', YES: 'بله', FALSE: 'خیر', NO: 'خیر',
};

function normalizeTextValue(text: string | null | undefined): string | null {
  if (typeof text !== 'string' || !text.trim()) return null;
  const trimmed = text.trim();
  const key = trimmed.toUpperCase();
  return Object.hasOwn(TEXT_LABELS, key) ? TEXT_LABELS[key] : trimmed;
}

/** Boolean takes precedence, then text mode, then a finite number, then text.
 * Missing/non-finite values return null. Text values never receive another unit.
 * Values are displayed as supplied; this function does not convert units.
 */
export function formatSpecValue(
  valueNumber: number | null | undefined,
  valueText: string | null | undefined,
  valueBoolean: boolean | null | undefined,
  unitCode: string | null | undefined,
  formatter?: string,
): string | null {
  if (typeof valueBoolean === 'boolean') return valueBoolean ? 'بله' : 'خیر';
  const text = normalizeTextValue(valueText);
  const hasNumber = typeof valueNumber === 'number' && Number.isFinite(valueNumber);
  if (text !== null && (!hasNumber || formatter === 'text')) return text;
  if (!hasNumber) return text;
  const mode = formatter && formatter !== 'text' ? formatter : unitCode?.trim();
  const value = INTEGER_FORMATS.has(mode ?? '')
    ? integer.format(Math.round(valueNumber as number))
    : decimal.format(valueNumber as number);
  if (mode === 'count') return value;
  const knownUnit = mode && Object.hasOwn(UNIT_LABELS, mode) ? UNIT_LABELS[mode] : null;
  const unit = knownUnit ?? unitCode?.trim();
  return unit ? `${value} ${unit}` : value;
}

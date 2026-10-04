// Persian vehicle specification labels and presentation metadata.
import type { PowertrainCode } from './types.js';

export interface SpecPresentation {
  section: string;
  section_label_fa: string;
  section_order: number;
  label_fa: string;
  unit_fa: string;
  priority: number;
  powertrain_applicability: PowertrainCode[] | 'ALL';
  formatter?: 'hp' | 'kw' | 'kwh' | 'km' | 'km_h' | 'sec' | 'cc' | 'nm' | 'mm' | 'kg' | 'l' | 'l_100km' | 'kwh_100km' | 'min' | 'in' | 'deg' | 'count' | 'text';
}

// Section definitions in display order
export const SECTIONS = {
  PERFORMANCE: { code: 'PERFORMANCE', label_fa: 'عملکرد', order: 0 },
  POWERTRAIN: { code: 'POWERTRAIN', label_fa: 'پیشرانه', order: 10 },
  ENGINE: { code: 'ENGINE', label_fa: 'موتور', order: 20 },
  ELECTRIC_MOTOR: { code: 'ELECTRIC_MOTOR', label_fa: 'موتور برقی', order: 30 },
  BATTERY: { code: 'BATTERY', label_fa: 'باتری', order: 40 },
  CHARGING: { code: 'CHARGING', label_fa: 'شارژ', order: 50 },
  RANGE: { code: 'RANGE', label_fa: 'برد و مصرف', order: 60 },
  TRANSMISSION: { code: 'TRANSMISSION', label_fa: 'گیربکس و محرک', order: 70 },
  DIMENSIONS: { code: 'DIMENSIONS', label_fa: 'ابعاد', order: 80 },
  WEIGHT: { code: 'WEIGHT', label_fa: 'وزن و ظرفیت', order: 90 },
  WHEELS: { code: 'WHEELS_TIRES', label_fa: 'چرخ و لاستیک', order: 100 },
  SUSPENSION: { code: 'SUSPENSION', label_fa: 'تعلیق و ترمز', order: 110 },
  FEATURES: { code: 'FEATURES', label_fa: 'امکانات شاخص', order: 120 },
} as const;

// Spec code → presentation mapping
// Unknown spec codes retain the caller's labels, section and priority.
const SPEC_MAP: Record<string, SpecPresentation> = {
  // PERFORMANCE
  acceleration_0_100_sec: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'شتاب ۰ تا ۱۰۰', unit_fa: 'ثانیه', priority: 0, powertrain_applicability: 'ALL', formatter: 'sec' },
  top_speed_km_h: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'سرعت نهایی', unit_fa: 'کیلومتر بر ساعت', priority: 10, powertrain_applicability: 'ALL', formatter: 'km_h' },
  engine_power_hp: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'قدرت موتور', unit_fa: 'اسب بخار', priority: 20, powertrain_applicability: 'ALL', formatter: 'hp' },
  combined_system_power_hp: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'قدرت ترکیبی', unit_fa: 'اسب بخار', priority: 5, powertrain_applicability: ['PHEV', 'HEV'], formatter: 'hp' },
  electric_motor_power_hp: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'قدرت موتور برقی', unit_fa: 'اسب بخار', priority: 25, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'hp' },
  engine_torque_nm: { section: 'PERFORMANCE', section_label_fa: 'عملکرد', section_order: 0, label_fa: 'گشتاور موتور', unit_fa: 'نیوتن‌متر', priority: 30, powertrain_applicability: 'ALL', formatter: 'nm' },

  // POWERTRAIN
  powertrain_type: { section: 'POWERTRAIN', section_label_fa: 'پیشرانه', section_order: 10, label_fa: 'نوع پیشرانه', unit_fa: '', priority: 0, powertrain_applicability: 'ALL', formatter: 'text' },
  fuel_type: { section: 'POWERTRAIN', section_label_fa: 'پیشرانه', section_order: 10, label_fa: 'نوع سوخت', unit_fa: '', priority: 10, powertrain_applicability: 'ALL', formatter: 'text' },
  drivetrain: { section: 'POWERTRAIN', section_label_fa: 'پیشرانه', section_order: 10, label_fa: 'محرک', unit_fa: '', priority: 20, powertrain_applicability: 'ALL', formatter: 'text' },
  hybrid_type: { section: 'POWERTRAIN', section_label_fa: 'پیشرانه', section_order: 10, label_fa: 'نوع هیبرید', unit_fa: '', priority: 30, powertrain_applicability: ['HEV', 'MHEV', 'PHEV'], formatter: 'text' },

  // ENGINE
  engine_displacement_cc: { section: 'ENGINE', section_label_fa: 'موتور', section_order: 20, label_fa: 'حجم موتور', unit_fa: 'سی‌سی', priority: 0, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'cc' },
  cylinder_count: { section: 'ENGINE', section_label_fa: 'موتور', section_order: 20, label_fa: 'تعداد سیلندر', unit_fa: 'سیلندر', priority: 10, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'count' },
  engine_layout: { section: 'ENGINE', section_label_fa: 'موتور', section_order: 20, label_fa: 'آرایش موتور', unit_fa: '', priority: 20, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'text' },
  aspiration_type: { section: 'ENGINE', section_label_fa: 'موتور', section_order: 20, label_fa: 'توربو/تنفس طبیعی', unit_fa: '', priority: 30, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'text' },
  engine_power_kw: { section: 'ENGINE', section_label_fa: 'موتور', section_order: 20, label_fa: 'قدرت موتور (کیلووات)', unit_fa: 'کیلووات', priority: 40, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'kw' },

  // ELECTRIC MOTOR
  electric_motor_power_kw: { section: 'ELECTRIC_MOTOR', section_label_fa: 'موتور برقی', section_order: 30, label_fa: 'قدرت موتور برقی', unit_fa: 'کیلووات', priority: 0, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'kw' },
  electric_motor_torque_nm: { section: 'ELECTRIC_MOTOR', section_label_fa: 'موتور برقی', section_order: 30, label_fa: 'گشتاور موتور برقی', unit_fa: 'نیوتن‌متر', priority: 10, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'nm' },
  electric_motor_count: { section: 'ELECTRIC_MOTOR', section_label_fa: 'موتور برقی', section_order: 30, label_fa: 'تعداد موتور برقی', unit_fa: 'موتور', priority: 20, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'count' },

  // BATTERY
  battery_capacity_gross_kwh: { section: 'BATTERY', section_label_fa: 'باتری', section_order: 40, label_fa: 'ظرفیت کل باتری', unit_fa: 'کیلووات‌ساعت', priority: 0, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'kwh' },
  battery_capacity_usable_kwh: { section: 'BATTERY', section_label_fa: 'باتری', section_order: 40, label_fa: 'ظرفیت قابل استفاده', unit_fa: 'کیلووات‌ساعت', priority: 5, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'kwh' },
  battery_chemistry: { section: 'BATTERY', section_label_fa: 'باتری', section_order: 40, label_fa: 'شیمی باتری', unit_fa: '', priority: 10, powertrain_applicability: ['BEV', 'PHEV', 'HEV'], formatter: 'text' },
  battery_voltage_architecture: { section: 'BATTERY', section_label_fa: 'باتری', section_order: 40, label_fa: 'ولتاژ باتری', unit_fa: 'ولت', priority: 20, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'text' },

  // CHARGING
  max_ac_charging_kw: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'حداکثر شارژ AC', unit_fa: 'کیلووات', priority: 0, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'kw' },
  max_dc_charging_kw: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'حداکثر شارژ DC', unit_fa: 'کیلووات', priority: 10, powertrain_applicability: ['BEV'], formatter: 'kw' },
  charging_10_80_minutes: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'زمان شارژ ۱۰ تا ۸۰', unit_fa: 'دقیقه', priority: 20, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'min' },
  charging_connector_ac: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'نوع پورت AC', unit_fa: '', priority: 30, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'text' },
  charging_connector_dc: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'نوع پورت DC', unit_fa: '', priority: 40, powertrain_applicability: ['BEV'], formatter: 'text' },
  heat_pump: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'پمپ حرارتی', unit_fa: '', priority: 50, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'text' },
  vehicle_to_load: { section: 'CHARGING', section_label_fa: 'شارژ', section_order: 50, label_fa: 'قابلیت V2L', unit_fa: '', priority: 60, powertrain_applicability: ['BEV'], formatter: 'text' },

  // RANGE & EFFICIENCY
  ev_range_wltp_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد WLTP', unit_fa: 'کیلومتر', priority: 0, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'km' },
  ev_range_epa_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد EPA', unit_fa: 'کیلومتر', priority: 10, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'km' },
  ev_range_cltc_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد CLTC', unit_fa: 'کیلومتر', priority: 20, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'km' },
  ev_range_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد', unit_fa: 'کیلومتر', priority: 30, powertrain_applicability: ['BEV', 'PHEV'], formatter: 'km' },
  hybrid_range_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد هیبریدی', unit_fa: 'کیلومتر', priority: 40, powertrain_applicability: ['HEV', 'PHEV'], formatter: 'km' },
  electric_only_range_km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'برد تمام برقی', unit_fa: 'کیلومتر', priority: 50, powertrain_applicability: ['PHEV'], formatter: 'km' },
  energy_consumption_kwh_100km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'مصرف برقی', unit_fa: 'کیلووات‌ساعت بر ۱۰۰ کیلومتر', priority: 60, powertrain_applicability: ['BEV'], formatter: 'kwh_100km' },
  fuel_consumption_combined_l_100km: { section: 'RANGE', section_label_fa: 'برد و مصرف', section_order: 60, label_fa: 'مصرف سوخت ترکیبی', unit_fa: 'لیتر بر ۱۰۰ کیلومتر', priority: 70, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'l_100km' },

  // TRANSMISSION & DRIVETRAIN
  transmission_type: { section: 'TRANSMISSION', section_label_fa: 'گیربکس و محرک', section_order: 70, label_fa: 'نوع گیربکس', unit_fa: '', priority: 0, powertrain_applicability: 'ALL', formatter: 'text' },
  transmission_gears: { section: 'TRANSMISSION', section_label_fa: 'گیربکس و محرک', section_order: 70, label_fa: 'تعداد دنده', unit_fa: 'دنده', priority: 10, powertrain_applicability: 'ALL', formatter: 'count' },

  // DIMENSIONS
  length_mm: { section: 'DIMENSIONS', section_label_fa: 'ابعاد', section_order: 80, label_fa: 'طول', unit_fa: 'میلی‌متر', priority: 0, powertrain_applicability: 'ALL', formatter: 'mm' },
  width_mm: { section: 'DIMENSIONS', section_label_fa: 'ابعاد', section_order: 80, label_fa: 'عرض', unit_fa: 'میلی‌متر', priority: 10, powertrain_applicability: 'ALL', formatter: 'mm' },
  height_mm: { section: 'DIMENSIONS', section_label_fa: 'ابعاد', section_order: 80, label_fa: 'ارتفاع', unit_fa: 'میلی‌متر', priority: 20, powertrain_applicability: 'ALL', formatter: 'mm' },
  wheelbase_mm: { section: 'DIMENSIONS', section_label_fa: 'ابعاد', section_order: 80, label_fa: 'فاصله محورها', unit_fa: 'میلی‌متر', priority: 30, powertrain_applicability: 'ALL', formatter: 'mm' },
  ground_clearance_mm: { section: 'DIMENSIONS', section_label_fa: 'ابعاد', section_order: 80, label_fa: 'فاصله از زمین', unit_fa: 'میلی‌متر', priority: 40, powertrain_applicability: 'ALL', formatter: 'mm' },

  // WEIGHT & CAPACITY
  curb_weight_kg: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'وزن خالص', unit_fa: 'کیلوگرم', priority: 0, powertrain_applicability: 'ALL', formatter: 'kg' },
  gross_weight_kg: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'وزن ناخالص', unit_fa: 'کیلوگرم', priority: 10, powertrain_applicability: 'ALL', formatter: 'kg' },
  cargo_capacity_l: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'حجم صندوق عقب', unit_fa: 'لیتر', priority: 20, powertrain_applicability: 'ALL', formatter: 'l' },
  fuel_tank_capacity_l: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'ظرفیت باک', unit_fa: 'لیتر', priority: 30, powertrain_applicability: ['ICE', 'MHEV', 'HEV', 'PHEV'], formatter: 'l' },
  seating_capacity: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'ظرفیت سرنشین', unit_fa: 'نفر', priority: 40, powertrain_applicability: 'ALL', formatter: 'count' },
  towing_capacity_kg: { section: 'WEIGHT', section_label_fa: 'وزن و ظرفیت', section_order: 90, label_fa: 'ظرفیت یدک‌کش', unit_fa: 'کیلوگرم', priority: 50, powertrain_applicability: 'ALL', formatter: 'kg' },

  // WHEELS & TIRES
  wheel_size_front_in: { section: 'WHEELS_TIRES', section_label_fa: 'چرخ و لاستیک', section_order: 100, label_fa: 'اندازه چرخ جلو', unit_fa: 'اینچ', priority: 0, powertrain_applicability: 'ALL', formatter: 'in' },
  wheel_size_rear_in: { section: 'WHEELS_TIRES', section_label_fa: 'چرخ و لاستیک', section_order: 100, label_fa: 'اندازه چرخ عقب', unit_fa: 'اینچ', priority: 10, powertrain_applicability: 'ALL', formatter: 'in' },

  // SUSPENSION & BRAKES
  suspension_type_front: { section: 'SUSPENSION', section_label_fa: 'تعلیق و ترمز', section_order: 110, label_fa: 'تعلیق جلو', unit_fa: '', priority: 0, powertrain_applicability: 'ALL', formatter: 'text' },
  suspension_type_rear: { section: 'SUSPENSION', section_label_fa: 'تعلیق و ترمز', section_order: 110, label_fa: 'تعلیق عقب', unit_fa: '', priority: 10, powertrain_applicability: 'ALL', formatter: 'text' },
  brake_type_front: { section: 'SUSPENSION', section_label_fa: 'تعلیق و ترمز', section_order: 110, label_fa: 'ترمز جلو', unit_fa: '', priority: 20, powertrain_applicability: 'ALL', formatter: 'text' },
  brake_type_rear: { section: 'SUSPENSION', section_label_fa: 'تعلیق و ترمز', section_order: 110, label_fa: 'ترمز عقب', unit_fa: '', priority: 30, powertrain_applicability: 'ALL', formatter: 'text' },
};

export function getSpecPresentation(code: string): SpecPresentation | undefined {
  if (!Object.hasOwn(SPEC_MAP, code)) return undefined;
  const item = SPEC_MAP[code];
  return { ...item, powertrain_applicability: item.powertrain_applicability === 'ALL'
    ? 'ALL' : [...item.powertrain_applicability] };
}

// Feature label translations (English → Persian)
const FEATURE_LABELS_FA: Record<string, string> = {
  adaptive_cruise_control: 'کروز کنترل تطبیقی',
  lane_keep_assist: 'کمک نگه‌دارنده خط',
  lane_departure_warning: 'هشدار خروج از خط',
  lane_centering: 'مرکز‌گذاری خط',
  blind_spot_monitor: 'مانیتور نقاط کور',
  rear_cross_traffic_alert: 'هشدار ترافیک متقاطع عقب',
  automatic_emergency_braking: 'ترمز اضطراری خودکار',
  forward_collision_warning: 'هشدار برخورد از جلو',
  traffic_sign_recognition: 'تشخیص علائم ترافیکی',
  driver_attention_monitor: 'مانیتور توجه راننده',
  airbag_count: 'تعداد کیسه هوا',
  electronic_stability_control: 'کنترل پایداری الکترونیکی',
  tyre_pressure_monitoring: 'مانیتور فشار لاستیک',
  head_up_display: 'هدآپ دیسپلی',
  panoramic_roof: 'سقف پانوراما',
  air_suspension: 'تعلیق پنوماتیک',
  adaptive_suspension: 'تعلیق تطبیقی',
  soft_close_doors: 'بستن نرم درها',
  heated_front_seats: 'گرم‌کن صندلی جلو',
  ventilated_front_seats: 'تهویه صندلی جلو',
  massage_front_seats: 'ماساژور صندلی جلو',
  heated_rear_seats: 'گرم‌کن صندلی عقب',
  ventilated_rear_seats: 'تهویه صندلی عقب',
  memory_seats: 'صندلی حافظه‌دار',
  third_row_seats: 'ردیف سوم صندلی',
  wireless_apple_carplay: 'Apple CarPlay بی‌سیم',
  wireless_android_auto: 'Android Auto بی‌سیم',
  premium_audio: 'سیستم صوتی پریمیوم',
  wireless_charging: 'شارژ بی‌سیم',
  matrix_led_headlights: 'چراغ جلو LED ماتریکس',
  adaptive_headlights: 'چراغ‌های تطبیقی',
  front_parking_sensors: 'سنسور پارکینگ جلو',
  rear_parking_sensors: 'سنسور پارکینگ عقب',
  surround_view_camera: 'دوربین ۳۶۰ درجه',
  rear_camera: 'دوربین دنده عقب',
  automatic_parking: 'پارکینگ خودکار',
  crawl_control: 'کنترل خزش',
  terrain_management: 'مدیریت زمین',
  locking_differential: 'دیفرانسیل قفل‌شونده',
  power_tailgate: 'در صندوق برقی',
  keyless_entry: 'ورود بدون کلید',
  remote_start: 'استارت از راه دور',
  digital_key: 'کلید دیجیتال',
};

export function featureLabelFa(code: string, fallbackEn: string): string {
  return Object.hasOwn(FEATURE_LABELS_FA, code) ? FEATURE_LABELS_FA[code] : fallbackEn;
}

// Feature category label translations
const FEATURE_CATEGORY_LABELS_FA: Record<string, string> = {
  ADAS: 'سیستم‌های کمک راننده',
  SAFETY: 'ایمنی',
  COMFORT: 'راحتی',
  INTERIOR: 'داخلی',
  EXTERIOR: 'خارجی',
  INFOTAINMENT: 'اطلاعات و سرگرمی',
  CLIMATE: 'تهویه',
  SEATING: 'صندلی',
  LIGHTING: 'روشنایی',
  PARKING: 'پارکینگ',
  OFFROAD: 'آفرود',
  CONVENIENCE: 'راحتی سوار',
};

export function featureCategoryLabelFa(code: string, fallbackFa: string): string {
  return Object.hasOwn(FEATURE_CATEGORY_LABELS_FA, code) ? FEATURE_CATEGORY_LABELS_FA[code] : fallbackFa;
}

/** Returns a fresh list of supported specification codes. */
export function listSpecCodes(): string[] {
  return Object.keys(SPEC_MAP);
}


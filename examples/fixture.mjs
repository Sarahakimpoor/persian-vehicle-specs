// Entirely synthetic demonstration data. These are not real vehicle claims.
export const sampleTechnical = {
  sections: [{
    code: 'RAW', label_fa: 'مشخصات نمونه', display_order: 0,
    specs: [
      ['top_speed_km_h', 180], ['acceleration_0_100_sec', 7.8],
      ['engine_displacement_cc', 1500], ['battery_capacity_usable_kwh', 25.7],
      ['ev_range_wltp_km', 120], ['length_mm', 4500], ['seating_capacity', 5],
    ].map(([code, value_number]) => ({
      code, label_fa: code, value_number, value_text: null, value_boolean: null,
      unit_code: null, data_type: 'NUMBER', display_order: 0,
    })),
  }],
  features: [],
};

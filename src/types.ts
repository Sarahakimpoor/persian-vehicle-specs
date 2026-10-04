/** Public presentation input. No application services are required. */
export type PowertrainCode = 'ICE' | 'MHEV' | 'HEV' | 'PHEV' | 'BEV';
export type SpecDataType = 'NUMBER' | 'TEXT' | 'BOOLEAN' | 'JSON';

export interface TechnicalSpec {
  code: string;
  label_fa: string;
  value_number: number | null;
  value_text: string | null;
  value_boolean: boolean | null;
  unit_code: string | null;
  data_type: SpecDataType;
  display_order: number;
}

export interface TechnicalSection {
  code: string;
  label_fa: string;
  display_order: number;
  specs: TechnicalSpec[];
}

export interface TechnicalFeature {
  code: string;
  label_en: string;
  availability: 'STANDARD' | 'OPTIONAL' | 'UNKNOWN';
  category_code: string;
  category_label_fa: string;
  display_order: number;
}

export interface VehicleTechnical {
  sections: TechnicalSection[];
  features: TechnicalFeature[];
}


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
export interface DisplaySpec {
  code: string; label_fa: string; value: string; section: string;
  section_label_fa: string; section_order: number; priority: number;
}
export interface DisplaySection { code: string; label_fa: string; specs: DisplaySpec[]; }
export declare const SECTIONS: Readonly<Record<'PERFORMANCE' | 'POWERTRAIN' | 'ENGINE' | 'ELECTRIC_MOTOR' | 'BATTERY' | 'CHARGING' | 'RANGE' | 'TRANSMISSION' | 'DIMENSIONS' | 'WEIGHT' | 'WHEELS' | 'SUSPENSION' | 'FEATURES', { readonly code: string; readonly label_fa: string; readonly order: number }>>;
export declare function formatSpecValue(valueNumber: number | null | undefined, valueText: string | null | undefined, valueBoolean: boolean | null | undefined, unitCode: string | null | undefined, formatter?: string): string | null;
export declare function getSpecPresentation(code: string): SpecPresentation | undefined;
export declare function listSpecCodes(): string[];
export declare function featureLabelFa(code: string, fallbackEn: string): string;
export declare function featureCategoryLabelFa(code: string, fallbackFa: string): string;
export declare function buildDisplaySections(technical: VehicleTechnical | null | undefined, powertrainType: PowertrainCode | null | undefined): DisplaySection[];
export declare function buildNavItems(displaySections: DisplaySection[], hasFeatures: boolean): { code: string; label_fa: string }[];


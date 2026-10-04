import type { VehicleTechnical, PowertrainCode } from './types.js';
import { getSpecPresentation } from './spec-taxonomy.js';
import { formatSpecValue } from './spec-format.js';

export interface DisplaySpec {
  code: string;
  label_fa: string;
  value: string;
  section: string;
  section_label_fa: string;
  section_order: number;
  priority: number;
}
export interface DisplaySection {
  code: string;
  label_fa: string;
  specs: DisplaySpec[];
}

/** Build new presentation objects; input records are never mutated or spread.
 * Unknown/null powertrains show only universally applicable known specs.
 * Unknown specification codes keep the section/label supplied by the caller.
 */
export function buildDisplaySections(
  technical: VehicleTechnical | null | undefined,
  powertrainType: PowertrainCode | null | undefined,
): DisplaySection[] {
  if (!technical) return [];
  const sectionMap = new Map<string, { section: DisplaySection; order: number }>();
  for (const inputSection of technical.sections) {
    for (const spec of inputSection.specs) {
      const presentation = getSpecPresentation(spec.code);
      if (presentation && presentation.powertrain_applicability !== 'ALL'
        && (!powertrainType || !presentation.powertrain_applicability.includes(powertrainType))) continue;
      const value = formatSpecValue(spec.value_number, spec.value_text,
        spec.value_boolean, spec.unit_code, presentation?.formatter);
      if (value === null) continue;
      const code = presentation?.section ?? inputSection.code;
      const label = presentation?.section_label_fa ?? inputSection.label_fa;
      const order = presentation?.section_order ?? inputSection.display_order;
      if (!sectionMap.has(code)) sectionMap.set(code, {
        section: { code, label_fa: label, specs: [] }, order,
      });
      const group = sectionMap.get(code)!;
      group.order = Math.min(group.order, order);
      group.section.specs.push({
        code: spec.code, label_fa: presentation?.label_fa ?? spec.label_fa,
        value, section: code, section_label_fa: label, section_order: order,
        priority: presentation?.priority ?? spec.display_order,
      });
    }
  }
  const groups = [...sectionMap.values()].sort((a, b) => a.order - b.order);
  for (const { section } of groups) section.specs.sort((a, b) => a.priority - b.priority);
  return groups.map(({ section }) => section);
}

export function buildNavItems(
  displaySections: DisplaySection[], hasFeatures: boolean,
): { code: string; label_fa: string }[] {
  const items = displaySections.map(({ code, label_fa }) => ({ code, label_fa }));
  if (hasFeatures && !items.some(item => item.code === 'FEATURES')) {
    items.push({ code: 'FEATURES', label_fa: 'امکانات شاخص' });
  }
  return items;
}

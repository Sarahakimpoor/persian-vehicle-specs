import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDisplaySections, buildNavItems, getSpecPresentation, listSpecCodes,
  featureLabelFa, featureCategoryLabelFa, SECTIONS } from '../dist/index.js';

const spec = (code, number, text = null, boolean = null) => ({ code, label_fa: code,
  value_number: number, value_text: text, value_boolean: boolean,
  unit_code: null, data_type: 'NUMBER', display_order: 0 });
const section = (code, order, specs) => ({ code, label_fa: code, display_order: order, specs });
const technical = sections => ({ sections, features: [] });

test('all taxonomy entries refer to existing sections and valid formatters', () => {
  const codes = new Set(Object.values(SECTIONS).map(s => s.code));
  const modes = new Set(['hp','kw','kwh','km','km_h','sec','cc','nm','mm','kg','l','l_100km','kwh_100km','min','in','deg','count','text']);
  assert.ok(listSpecCodes().length > 40);
  for (const code of listSpecCodes()) {
    const p = getSpecPresentation(code);
    assert.ok(codes.has(p.section), code);
    assert.ok(p.label_fa.trim(), code);
    assert.ok(modes.has(p.formatter), code);
  }
});
test('unknown and prototype specification names return undefined', () => {
  for (const code of ['unknown', 'constructor', 'toString', '__proto__']) assert.equal(getSpecPresentation(code), undefined);
});
test('lookup metadata is independently mutable without altering future lookups', () => {
  const p = getSpecPresentation('engine_displacement_cc');
  p.label_fa = 'changed';
  p.powertrain_applicability.push('BEV');
  assert.equal(getSpecPresentation('engine_displacement_cc').label_fa, 'حجم موتور');
  assert.ok(!getSpecPresentation('engine_displacement_cc').powertrain_applicability.includes('BEV'));
});
test('feature and category translations retain custom fallbacks', () => {
  assert.equal(featureLabelFa('adaptive_cruise_control', 'fallback'), 'کروز کنترل تطبیقی');
  assert.equal(featureCategoryLabelFa('ADAS', 'fallback'), 'سیستم‌های کمک راننده');
  for (const code of ['unknown', 'constructor', '__proto__']) {
    assert.equal(featureLabelFa(code, 'feature'), 'feature');
    assert.equal(featureCategoryLabelFa(code, 'category'), 'category');
  }
});
test('missing technical input and empty sections produce an empty array', () => {
  assert.deepEqual(buildDisplaySections(null, null), []);
  assert.deepEqual(buildDisplaySections(technical([]), 'BEV'), []);
});
test('BEV excludes combustion-engine specs', () => {
  const data = technical([section('RAW', 0, [spec('engine_displacement_cc', 2000), spec('battery_capacity_usable_kwh', 65)])]);
  assert.deepEqual(buildDisplaySections(data, 'BEV').map(s => s.code), ['BATTERY']);
});
test('ICE excludes battery specs', () => {
  const data = technical([section('RAW', 0, [spec('engine_displacement_cc', 2000), spec('battery_capacity_usable_kwh', 65)])]);
  assert.deepEqual(buildDisplaySections(data, 'ICE').map(s => s.code), ['ENGINE']);
});
test('PHEV retains engine and battery groups', () => {
  const data = technical([section('RAW', 0, [spec('battery_capacity_usable_kwh', 25), spec('engine_displacement_cc', 1500)])]);
  assert.deepEqual(buildDisplaySections(data, 'PHEV').map(s => s.code), ['ENGINE', 'BATTERY']);
});
test('unknown powertrain omits restricted known specs', () => {
  const data = technical([section('RAW', 0, [spec('engine_displacement_cc', 1500), spec('top_speed_km_h', 180)])]);
  assert.deepEqual(buildDisplaySections(data, null).map(s => s.code), ['PERFORMANCE']);
});
test('custom sections use their supplied order', () => {
  const data = technical([section('LATE', 50, [spec('custom_late', 1)]), section('EARLY', -1, [spec('custom_early', 1)])]);
  assert.deepEqual(buildDisplaySections(data, null).map(s => s.code), ['EARLY', 'LATE']);
});
test('spec priority determines order inside a known group', () => {
  const data = technical([section('RAW', 0, [spec('engine_torque_nm', 350), spec('engine_power_hp', 200), spec('acceleration_0_100_sec', 7)])]);
  assert.deepEqual(buildDisplaySections(data, 'ICE')[0].specs.map(s => s.code), ['acceleration_0_100_sec', 'engine_power_hp', 'engine_torque_nm']);
});
test('null, blank and non-finite specs are removed without hiding zero or false', () => {
  const data = technical([section('CUSTOM', 0, [spec('missing', null), spec('blank', null, '  '), spec('bad', Infinity), spec('zero', 0), spec('false', null, null, false)])]);
  assert.deepEqual(buildDisplaySections(data, null)[0].specs.map(s => s.value), ['۰', 'خیر']);
});
test('caller records are unchanged and extra fields are not copied', () => {
  const data = technical([section('RAW', 0, [spec('engine_power_hp', 200)])]);
  data.sections[0].specs[0].internal_notes = 'SYNTHETIC PRIVATE MARKER';
  const before = JSON.stringify(data);
  const result = buildDisplaySections(data, 'ICE');
  assert.equal(JSON.stringify(data), before);
  assert.ok(!JSON.stringify(result).includes('SYNTHETIC PRIVATE MARKER'));
  result[0].specs[0].label_fa = 'changed';
  assert.equal(JSON.stringify(data), before);
});
test('navigation appends features once without changing display sections', () => {
  const data = [{ code: 'PERFORMANCE', label_fa: 'عملکرد', specs: [] }];
  assert.deepEqual(buildNavItems(data, true).map(x => x.code), ['PERFORMANCE', 'FEATURES']);
  assert.equal(data.length, 1);
  const features = [{ code: 'FEATURES', label_fa: 'امکانات', specs: [] }];
  assert.equal(buildNavItems(features, true).length, 1);
});

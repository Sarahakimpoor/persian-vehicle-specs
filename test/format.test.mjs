import test from 'node:test';
import assert from 'node:assert/strict';
import { formatSpecValue } from '../dist/index.js';

for (const [mode, number, expected] of [
  ['hp', 489, '۴۸۹ اسب بخار'], ['kw', 125.5, '۱۲۵٫۵ کیلووات'],
  ['kwh', 25.7, '۲۵٫۷ کیلووات‌ساعت'], ['km', 570, '۵۷۰ کیلومتر'],
  ['km_h', 200, '۲۰۰ کیلومتر بر ساعت'], ['sec', 4.8, '۴٫۸ ثانیه'],
  ['cc', 2998, '۲٬۹۹۸ سی‌سی'], ['nm', 450, '۴۵۰ نیوتن‌متر'],
  ['mm', 4800, '۴٬۸۰۰ میلی‌متر'], ['kg', 2100, '۲٬۱۰۰ کیلوگرم'],
  ['l', 52.5, '۵۲٫۵ لیتر'], ['l_100km', 6.2, '۶٫۲ لیتر بر ۱۰۰ کیلومتر'],
  ['kwh_100km', 17.4, '۱۷٫۴ کیلووات‌ساعت بر ۱۰۰ کیلومتر'],
  ['min', 26, '۲۶ دقیقه'], ['in', 19, '۱۹ اینچ'], ['deg', 22.5, '۲۲٫۵ درجه'],
  ['count', 6, '۶'],
]) test(`formats ${mode}`, () => assert.equal(formatSpecValue(number, null, null, mode, mode), expected));

for (const [input, expected] of [
  ['Petrol', 'بنزین'], ['DIESEL', 'دیزل'], ['AWD', 'چهار چرخ متحرک'],
  ['AUTOMATIC', 'اتوماتیک'], ['Twin Turbo', 'توربو دوقلو'],
  ['PHEV', 'پلاگین هیبرید'], ['BEV', 'برقی'], ['ICE', 'درون‌سوز'],
  ['CVT', 'پیوسته متغیر (CVT)'], ['true', 'بله'], ['NO', 'خیر'],
]) test(`translates ${input}`, () => assert.equal(formatSpecValue(null, input, null, null, 'text'), expected));

test('preserves boolean false and zero', () => {
  assert.equal(formatSpecValue(null, null, false, null), 'خیر');
  assert.equal(formatSpecValue(0, null, null, 'count'), '۰');
});
test('boolean takes precedence over mixed inputs', () => {
  assert.equal(formatSpecValue(100, 'yes', false, 'hp'), 'خیر');
});
test('blank and absent values produce null', () => {
  assert.equal(formatSpecValue(null, '  ', null, null), null);
  assert.equal(formatSpecValue(undefined, undefined, undefined, undefined), null);
});
test('non-finite numbers are omitted or use text fallback', () => {
  for (const value of [NaN, Infinity, -Infinity]) {
    assert.equal(formatSpecValue(value, null, null, 'kw'), null);
    assert.equal(formatSpecValue(value, 'pending', null, 'kw'), 'pending');
  }
});
test('text with an existing unit is preserved without suffix', () => {
  assert.equal(formatSpecValue(null, ' 570 km ', null, 'km', 'km'), '570 km');
});
test('text mode wins when a finite number is also present', () => {
  assert.equal(formatSpecValue(1, 'AWD', null, null, 'text'), 'چهار چرخ متحرک');
});
test('known unit code is localized without a formatter', () => {
  assert.equal(formatSpecValue(25.7, null, null, 'kwh'), '۲۵٫۷ کیلووات‌ساعت');
});
test('unknown unit is preserved', () => {
  assert.equal(formatSpecValue(12.3, null, null, 'custom'), '۱۲٫۳ custom');
});
test('numeric input is not converted to another unit', () => {
  assert.equal(formatSpecValue(100, null, null, 'hp', 'kw'), '۱۰۰ کیلووات');
});
test('prototype property names remain plain text', () => {
  for (const value of ['constructor', 'toString', '__proto__']) {
    assert.equal(formatSpecValue(null, value, null, null), value);
  }
});

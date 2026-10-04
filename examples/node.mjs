import { buildDisplaySections } from '../dist/index.js';
import { sampleTechnical } from './fixture.mjs';
for (const section of buildDisplaySections(sampleTechnical, 'PHEV')) {
  console.log(`\n${section.label_fa}`);
  for (const spec of section.specs) console.log(`  ${spec.label_fa}: ${spec.value}`);
}

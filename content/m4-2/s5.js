/* 4.2 · Section 5: physical and environmental security (power, cooling, rack security, fire suppression) */
module.exports = {
  title: 'Physical and environmental security for AI data centres', covers: [5],
  blocks: [
    { type: 'video', title: 'Power, cooling and locks', kicker: 'Module 4.2 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.2 · AI infrastructure', title: 'Power, cooling and locks', sub: 'Physical and environmental security for AI data centres', icon: 'building',
        say: 'AI hardware is dense, hot and power-hungry, and it concentrates enormous value in a few racks. Physical and environmental security has to keep up. | This video covers power, cooling, rack security and fire protection for AI data centres.' },
      { t: 'chart', title: 'Power per rack has exploded', kind: 'bar', x: ['Typical enterprise', 'Air-cooled GPU', 'Liquid-cooled AI', 'Next generation'], yMin: 0, yMax: 250, ticks: 5, unit: '', yLabel: 'Illustrative power draw per rack, in kilowatts',
        series: [{ n: 'Power per rack', k: 'human', v: [8, 40, 130, 240], ck: ['neutral', 'data', 'human', 'threat'] }],
        steps: [{ s: [0] }, {}, {}],
        say: 'Power density has exploded. In this illustrative chart, a typical enterprise rack draws under ten kilowatts, while an air-cooled GPU rack draws several times that. | Current liquid-cooled AI racks can exceed a hundred kilowatts each, and next-generation designs go higher still. | That changes everything downstream: power distribution, cooling, floor loading and fire risk. A data hall designed for ordinary servers usually can’t simply take AI racks.' },
      { t: 'bullets', title: 'Power and cooling', layout: 'grid', cols: 2, items: [
          { icon: 'bolt', h: 'Redundant power', d: 'N+1 or 2N, UPS and generators', k: 'human' },
          { icon: 'drop', h: 'Liquid cooling', d: 'Direct-to-chip or immersion', k: 'data' },
          { icon: 'alert', h: 'Leak detection', d: 'Sensors in and under racks', k: 'threat' },
          { icon: 'thermo', h: 'Thermal monitoring', d: 'Inlet temperatures and hotspots', k: 'model' },
          { icon: 'sliders', h: 'Headroom for failure', d: 'Capacity to survive a lost unit', k: 'control' },
          { icon: 'plug', h: 'Grid and fuel supply', d: 'Utility limits, fuel contracts', k: 'neutral' } ],
        say: 'Power and cooling need six things. | Redundant power: N plus one or fully duplicated paths, with uninterruptible power supplies and generators. | Liquid cooling, either direct to the chip or by immersion, because air alone can’t remove the heat from dense AI racks. | Leak detection, with sensors in and under racks, because liquid now runs right next to the electronics. | Thermal monitoring of inlet temperatures and hotspots. | Headroom, so the site can lose a cooling unit or power path and keep running. | And secure supply: grid capacity, which is now a real constraint for AI sites, and fuel contracts for generators.' },
      { t: 'bullets', title: 'Rack and facility security', layout: 'grid', cols: 2, items: [
          { icon: 'layers', h: 'Layered zones', d: 'Perimeter, building, hall, cage, rack', k: 'neutral' },
          { icon: 'id', h: 'Multi-factor entry', d: 'Badge plus biometric; mantraps', k: 'control' },
          { icon: 'lock', h: 'Locked, audited racks', d: 'Electronic locks with logs', k: 'human' },
          { icon: 'eye', h: 'Surveillance and escort', d: 'CCTV; visitors always escorted', k: 'data' },
          { icon: 'box', h: 'Hardware chain of custody', d: 'GPUs and drives tracked end to end', k: 'model' },
          { icon: 'shield', h: 'Tamper detection', d: 'Door sensors and seals', k: 'threat' } ],
        say: 'Physical access control works in layers too. | Zones nest from the site perimeter, through the building and the data hall, down to the cage and the individual rack. | Entry to sensitive zones needs more than one factor, such as a badge plus a biometric, with mantraps to stop tailgating. | Racks holding AI hardware are locked electronically, with every opening logged. | Surveillance covers the space, and visitors are always escorted. | GPUs and drives are high-value and data-bearing, so track their chain of custody from delivery to destruction. | And tamper detection, such as door sensors and seals, shows when a rack has been opened.' },
      { t: 'compare', title: 'Fire detection and suppression', labels: ['How it works', 'Strengths', 'Watch out for'],
        cols: [{ h: 'Detection', icon: 'search', k: 'data' }, { h: 'Gas', icon: 'cloud', k: 'control' }, { h: 'Water', icon: 'drop', k: 'human' }],
        rows: [
          ['Samples air for smoke', 'Floods the room with gas', 'Water released only when needed'],
          ['Very early warning', 'No residue on equipment', 'Effective, widely required'],
          ['Tuning to avoid false alarms', 'Sealed rooms, people safety', 'Water damage to equipment'] ],
        say: 'Fire protection combines detection and suppression. | Aspirating systems sample the air continuously for smoke particles. Gas systems flood the room with a clean agent or inert gas. Water-based systems, such as pre-action sprinklers or water mist, release water only when needed. | Early detection gives warning long before visible smoke. Gas leaves no residue on equipment. Water-based systems are effective and often required by building codes. | But detection needs tuning to avoid false alarms. Gas needs well-sealed rooms and procedures to keep people safe. And water risks damaging the very equipment it protects.' },
      { t: 'summary', items: ['AI racks draw many times more power, and need liquid cooling', 'Redundant power, leak detection, thermal headroom', 'Layered access, audited racks, chain of custody for hardware', 'Early detection plus suppression suited to the equipment'],
        say: 'To recap. | AI racks draw many times the power of ordinary servers, and usually need liquid cooling. | Provide redundant power, leak detection and thermal headroom. | Layer physical access down to audited racks, and track hardware from delivery to destruction. | And pair very early fire detection with suppression suited to the equipment and the people in the space.' } ] },
    { type: 'text', md: `### Power
- **Redundancy levels:** *N* (just enough capacity), *N+1* (one spare component), *2N* (fully duplicated systems and paths) and *2N+1*. Critical AI services usually need at least N+1, and often 2N, for power distribution.
- **UPS and generators:** uninterruptible power supplies bridge the gap until generators start; plan generator fuel for an extended outage, with supply contracts. Lithium-ion UPS batteries are compact, but need fire risk management (thermal runaway).
- **Distribution:** AI racks need higher-capacity power distribution and busways; check breaker coordination and power quality monitoring.
- **Grid capacity** is now a major constraint for new AI sites; understand utility commitments and on-site generation plans.

### Cooling
- **Air cooling** struggles beyond a few tens of kilowatts per rack; hot and cold aisle containment helps.
- **Direct-to-chip liquid cooling** pipes coolant to cold plates on processors; **immersion cooling** submerges hardware in dielectric fluid. Both bring new risks: leaks, pump and coolant distribution unit failures, and, for some immersion fluids, flammability and handling requirements.
- Follow the ASHRAE thermal guidelines for equipment environments, monitor inlet temperatures, and keep redundant pumps and chillers.
- **Floor loading:** AI racks are heavy, often well over a tonne, so check structural limits.

### Physical security
ISO/IEC 27001 Annex A includes physical controls such as security perimeters, physical entry controls, monitoring, protection against environmental threats, equipment siting, supporting utilities, cabling security, equipment maintenance and secure disposal. For AI facilities, emphasise:
- **Layered zones** with multi-factor entry, mantraps and anti-tailgating, and an access review process.
- **Locked, monitored racks and cages**, with audit trails of every opening.
- **CCTV with retention**, visitor escort, and logging of contractor access.
- **Chain of custody** for accelerators and storage from delivery to decommissioning; sanitise or destroy media before it leaves (Module 3.4).
- **Tamper evidence** on racks and hardware.

### Fire protection
- **Very early warning aspirating smoke detection** samples air through pipes and can detect incipient fires.
- **Gaseous suppression** uses clean agents or inert gases that leave no residue; it needs sealed rooms, safety interlocks and evacuation procedures, and some agents are being phased down for environmental reasons.
- **Pre-action sprinklers** keep pipes dry until two independent signals occur, reducing accidental discharge; **water mist** uses less water.
- Relevant standards include NFPA 75 (protection of IT equipment) and NFPA 2001 (clean agent systems).

### Site and resilience standards
**ANSI/TIA-942** rates data centre infrastructure from rating 1 to 4; the **Uptime Institute** tiers range from Tier I (basic capacity) through Tier III (concurrently maintainable, so any component can be maintained without downtime) to Tier IV (fault tolerant). **EN 50600** is the European data centre standard. When AI runs in third-party facilities, verify these controls through certifications and audit reports (Module 2.5).

### Environmental monitoring
Monitor temperature, humidity, water and leaks, smoke, power quality and door status, with alerts to staffed operations, and test responses regularly.` },
    { type: 'callout', kind: 'exam', title: 'Physical security questions', md: `Remember that AI changes the **scale** of familiar physical risks: far higher power and heat per rack, liquid near electronics, heavier racks, and very valuable hardware. Good answers address **capacity and redundancy** first when new AI hardware is installed, and **layered access with auditing** for protecting it.` },
    { type: 'flip', title: 'Facility vocabulary', cards: [
      ['N+1', 'One spare component beyond what the load needs.'],
      ['2N', 'Two complete, independent systems, either able to carry the full load.'],
      ['Mantrap', 'Two interlocked doors that admit one person at a time, stopping tailgating.'],
      ['Pre-action sprinkler', 'Pipes stay dry until two independent signals occur, reducing accidental discharge.'],
      ['Aspirating detection', 'Continuously samples air for smoke particles, giving very early warning.'],
      ['Uptime Tier III', 'Concurrently maintainable: any component can be maintained without downtime.'] ] },
    { type: 'check', q: { q: 'An organisation plans to install liquid-cooled AI racks in an existing data hall that was designed for air-cooled servers. Which issue is MOST important to resolve before go-live?', o: ['Whether the hall has enough CCTV cameras to cover every one of the new racks', 'Whether power, cooling and floor loading can support far denser racks, with leak detection', 'Whether the visitor sign-in process asks every guest for photographic identification on arrival', 'Whether the existing fire suppression system should be replaced with halon'], a: 1, b: 5,
      why: 'AI racks can draw many times the power of the servers the hall was designed for, and liquid cooling adds leak risk, so capacity, cooling, structural loading and leak detection come first. CCTV and visitor checks matter but don’t determine whether the hall can safely run the racks, and halon has long been phased out.' } }
  ]
};

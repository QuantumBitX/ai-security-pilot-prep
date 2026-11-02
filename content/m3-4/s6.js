/* 3.4 · Section 6: media sanitisation on high-density AI storage */
module.exports = {
  title: 'Media sanitisation for high-density AI storage', covers: [6],
  blocks: [
    { type: 'video', title: 'When drives leave the data centre', kicker: 'Module 3.4 · Video 6 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'When drives leave the data centre', sub: 'Media sanitisation for high-density AI storage', icon: 'trash',
        say: 'AI infrastructure runs on dense storage: large SSDs, NVMe arrays and object stores holding training data and model weights. When those devices fail, go back to a lessor or are retired, the data must not leave with them. | This video covers media sanitisation for high-density AI storage, including cryptographic erasure and destruction to very small particles.' },
      { t: 'compare', title: 'Clear, purge or destroy', labels: ['What it does', 'Typical methods', 'Use when'],
        cols: [{ h: 'Clear', icon: 'x', k: 'neutral' }, { h: 'Purge', icon: 'shield', k: 'data' }, { h: 'Destroy', icon: 'trash', k: 'threat' }],
        rows: [
          ['Defeats simple recovery', 'Defeats lab recovery', 'Media can’t be reused'],
          ['Overwrite, factory reset', 'Crypto erase, sanitise commands', 'Disintegrate, incinerate, melt'],
          ['Reuse inside the organisation', 'Media leaves your control', 'Highest sensitivity; failed media'] ],
        say: 'Sanitisation has three levels. | Clear defeats simple, non-invasive recovery. Purge defeats recovery even with laboratory techniques. Destroy makes the media physically unusable. | Clear uses overwriting or a factory reset. Purge uses cryptographic erase, or the drive’s built-in sanitise commands. Destroy uses disintegration, incineration or melting. | Clear suits media staying inside the organisation. Purge suits media leaving your control. Destroy is for the highest sensitivity, and for failed media that can no longer be purged.' },
      { t: 'bullets', title: 'Why dense AI storage is different', items: [
          { icon: 'layers', h: 'Hidden blocks', d: 'SSDs remap and over-provision; overwrites miss data', k: 'model' },
          { icon: 'chip', h: 'Huge capacity per chip', d: 'A small fragment can hold gigabytes', k: 'threat' },
          { icon: 'copy', h: 'Copies everywhere', d: 'Shards, replicas and caches across nodes', k: 'data' },
          { icon: 'cloud', h: 'Media you don’t own', d: 'Cloud storage can’t be shredded by you', k: 'neutral' },
          { icon: 'alert', h: 'Failed drives', d: 'May not respond to sanitise commands', k: 'human' } ],
        say: 'Dense AI storage breaks old assumptions. | Solid-state drives remap and over-provision blocks, so simple overwriting can miss data. | Each flash chip holds so much that a small fragment can contain gigabytes, so ordinary shredding can leave readable pieces. | Training data and checkpoints are sharded and replicated across many nodes and caches. | In the cloud, you don’t own the media at all. | And failed drives returned for warranty replacement may not respond to any sanitise command.' },
      { t: 'flow', title: 'Cryptographic erase',
        nodes: [
          { id: 'w', x: 230, y: 330, icon: 'database', label: 'Data written encrypted', sub: 'from the very first byte', k: 'data', w: 320 },
          { id: 'key', x: 640, y: 330, icon: 'key', label: 'Media or KMS key', sub: 'the only way to read it', k: 'human', w: 290 },
          { id: 'ce', x: 1040, y: 330, icon: 'trash', label: 'Crypto erase', sub: 'key destroyed (zeroised)', k: 'threat', w: 290 },
          { id: 'gone', x: 1390, y: 330, icon: 'lock', label: 'Unreadable', sub: 'ciphertext only', k: 'control', w: 250 },
          { id: 'ver', x: 1040, y: 690, icon: 'check', label: 'Verify and certify', sub: 'no key copies; evidence kept', k: 'neutral', w: 320 } ],
        edges: [{ from: 'w', to: 'key', k: 'data' }, { from: 'key', to: 'ce', k: 'human' }, { from: 'ce', to: 'gone', k: 'threat' }, { from: 'ce', to: 'ver', k: 'neutral' }],
        steps: [
          { show: 'w', hi: 'w' },
          { show: 'key w-key', flow: 'w-key', hi: 'key' },
          { show: 'ce key-ce', flow: 'key-ce', hi: 'ce' },
          { show: 'gone ce-gone', flow: 'ce-gone', hi: 'gone', mark: { gone: 'lock' } },
          { show: 'ver ce-ver', flow: 'ce-ver', hi: 'ver', mark: { ver: 'ok' } } ],
        say: 'Cryptographic erase is the workhorse for dense and cloud storage. It only works if data was encrypted from the very first byte written. | The data can then only be read with its key: a media encryption key inside a self-encrypting drive, or a key held in a key management service. | Destroying that key, by zeroising it, is the erase. It takes seconds, even for huge drives and replicated cloud storage. | What remains is ciphertext that can’t be decrypted. | But it must be verified and documented, because a forgotten copy of the key would undo it.' },
      { t: 'bullets', title: 'Destroying high-density media', items: [
          { icon: 'ruler', h: 'Match particle size to density', d: 'Disintegrate flash to very small particles', k: 'threat' },
          { icon: 'fire', h: 'Incinerate or melt', d: 'For the highest sensitivity levels', k: 'human' },
          { icon: 'link', h: 'Chain of custody', d: 'Serial numbers, on-site or witnessed', k: 'data' },
          { icon: 'doc', h: 'Certificates of sanitisation', d: 'Evidence for audits and contracts', k: 'control' } ],
        say: 'When media must be destroyed, density matters. | Match particle size to density. Ordinary shredding can leave whole flash chips intact, so solid-state media need disintegration to very small particles, for example around two millimetres in NSA-evaluated equipment. This is what people mean by micro-shredding. | For the highest sensitivity, incineration or melting may be required; NIST’s updated guidance steers away from ordinary shredding for solid-state media at higher sensitivity levels. | Keep chain of custody from removal to destruction, recording serial numbers, and destroy on site or under witness where possible. | And obtain certificates of sanitisation as evidence.' },
      { t: 'summary', items: ['Clear, purge or destroy, chosen by sensitivity and destination', 'Dense flash defeats overwriting and ordinary shredding', 'Crypto erase needs encryption from day one and verified key destruction', 'Chain of custody and certificates for every device'],
        say: 'To recap. | Choose clear, purge or destroy by the data’s sensitivity and where the media is going. | Dense flash storage defeats simple overwriting and ordinary shredding. | Cryptographic erase needs encryption from day one, and verified destruction of every copy of the key. | And every device needs chain of custody and a certificate of sanitisation.' } ] },
    { type: 'text', md: `### Standards and categories
**NIST SP 800-88 Revision 2** (2025) reframed media sanitisation around an enterprise **sanitisation programme**: policy aligned to data classification, roles, training, tool configuration, and **verification and validation** with documented evidence. Rather than media-by-media technique tables, it points to industry standards such as **IEEE 2883-2022** and to policy manuals such as the NSA/CSS storage device sanitisation manuals. The categories remain:
- **Clear:** logical techniques (such as a single overwrite pass or factory reset) that protect against simple recovery.
- **Purge:** techniques that protect against laboratory recovery, such as **cryptographic erase** and device sanitise commands (for example, NVMe and ATA sanitise operations), or degaussing for legacy magnetic media.
- **Destroy:** physical techniques that make recovery infeasible and the media unusable, such as disintegration, incineration and melting.

NIST’s guidance notes that ordinary shredding and pulverising are ineffective for media at medium and high sensitivity, because modern media store data so densely, and points to incineration or melting for solid-state media at those levels. Where disintegration is used, particle size must match the media: NSA/CSS-evaluated solid-state disintegrators reduce media to particles of about 2 mm. This is the context for the blueprint’s term **micro-shredding**.

### Cryptographic erase
Cryptographic erase (CE) is valid only when:
- all data was **encrypted from the first write** (no plaintext was ever stored),
- the encryption is strong (at least 128-bit security) and implemented in validated modules,
- **every copy of the key is destroyed** (zeroised), including backups and escrow, and
- the result is verified and recorded.

It is often the **only practical purge method in the cloud**, where you don’t control the physical media: destroying customer-managed keys renders stored data, replicas and backups unreadable. Review cloud agreements for how keys are managed and how deletion and zeroisation are evidenced.

### AI storage considerations
| Storage | Sanitisation approach |
|---|---|
| **SSD and NVMe** (training clusters, vector databases) | Purge with device sanitise commands or CE on self-encrypting drives; destroy by disintegration to small particles or incineration |
| **Hard disk drives** (bulk datasets, archives) | Clear by overwriting; purge by degaussing for legacy drives; destroy where required |
| **Cloud object and block storage** | CE by destroying customer-managed keys, plus provider deletion commitments |
| **Accelerator and system memory** | Volatile, but clear between tenants and jobs (Module 1.1) |
| **Failed or returned drives** | Keep and destroy under chain of custody rather than returning them, unless they were encrypted and the keys destroyed |

### Running the programme
Inventory every device that holds AI data, including boot drives and caches in GPU servers. Sanitise before reuse between projects or tenants, not only at disposal. Use **drive retention** terms so failed drives under warranty needn’t be returned. Vet IT asset disposal vendors, maintain **chain of custody**, and keep **certificates of sanitisation**, linked to the asset inventory and to data retention and erasure obligations (Modules 3.1 and 3.2).` },
    { type: 'steps', title: 'Decommission a GPU training server', items: [
      ['Identify all storage', 'List every device holding data: NVMe data drives, boot drives, local caches and any removable media.'],
      ['Destroy keys', 'Where data was encrypted from the start, destroy the relevant keys (crypto erase) and confirm no copies remain.'],
      ['Purge and verify', 'Run sanitise commands on working drives and verify the results by sampling or full checks.'],
      ['Handle failures', 'Keep drives that fail to sanitise and destroy them under chain of custody, using methods suited to dense flash.'],
      ['Record evidence', 'Issue certificates of sanitisation and update the asset inventory before the server leaves.'] ] },
    { type: 'check', q: { q: 'A failed NVMe drive from a training cluster held unencrypted training data and no longer responds to commands. The vendor offers a free replacement if the drive is returned. What is the BEST approach?', o: ['Return the drive under warranty, since a failed drive no longer works and can’t be read', 'Keep the drive and destroy it under chain of custody, using methods suited to dense flash media', 'Run a standard overwrite tool on it until it responds, then return it to the vendor for credit', 'Return it, provided the vendor signs a contract promising to destroy any data on the drive'], a: 1, b: 6,
      why: 'Failed drives can still hold readable data on their flash chips. Without encryption to crypto-erase, the safe path is retention and destruction suited to dense media, under chain of custody. Overwriting can’t run on a dead drive, and contractual promises don’t sanitise media.' } }
  ]
};

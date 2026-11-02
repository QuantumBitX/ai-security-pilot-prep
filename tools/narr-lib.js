/* Shared narration parsing (must match src/video.js parseSay/speakable) and audio hashing. */
const crypto = require('crypto');

function speakable(s) {
  return s.replace(/\be\.g\.,?/gi, 'for example,').replace(/\bi\.e\.,?/gi, 'that is,').replace(/\bvs\.?\s/gi, 'versus ')
    .replace(/&/g, ' and ').replace(/(\d)\s?%/g, '$1 percent').replace(/→/g, ' to ').replace(/\s+/g, ' ').trim();
}
function parseSay(say) {
  if (!say) return [];
  return String(say).split('|').map(s => s.trim()).filter(s => s.length).map(s => {
    const display = s.replace(/\{([^}~]+)~([^}]+)\}/g, '$1');
    const spoken = speakable(s.replace(/\{([^}~]+)~([^}]+)\}/g, '$2'));
    return { display, spoken };
  });
}
/* One entry per scene: the spoken text of each segment (an empty scene keeps one silent segment). */
function videoSegments(video) {
  return (video.scenes || []).map(sc => {
    const segs = parseSay(sc.say || (sc.t === 'quiz' ? sc.q : ''));
    return { t: sc.t, segs: segs.length ? segs : [{ display: '', spoken: '' }] };
  });
}
const VOICE = 'bf_emma';
const ENGINE = 'kokoro82m-fp32-s092-v2'; // change when the model, speed or G2P changes enough to need re-recording
function narrationHash(video) {
  const spoken = videoSegments(video).map(s => s.segs.map(g => g.spoken));
  return crypto.createHash('sha1').update(JSON.stringify([ENGINE, VOICE, spoken])).digest('hex').slice(0, 12);
}
module.exports = { speakable, parseSay, videoSegments, narrationHash, VOICE, ENGINE };

"""British English grapheme-to-phoneme conversion for Kokoro, using misaki's gold/silver lexicons.

A small, dependency-free reimplementation of the parts of misaki's English G2P that the course
narration needs: lexicon lookup with stress handling, suffix rules (-s, -ed, -ing), hyphenated
compounds, acronyms, numbers, and context-sensitive function words. Unknown words are reported
so they can be added to lexicon_custom.json.
"""
import json, os, re, unicodedata

DATA = os.environ.get('TTS_DATA', os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'tts-data'))
HERE = os.path.dirname(os.path.abspath(__file__))

STRESSES = 'ˌˈ'
PRIMARY, SECONDARY = 'ˈ', 'ˌ'
VOWELS = frozenset('AIOQWYaiuæɑɒɔəɛɜɪʊʌᵻ')
CONSONANTS = frozenset('bdfhjklmnpstvwzðŋɡɹɾʃʒʤʧθ')
DIPHTHONGS = frozenset('AIOQWYʤʧ')
PUNCTS = frozenset(';:,.!?—…"“”')
NON_QUOTE_PUNCTS = frozenset(';:,.!?—…')
GB_VOCAB = frozenset('AIQWYabdfhijklmnpstuvwzðŋɑɒɔəɛɜɡɪɹʃʊʌʒʤʧˈˌːθᵊɐ ')

# Acronyms spoken as words; everything else in capitals is spelled out letter by letter.
WORD_ACRONYMS = {
    'NIST': 'nˈɪst', 'RAG': 'ɹˈæɡ', 'HIPAA': 'hˈɪpə', 'ISO': 'ˈIsQ', 'OWASP': 'ˈQwɒsp', 'JSON': 'ʤˈAsən',
    'PEFT': 'pˈɛft', 'BLEU': 'blˈuː', 'ROUGE': 'ɹˈuːʒ', 'UNESCO': 'juːnˈɛskQ', 'SHAP': 'ʃˈæp', 'SOC': 'sˈɒk',
    'STAR': 'stˈɑː', 'RACI': 'ɹˈAsi', 'SISA': 'sˈiːsə', 'ATLAS': 'ˈætləs', 'MITRE': 'mˈItə', 'NATO': 'nˈAtQ',
    'AIBOM': 'ˌAˌI bˈɒm', 'AIBOMS': 'ˌAˌI bˈɒmz', 'SBOM': 'ˈɛs bɒm', 'SBOMS': 'ˈɛs bɒmz', 'GIF': 'ɡˈɪf',
    'CAPTCHA': 'kˈæpʧə', 'OAUTH': 'ˈQɔːθ', 'SAML': 'sˈæməl', 'FIDO': 'fˈIdQ', 'WASM': 'wˈɒzəm', 'PIN': 'pˈɪn',
    'PINS': 'pˈɪnz', 'LAN': 'lˈæn', 'WAN': 'wˈæn', 'VPN': None, 'NAS': 'nˈæz', 'SCIM': 'skˈɪm', 'CASB': 'kˈæzb',
    'SASE': 'sˈæsi', 'SOAR': 'sˈɔː', 'SIEM': 'sˈiːm', 'EDR': None, 'XDR': None, 'CVE': None, 'CVSS': None,
    'MOST': None, 'BEST': None, 'FIRST': None, 'LEAST': None, 'NOT': None, 'NEXT': None, 'LAST': None,
}
# Exam keywords written in capitals are ordinary words.
CAPS_AS_WORD = {'MOST', 'BEST', 'FIRST', 'LEAST', 'NOT', 'NEXT', 'LAST', 'MAIN', 'PRIMARY', 'ALWAYS', 'NEVER', 'ONLY', 'EXCEPT'}
# Tokens containing digits, spoken as given.
SPECIAL_TOKENS = {
    'ISC2': 'I S C squared', 'NIS2': 'niss two', 'C2PA': 'C two P A', 'A2A': 'A two A', 'F1': 'F one',
    '42001': 'forty-two thousand and one', '27001': 'twenty-seven thousand and one', '27701': 'twenty-seven seven oh one',
    '23894': 'twenty-three eight nine four', '22989': 'twenty-two nine eight nine', '24028': 'twenty-four oh two eight',
    '5338': 'fifty-three thirty-eight', 'NIS': 'niss', 'SP': 'S P', 'GPT-4': 'G P T four', 'L4': 'L four',
}

ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
        'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
ORD_IRREG = {'one': 'first', 'two': 'second', 'three': 'third', 'five': 'fifth', 'eight': 'eighth', 'nine': 'ninth', 'twelve': 'twelfth'}

def num_words(n):
    """Cardinal number in British style ('one hundred and five')."""
    if n < 0: return 'minus ' + num_words(-n)
    if n < 20: return ONES[n]
    if n < 100: return TENS[n // 10] + ('' if n % 10 == 0 else '-' + ONES[n % 10])
    if n < 1000:
        r = ONES[n // 100] + ' hundred'
        return r + (' and ' + num_words(n % 100) if n % 100 else '')
    for div, name in ((10**9, 'billion'), (10**6, 'million'), (1000, 'thousand')):
        if n >= div:
            r = num_words(n // div) + ' ' + name
            rest = n % div
            if rest == 0: return r
            return r + (' and ' if rest < 100 else ' ') + num_words(rest)
    return str(n)

def ordinal_words(n):
    w = num_words(n)
    head, _, last = w.rpartition(' ') if ' ' in w else ('', '', w)
    pre, sep, tail = last.rpartition('-')
    if tail in ORD_IRREG: tail = ORD_IRREG[tail]
    elif tail.endswith('y'): tail = tail[:-1] + 'ieth'
    else: tail = tail + 'th'
    last = (pre + sep + tail) if sep else tail
    return (head + ' ' + last) if head else last

def year_words(n):
    if 2000 <= n <= 2009: return 'two thousand' + ('' if n == 2000 else ' and ' + ONES[n % 10])
    if 1100 <= n <= 2099:
        hi, lo = divmod(n, 100)
        if lo == 0: return num_words(hi) + ' hundred'
        return num_words(hi) + ' ' + (('oh ' + ONES[lo]) if lo < 10 else num_words(lo))
    return num_words(n)

def expand_numbers(text):
    def money(m):
        sym, num, mult = m.group(1), m.group(2).replace(',', ''), (m.group(3) or '').strip()
        unit = {'$': 'dollars', '£': 'pounds', '€': 'euros'}[sym]
        if '.' in num:
            whole, frac = num.split('.')
            words = num_words(int(whole)) + ' point ' + ' '.join(ONES[int(d)] for d in frac)
        else:
            words = num_words(int(num))
        return f"{words} {mult + ' ' if mult else ''}{unit}"
    text = re.sub(r'([$£€])(\d[\d,]*(?:\.\d+)?)(\s?(?:million|billion|thousand|m|bn)\b)?', lambda m: money(m).replace(' m ', ' million ').replace(' bn ', ' billion '), text)
    def decimal(m):
        whole, frac = m.group(1), m.group(2)
        return num_words(int(whole)) + ' point ' + ' '.join(ONES[int(d)] for d in frac)
    text = re.sub(r'\b(\d+)\.(\d+)\b', decimal, text)
    text = re.sub(r'\b(\d+)(st|nd|rd|th)\b', lambda m: ordinal_words(int(m.group(1))), text)
    text = re.sub(r'\b(1[1-9]\d0|20\d0)s\b', lambda m: year_words(int(m.group(1))).replace('ty', 'ties') if m.group(1)[-2:] != '00' else year_words(int(m.group(1))) + 's', text)
    def plain(m):
        s = m.group(0).replace(',', '')
        n = int(s)
        if len(s) == 4 and 1100 <= n <= 2099 and ',' not in m.group(0): return year_words(n)
        return num_words(n)
    text = re.sub(r'\b\d{1,3}(?:,\d{3})+\b|\b\d+\b', plain, text)
    return text

class Lexicon:
    def __init__(self):
        self.golds = self.grow(json.load(open(os.path.join(DATA, 'gb_gold.json'), encoding='utf-8')))
        self.silvers = self.grow(json.load(open(os.path.join(DATA, 'gb_silver.json'), encoding='utf-8')))
        cpath = os.path.join(HERE, 'lexicon_custom.json')
        self.custom = json.load(open(cpath, encoding='utf-8')) if os.path.exists(cpath) else {}
        bad = {k: v for k, v in self.custom.items() if any(c not in GB_VOCAB for c in v)}
        if bad: raise ValueError(f'custom lexicon uses symbols outside the British vocabulary: {bad}')

    @staticmethod
    def grow(d):
        e = {}
        for k, v in d.items():
            if len(k) < 2: continue
            if k == k.lower():
                if k != k.capitalize(): e[k.capitalize()] = v
            elif k == k.lower().capitalize():
                e[k.lower()] = v
        return {**e, **d}

    def raw(self, word, tag=None):
        for src in (self.custom, self.golds, self.silvers):
            if word in src:
                ps = src[word]
                if isinstance(ps, dict): ps = ps.get(tag) if tag in ps else ps.get('DEFAULT')
                return ps
        return None

    def known(self, word):
        return word in self.custom or word in self.golds or word in self.silvers

def apply_stress(ps, stress):
    def restress(ps):
        ips = list(enumerate(ps))
        stresses = {}
        for i, p in ips:
            if p in STRESSES:
                j = next((j for j, v in ips[i:] if v in VOWELS), None)
                if j is not None: stresses[i] = j
        for i, j in stresses.items():
            ips[i] = (j - 0.5, ips[i][1])
        return ''.join(p for _, p in sorted(ips))
    if stress is None or ps is None: return ps
    if stress < -1: return ps.replace(PRIMARY, '').replace(SECONDARY, '')
    if stress == -1 or (stress in (0, -0.5) and PRIMARY in ps): return ps.replace(SECONDARY, '').replace(PRIMARY, SECONDARY)
    if stress in (0, 0.5, 1) and all(s not in ps for s in STRESSES):
        if all(v not in ps for v in VOWELS): return ps
        return restress(SECONDARY + ps)
    if stress >= 1 and PRIMARY not in ps and SECONDARY in ps: return ps.replace(SECONDARY, PRIMARY)
    if stress > 1 and all(s not in ps for s in STRESSES):
        if all(v not in ps for v in VOWELS): return ps
        return restress(PRIMARY + ps)
    return ps

class G2P:
    def __init__(self):
        self.lex = Lexicon()
        self.unknown = {}

    # ---------- spelling and suffix rules ----------
    def letters(self, word):
        ps = [self.lex.golds.get(c.upper()) for c in word if c.isalpha()]
        if any(p is None for p in ps): return None
        ps = apply_stress(''.join(ps), 0)
        head, sep, tail = ps.rpartition(SECONDARY)
        return (head + PRIMARY + tail) if sep else ps

    def _s(self, stem):
        if not stem: return None
        if stem[-1] in 'ptkfθ': return stem + 's'
        if stem[-1] in 'szʃʒʧʤ': return stem + 'ɪz'
        return stem + 'z'

    def _ed(self, stem):
        if not stem: return None
        if stem[-1] in 'pkfθʃsʧ': return stem + 't'
        if stem[-1] in 'dt': return stem + 'ɪd'
        return stem + 'd'

    def _ing(self, stem):
        if not stem or stem[-1] in 'əː': return None
        return stem + 'ɪŋ'

    def lookup(self, word, stress=None, tag=None):
        if word in WORD_ACRONYMS and WORD_ACRONYMS[word]: return WORD_ACRONYMS[word]
        ps = self.lex.raw(word, tag)
        if ps is None and word != word.lower(): ps = self.lex.raw(word.lower(), tag)
        return apply_stress(ps, stress) if ps else None

    def stem_rules(self, w, stress):
        lw = w.lower()
        cands = []
        if lw.endswith("'s") and len(lw) > 3: cands.append((lw[:-2], self._s))
        if lw.endswith('s') and len(lw) > 3 and not lw.endswith('ss'): cands.append((lw[:-1], self._s))
        if lw.endswith('es') and len(lw) > 4 and not lw.endswith('ies'): cands.append((lw[:-2], self._s))
        if lw.endswith('ies') and len(lw) > 4: cands.append((lw[:-3] + 'y', self._s))
        if lw.endswith('ed') and len(lw) > 4:
            cands += [(lw[:-1], self._ed), (lw[:-2], self._ed)]
            if len(lw) > 5 and lw[-3] == lw[-4]: cands.append((lw[:-3], self._ed))
            if lw.endswith('ied'): cands.append((lw[:-3] + 'y', self._ed))
        if lw.endswith('ing') and len(lw) > 5:
            cands += [(lw[:-3], self._ing), (lw[:-3] + 'e', self._ing)]
            if lw[-4] == lw[-5]: cands.append((lw[:-4], self._ing))
        for stem, fn in cands:
            ps = self.lookup(stem, stress)
            if ps:
                r = fn(ps)
                if r: return r
        return None

    def british_variants(self, lw):
        out = []
        for a, b in (('isation', 'ization'), ('ise', 'ize'), ('ised', 'ized'), ('ising', 'izing'), ('iser', 'izer'), ('isers', 'izers'),
                     ('yse', 'yze'), ('ysed', 'yzed'), ('ysing', 'yzing'), ('our', 'or'), ('ours', 'ors'), ('ogue', 'og'), ('tre', 'ter'),
                     ('lled', 'led'), ('lling', 'ling'), ('ence', 'ense')):
            if lw.endswith(a): out.append(lw[:-len(a)] + b)
        return out

    def derive(self, lw, stress):
        """Productive suffixes the lexicon lacks, e.g. tokenisation, minimisation."""
        for suf, add, keep_stem_stress in (('isations', 'IzˈAʃᵊnz', False), ('isation', 'IzˈAʃᵊn', False), ('izations', 'IzˈAʃᵊnz', False), ('ization', 'IzˈAʃᵊn', False),
                                           ('ised', 'Izd', True), ('ises', 'Izɪz', True), ('ise', 'Iz', True), ('ising', 'Izɪŋ', True), ('ability', 'əbˈɪlɪti', False),
                                           ('ness', 'nəs', True), ('less', 'ləs', True), ('ly', 'li', True), ('ers', 'əz', True), ('er', 'ə', True),
                                           ('ments', 'mənts', True), ('ment', 'mənt', True), ('able', 'əbᵊl', True), ('ful', 'fᵊl', True)):
            if lw.endswith(suf) and len(lw) - len(suf) >= 3:
                stem = lw[:-len(suf)]
                for s in (stem, stem + 'e', stem + 'y'):
                    ps = self.lookup(s, None) or self.stem_rules(s, None)
                    if ps:
                        if not keep_stem_stress: ps = ps.replace(PRIMARY, SECONDARY)
                        return ps + add
        return None

    def word(self, w, cap_stress=None):
        """Phonemes for one word token (no punctuation)."""
        if w in SPECIAL_TOKENS: return self.phrase(SPECIAL_TOKENS[w])
        if w in self.lex.custom: return self.lex.custom[w]
        if w.endswith("'") and len(w) > 2:  # plural possessive: owners'
            return self.word(w[:-1], cap_stress)
        if w.endswith("'s") and len(w) > 2 and (w[:-2].isupper() or w[:-2] in SPECIAL_TOKENS or re.search(r'\d', w[:-2]) or w[:-2] in self.lex.custom):
            base = self.word(w[:-2], cap_stress)
            return self._s(base) if base else None
        if w.isupper() and len(w) > 1 and w not in CAPS_AS_WORD:
            base, plural = (w[:-1], True) if w.endswith('S') and w[:-1] in WORD_ACRONYMS and WORD_ACRONYMS[w[:-1]] else (w, False)
            if base in WORD_ACRONYMS and WORD_ACRONYMS[base]:
                return self._s(WORD_ACRONYMS[base]) if plural else WORD_ACRONYMS[base]
            if w in self.lex.custom: return self.lex.custom[w]
            return self.letters(w)
        if re.fullmatch(r'[A-Z]{2,}s', w):  # GPUs, APIs, TEEs
            sp = self.letters(w[:-1])
            return self._s(sp) if sp else None
        if w.isupper() and w in CAPS_AS_WORD: w = w.lower()
        stress = cap_stress
        ps = self.lookup(w, stress)
        if ps: return ps
        lw = w.lower()
        ps = self.stem_rules(w, stress)
        if ps: return ps
        for v in self.british_variants(lw):
            ps = self.lookup(v, stress) or self.stem_rules(v, stress)
            if ps: return ps
        ps = self.derive(lw, stress)
        if ps: return ps
        if re.fullmatch(r'[A-Za-z]', w): return self.lex.golds.get(w.upper())
        ps = self.split_compound(lw)
        if ps: return ps
        return None

    PREFIXES = ('un', 're', 'de', 'non', 'sub', 'multi', 'super', 'hyper', 'over', 'under', 'anti', 'co', 'pre', 'post',
                'inter', 'intra', 'counter', 'semi', 'mis', 'out', 'cross', 'self', 'micro', 'meta', 'auto', 'cyber')

    def split_compound(self, lw, depth=0):
        """Closed compounds the lexicon lacks: lifecycle = life + cycle, unvetted = un + vetted."""
        if depth > 1 or len(lw) < 6: return None
        best = None
        for i in range(2, len(lw) - 2):
            left, right = lw[:i], lw[i:]
            if left in self.PREFIXES:
                lp = self.lex.raw(left) or {'un': 'ʌn', 're': 'ɹˌiː', 'co': 'kˌQ', 'mis': 'mˌɪs', 'pre': 'pɹˌiː', 'post': 'pˌQst'}.get(left)
            else:
                lp = self.lex.raw(left) if len(left) >= 3 else None
            if not lp: continue
            rp = self.lookup(right) or self.stem_rules(right, None) or (self.split_compound(right, depth + 1) if len(right) >= 6 else None)
            if not rp or len(right) < 3: continue
            score = (left in self.PREFIXES, min(len(left), len(right)))
            if best is None or score > best[0]: best = (score, left, lp, rp)
        if not best: return None
        _, left, lp, rp = best
        if left in self.PREFIXES:
            return apply_stress(lp, -1) + rp
        return lp + apply_stress(rp, -1)

    def compound(self, tok, cap_stress=None):
        if tok in SPECIAL_TOKENS: return self.phrase(SPECIAL_TOKENS[tok])
        whole = self.word(tok, cap_stress) if not re.search(r"[-/]", tok) else None
        if whole: return whole
        if '-' in tok or '/' in tok:
            ps_whole = self.lookup(tok, cap_stress)
            if ps_whole: return ps_whole
            parts = [p for p in re.split(r'[-/]', tok) if p]
            pss = [self.word(p) for p in parts]
            if any(p is None for p in pss):
                for p, x in zip(parts, pss):
                    if x is None: self.unknown[p] = self.unknown.get(p, 0) + 1
                return None
            # demote earlier primary stresses so the compound carries one main stress
            if sum(1 for p in pss if PRIMARY in p) > 1:
                pss = [apply_stress(p, -0.5) if i < len(pss) - 1 else p for i, p in enumerate(pss)]
            joiner = ' ' if '/' in tok else ''
            return joiner.join(pss)
        self.unknown[tok] = self.unknown.get(tok, 0) + 1
        return None

    # ---------- sentences ----------
    def normalise(self, text):
        text = unicodedata.normalize('NFKC', text)
        text = text.replace('’', "'").replace('‘', "'").replace('–', ' to ').replace('…', '… ')
        text = re.sub(r'(\d)\s*[x×]\b', r'\1 times', text)
        text = expand_numbers(text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def tokens(self, text):
        return re.findall(r"[A-Za-z0-9]+(?:['\-/][A-Za-z0-9]+)*'?|[;:,.!?—…\"“”()]", text)

    def phrase(self, text):
        return self.__call__(text)

    def __call__(self, text):
        text = self.normalise(text)
        toks = self.tokens(text)
        out = []  # list of (token, phonemes or None, is_punct)
        sentence_start = True
        for t in toks:
            if t in PUNCTS or t in '()':
                out.append((t, t, True))
                if t in '.!?': sentence_start = True
                continue
            cap = None
            if t != t.lower():
                cap = 2 if (t.isupper() and len(t) > 1) else 0.5
            out.append((t, None, False, sentence_start, cap))
            sentence_start = False
        # resolve right to left so function words can see the next word
        future_vowel = None
        res = [None] * len(out)
        for i in range(len(out) - 1, -1, -1):
            item = out[i]
            if item[2]:
                res[i] = item[1]
                if item[1] in NON_QUOTE_PUNCTS: future_vowel = None
                continue
            t, _, _, sstart, cap = item
            lw = t.lower()
            ps = None
            if lw == 'a' and (t == 'a' or sstart): ps = 'ɐ'
            elif t == 'A': ps = 'ˈA'
            elif lw == 'an': ps = 'ɐn'
            elif t == 'I': ps = 'ˌI'
            elif lw == 'the': ps = 'ði' if future_vowel else 'ðə'
            elif lw == 'to': ps = {None: self.lex.golds['to'], False: 'tə', True: 'tʊ'}[future_vowel]
            elif lw == 'in': ps = 'ɪn' if future_vowel is not None else 'ˈɪn'
            elif lw == 'used':
                nxt = next((o for o in out[i + 1:] if not o[2]), None)
                ps = self.lex.golds['used']['VBD'] if nxt and nxt[0].lower() == 'to' else self.lex.golds['used']['DEFAULT']
            else:
                ps = self.compound(t, cap)
            if ps is None:
                self.unknown[t] = self.unknown.get(t, 0) + 1
                ps = ''
            res[i] = ps
            first = next((c for c in ps if c in VOWELS or c in CONSONANTS), None)
            future_vowel = (first in VOWELS) if first else future_vowel
        # join: words separated by spaces, punctuation attached to the previous word
        s = ''
        for item, ps in zip(out, res):
            if item[2]:
                if ps in '(“"':
                    s += (' ' if s and not s.endswith(' ') else '') + ps
                else:
                    s = s.rstrip() + ps + ' '
            elif ps:
                if s and not s.endswith(' ') and not s.endswith(('(', '“', '"')): s += ' '
                s += ps
        return re.sub(r'\s+', ' ', s).strip()

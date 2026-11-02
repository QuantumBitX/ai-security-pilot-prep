"""Record the short voice sample played by Preferences -> Play a sample.   python3 -I tools/tts/sample.py"""
import os, sys
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
import synth
from g2p import G2P
from render import MODEL, VOICE, SPEED

TEXT = 'This is how your video lessons will sound. Prompt injection hides instructions inside content the model reads.'
k = synth.Kokoro(VOICE, threads=1, model=MODEL)
pcm = synth.to_int16(k(G2P()(TEXT), SPEED))
pcm = np.concatenate([np.zeros(int(0.15 * synth.SR), np.int16), pcm, np.zeros(int(0.3 * synth.SR), np.int16)])
os.makedirs(os.path.join(ROOT, 'audio'), exist_ok=True)
wav = os.path.join(ROOT, 'build', 'voice-sample.wav'); synth.write_wav(wav, pcm)
synth.encode_m4a(wav, os.path.join(ROOT, 'audio', 'voice-sample.m4a')); os.remove(wav)
print(f'audio/voice-sample.m4a · {pcm.size / synth.SR:.1f} s')

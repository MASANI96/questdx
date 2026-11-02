class RetroSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  private playTone(
    freq: number,
    startTimeOffset: number,
    duration: number,
    type: OscillatorType = 'square',
    gainValue = 0.06
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + startTimeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(gainValue, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playCursor() {
    this.playTone(660, 0, 0.045, 'square', 0.035);
  }

  public playOpenWindow() {
    this.playTone(523.25, 0, 0.055, 'square', 0.05);
    this.playTone(783.99, 0.055, 0.08, 'square', 0.05);
  }

  public playCloseWindow() {
    this.playTone(587.33, 0, 0.05, 'square', 0.045);
    this.playTone(392.0, 0.05, 0.07, 'square', 0.045);
  }

  public playQuestResolve() {
    // Classic RPG level-up / quest solve chime
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playTone(freq, idx * 0.075, idx === notes.length - 1 ? 0.24 : 0.08, 'square', 0.06);
    });
  }

  public playAllQuestClear() {
    // Classic RPG victory fanfare
    const melody: Array<[number, number, number]> = [
      [523.25, 0.0, 0.1],
      [523.25, 0.11, 0.1],
      [523.25, 0.22, 0.1],
      [523.25, 0.34, 0.26],
      [415.3, 0.62, 0.24],
      [466.16, 0.88, 0.24],
      [523.25, 1.14, 0.16],
      [466.16, 1.34, 0.1],
      [523.25, 1.46, 0.48],
    ];
    melody.forEach(([freq, offset, dur]) => {
      this.playTone(freq, offset, dur, 'square', 0.065);
    });
  }
}

export const retroSound = new RetroSoundEngine();

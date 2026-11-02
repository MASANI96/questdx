/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RotateCcw, ScrollText, Volume2, VolumeX, Wrench } from 'lucide-react';
import { QUEST_AREAS } from './data/questsData';
import { AreaId, QuestArea } from './types/quest';
import {
  PixelAreaScene,
  PixelCrownBadge,
  PixelExclamationBadge,
} from './components/PixelSprites';
import { QuestModal } from './components/QuestModal';
import { HistoryModal } from './components/HistoryModal';
import { retroSound } from './utils/retroSound';

const CIRCLED_NUMBERS = ['①', '②', '③', '④'];

export default function App() {
  const [resolvedIds, setResolvedIds] = useState<AreaId[]>([]);
  const [activeAreaIndex, setActiveAreaIndex] = useState<number | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [floatingSfx, setFloatingSfx] = useState<{ id: AreaId; text: string; key: number } | null>(
    null
  );

  const totalQuests = QUEST_AREAS.length;
  const resolvedCount = resolvedIds.length;
  const isAllCleared = resolvedCount === totalQuests;

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroSound.enabled = next;
    if (next) {
      retroSound.playCursor();
    }
  };

  const handleSelectArea = (area: QuestArea, index: number) => {
    const alreadyResolved = resolvedIds.includes(area.id);

    if (!alreadyResolved) {
      const nextResolved = [...resolvedIds, area.id];
      setResolvedIds(nextResolved);
      setFloatingSfx({ id: area.id, text: area.sfxText, key: Date.now() });

      if (nextResolved.length === totalQuests) {
        retroSound.playAllQuestClear();
      } else {
        retroSound.playQuestResolve();
      }
    } else {
      retroSound.playOpenWindow();
    }

    setActiveAreaIndex(index);
  };

  const handleCloseQuestModal = () => {
    retroSound.playCloseWindow();
    setActiveAreaIndex(null);
  };

  const handleOpenHistory = () => {
    retroSound.playOpenWindow();
    setIsHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    retroSound.playCloseWindow();
    setIsHistoryOpen(false);
  };

  const handleResetSimulation = () => {
    retroSound.playCloseWindow();
    setResolvedIds([]);
    setActiveAreaIndex(null);
    setFloatingSfx(null);
  };

  const activeArea = activeAreaIndex !== null ? QUEST_AREAS[activeAreaIndex] : null;

  return (
    <div className="min-h-screen rpg-floor-bg text-white flex flex-col">
      {/* 4.1 Top Bar (Status Area) */}
      <header className="sticky top-0 z-30 bg-[#09090b]/95 border-b-4 border-white shadow-[0_4px_0_0_rgba(255,255,255,0.25)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Zone 1: Title */}
          <h1 className="text-base sm:text-xl lg:text-2xl text-yellow-300 tracking-wider whitespace-nowrap shrink-0">
            DX QUEST 〜現場の悲鳴を解決せよ〜
          </h1>

          {/* Zone 2: Progress Counter + Gauge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm sm:text-base text-cyan-300 tabular-nums whitespace-nowrap">
              解決した現場: <strong className="text-yellow-300 text-base sm:text-lg">{resolvedCount}</strong> / {totalQuests}
            </span>
            <div
              className="hidden sm:flex items-center gap-1 p-1 border-2 border-slate-600 bg-slate-900"
              aria-hidden="true"
            >
              {QUEST_AREAS.map((q) => {
                const done = resolvedIds.includes(q.id);
                return (
                  <span
                    key={q.id}
                    className={`w-4 h-3 transition-colors ${
                      done ? 'bg-emerald-400' : 'bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Zone 3: 7-Year History Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleOpenHistory}
              onMouseEnter={() => retroSound.playCursor()}
              className="group rpg-btn px-3.5 py-2 text-xs sm:text-sm text-white flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-300"
            >
              <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity text-yellow-300">
                ▶
              </span>
              <ScrollText className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>[ 📜 7年の改善ヒストリー ]</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* ALL QUEST CLEAR Fanfare Banner */}
        {isAllCleared ? (
          <section
            className="rpg-window-gold p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            aria-live="polite"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <PixelCrownBadge />
                <h2 className="text-lg sm:text-2xl text-yellow-300">
                  ★ ALL QUEST CLEAR! 全ての非効率が解消されました！
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                業務の棚卸し・整理からシステム自動化、現場スタッフへの操作レクチャーまで一気通貫で伴走完了！各現場カードを再度クリックすると、いつでも解決内容を振り返ることができます。
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-emerald-300 pt-1 tabular-nums">
                <span>受付待ち 20%減・2人分省人化</span>
                <span aria-hidden="true">·</span>
                <span>診察室書類 月50h削減</span>
                <span aria-hidden="true">·</span>
                <span>経営集計 月20h削減・回収漏れゼロ</span>
                <span aria-hidden="true">·</span>
                <span>事務入力 30%削減・転記ミスゼロ</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetSimulation}
              onMouseEnter={() => retroSound.playCursor()}
              className="rpg-btn px-4 py-2.5 text-xs sm:text-sm text-white flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>初期状態にリセット</span>
            </button>
          </section>
        ) : (
          /* RPG Command Instruction Bar */
          <section className="rpg-window px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 bg-[#0f172a]">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-100">
              <span className="text-yellow-300 shrink-0">▶</span>
              <p>
                フロアマップ上の「<span className="text-red-400">！</span>
                」が出ている現場をクリックし、業務整理から現場定着までの解決プロセスをご確認ください。
              </p>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {resolvedCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetSimulation}
                  onMouseEnter={() => retroSound.playCursor()}
                  className="rpg-btn px-2.5 py-1.5 text-xs text-slate-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                  <span>リセット</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleToggleSound}
                className="rpg-btn px-2.5 py-1.5 text-xs text-cyan-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                    <span>効果音: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-slate-400">効果音: OFF</span>
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* 4.2 Main Area: DX Floor Map (4 Sites Grid) */}
        <section aria-label="DXフロアマップ（4つの現場拠点）">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="text-xs sm:text-sm text-cyan-300">
              ■ DX FLOOR MAP — 現場の課題マップ（全4エリア）
            </div>
            {isAllCleared && (
              <button
                type="button"
                onClick={handleToggleSound}
                className="text-xs text-slate-400 hover:text-yellow-300 flex items-center gap-1 cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? '効果音: ON' : '効果音: OFF'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUEST_AREAS.map((area, index) => {
              const isResolved = resolvedIds.includes(area.id);
              const circledNumber = CIRCLED_NUMBERS[index] ?? '';
              const showSfx = floatingSfx?.id === area.id;

              return (
                <article
                  key={area.id}
                  onClick={() => handleSelectArea(area, index)}
                  onMouseEnter={() => retroSound.playCursor()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectArea(area, index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${circledNumber} ${area.title} の解決詳細を見る`}
                  className={`group relative flex flex-col justify-between p-4 sm:p-5 cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-yellow-300 ${
                    isResolved ? 'rpg-window-emerald' : 'rpg-window'
                  }`}
                >
                  {/* Floating SFX Popup on First Resolution */}
                  {showSfx && (
                    <div
                      key={floatingSfx.key}
                      className="pointer-events-none absolute -top-4 right-4 z-20 bg-yellow-300 text-slate-950 px-3 py-1 border-2 border-white text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] animate-sfx-float"
                    >
                      {floatingSfx.text}
                    </div>
                  )}

                  {/* Card Top Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                          <span>{area.stageNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>{area.roleLabel}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl text-yellow-300">
                          {circledNumber} 【{area.title}】
                        </h3>
                      </div>

                      {/* Alert ! vs DX完了 Status */}
                      {!isResolved ? (
                        <div className="flex items-center gap-1.5 shrink-0 animate-pixel-alert">
                          <PixelExclamationBadge />
                          <span className="text-xs text-red-400 whitespace-nowrap">
                            SOS発生中
                          </span>
                        </div>
                      ) : (
                        <div className="border-2 border-emerald-400 bg-emerald-950/90 px-2.5 py-1 text-xs text-emerald-300 whitespace-nowrap shrink-0">
                          ★ DX完了！
                        </div>
                      )}
                    </div>

                    {/* Pixel Art Scene Frame */}
                    <div className="relative aspect-[16/9] w-full border-2 border-slate-700 bg-[#09090b] mb-4 overflow-hidden">
                      <PixelAreaScene areaId={area.id} resolved={isResolved} />
                    </div>

                    {/* Scream / After Voice Box */}
                    <div
                      className={`p-3 border mb-4 ${
                        isResolved
                          ? 'border-emerald-500/50 bg-[#071418]'
                          : 'border-red-400/60 bg-red-950/25'
                      }`}
                    >
                      <div
                        className={`text-xs mb-1 ${
                          isResolved ? 'text-emerald-300' : 'text-orange-300'
                        }`}
                      >
                        {isResolved ? '▼ 解決後の現場の声' : '▼ 現場の悲鳴'}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                        {isResolved ? area.afterVoice : area.scream}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Solution Bar + Command CTA */}
                  <div className="space-y-3 pt-2 border-t border-slate-700/80">
                    <div className="flex items-start gap-2 text-xs sm:text-sm">
                      <Wrench className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400">解決ツール：</span>
                        <span className="text-cyan-300">{area.solutionTitle}</span>
                      </div>
                    </div>

                    <div className="rpg-btn w-full py-2.5 px-4 text-center text-xs sm:text-sm text-white group-hover:text-yellow-300 group-hover:border-yellow-300 flex items-center justify-center gap-2 whitespace-nowrap">
                      <span className="transition-transform group-hover:translate-x-0.5">
                        ▶
                      </span>
                      <span>
                        {isResolved
                          ? '導入ソリューション・定量成果を詳しく見る'
                          : 'この現場の悲鳴をDXで解決する'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {/* Modals */}
      <QuestModal
        area={activeArea}
        areaIndex={activeAreaIndex ?? 0}
        onClose={handleCloseQuestModal}
      />

      <HistoryModal isOpen={isHistoryOpen} onClose={handleCloseHistory} />
    </div>
  );
}

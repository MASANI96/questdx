import React, { useEffect } from 'react';
import { Award, ScrollText } from 'lucide-react';
import { HISTORY_MILESTONES, SKILL_MASTERIES } from '../data/questsData';
import { retroSound } from '../utils/retroSound';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div
        className="rpg-window w-full max-w-4xl my-auto max-h-[90vh] flex flex-col bg-[#0f172a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-[#09090b] border-b-4 border-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <ScrollText className="w-5 h-5 text-yellow-300 shrink-0" />
            <h2
              id="history-modal-title"
              className="text-base sm:text-xl text-yellow-300 truncate"
            >
              7年間の改善ヒストリー 〜機械設計から現場自動化・AI伴走へ〜
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            onMouseEnter={() => retroSound.playCursor()}
            className="rpg-btn px-3 py-1.5 text-xs sm:text-sm text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-300"
          >
            [ × とじる ]
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ものづくりの機械設計現場で培った「現場構造への深い理解」を出発点に、Excel VBA・BI・RPA・GAS・Python、そして生成AI・Webアプリ開発へと領域を拡張し、一貫して現場担当者が使いやすい仕組みづくりを続けてきました。
          </p>

          {/* RPG Chronicle Timeline */}
          <section>
            <h3 className="text-sm sm:text-base text-cyan-300 mb-4">
              ■ 業務改善クロニクル（年表）
            </h3>

            <div className="relative pl-5 sm:pl-7 space-y-4 before:content-[''] before:absolute before:left-[7px] sm:before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-cyan-500/50">
              {HISTORY_MILESTONES.map((item, idx) => {
                const isLatest = idx === HISTORY_MILESTONES.length - 1;
                return (
                  <div
                    key={item.era}
                    className={`relative border-2 p-3.5 sm:p-4 ${
                      isLatest
                        ? 'border-yellow-400 bg-[#17150b]'
                        : 'border-slate-700 bg-[#09090b]'
                    }`}
                  >
                    {/* Pixel Timeline Node */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[21px] sm:-left-[25px] top-4 w-3 h-3 border-2 ${
                        isLatest
                          ? 'bg-yellow-300 border-white'
                          : 'bg-cyan-400 border-[#09090b]'
                      }`}
                    />

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <span
                        className={`text-sm sm:text-base tabular-nums ${
                          isLatest ? 'text-yellow-300' : 'text-cyan-300'
                        }`}
                      >
                        {item.era}
                      </span>
                      <span className="text-slate-500" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-xs text-emerald-300">{item.phaseLabel}</span>
                    </div>

                    <div className="text-sm sm:text-base text-white mb-1">
                      {item.summary}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skill Summary */}
          <section className="border-2 border-emerald-400 bg-[#07191e] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm sm:text-base text-emerald-300 mb-4">
              <Award className="w-5 h-5 shrink-0" />
              <h3>スキルサマリー（実務経験年数）</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_MASTERIES.map((skill) => {
                const ratioPercent = Math.min(100, Math.round((skill.years / 7) * 100));
                return (
                  <div
                    key={skill.name}
                    className="border border-slate-700 bg-[#09090b] p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm text-white">{skill.name}</span>
                      <span className="text-sm sm:text-base text-yellow-300 tabular-nums whitespace-nowrap shrink-0">
                        {skill.yearsText}
                      </span>
                    </div>

                    {/* Retro 7-segment bar */}
                    <div className="w-full h-2.5 bg-slate-800 border border-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-transform duration-200 origin-left"
                        style={{ transform: `scaleX(${ratioPercent / 100})` }}
                      />
                    </div>

                    <div className="text-xs text-slate-400">{skill.category}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

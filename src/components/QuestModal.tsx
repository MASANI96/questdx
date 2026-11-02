import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, TrendingDown, Users, Wrench } from 'lucide-react';
import { QuestArea } from '../types/quest';
import { PixelAreaScene } from './PixelSprites';
import { retroSound } from '../utils/retroSound';

interface QuestModalProps {
  area: QuestArea | null;
  areaIndex: number;
  onClose: () => void;
}

const CIRCLED_NUMBERS = ['①', '②', '③', '④'];

export const QuestModal: React.FC<QuestModalProps> = ({ area, areaIndex, onClose }) => {
  const [sceneMode, setSceneMode] = useState<'after' | 'before'>('after');
  const [dashboardSpan, setDashboardSpan] = useState<'monthly' | 'quarterly'>('monthly');

  useEffect(() => {
    setSceneMode('after');
    setDashboardSpan('monthly');
  }, [area?.id]);

  useEffect(() => {
    if (!area) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [area, onClose]);

  if (!area) return null;

  const circledNum = CIRCLED_NUMBERS[areaIndex] ?? '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quest-modal-title"
    >
      <div
        className="rpg-window w-full max-w-4xl my-auto max-h-[90vh] flex flex-col bg-[#0f172a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 bg-[#09090b] border-b-4 border-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-emerald-400 text-xs sm:text-sm whitespace-nowrap shrink-0">
              ★ DX完了！
            </span>
            <span className="text-slate-500" aria-hidden="true">
              /
            </span>
            <h2
              id="quest-modal-title"
              className="text-base sm:text-xl text-yellow-300 truncate"
            >
              {circledNum} 【{area.title}】
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

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Top Split: Pixel Diorama Switcher + Before/Solution Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Pixel Scene Box */}
            <div className="lg:col-span-5 flex flex-col justify-between border-2 border-slate-600 bg-[#09090b] p-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs text-slate-300">
                  現場の様子：{sceneMode === 'after' ? 'DX導入後' : '改善前'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      retroSound.playCursor();
                      setSceneMode('before');
                    }}
                    className={`px-2 py-1 text-xs border cursor-pointer transition-colors whitespace-nowrap ${
                      sceneMode === 'before'
                        ? 'border-orange-400 bg-orange-950/70 text-orange-300'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    Before
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      retroSound.playCursor();
                      setSceneMode('after');
                    }}
                    className={`px-2 py-1 text-xs border cursor-pointer transition-colors whitespace-nowrap ${
                      sceneMode === 'after'
                        ? 'border-emerald-400 bg-emerald-950/70 text-emerald-300'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    After
                  </button>
                </div>
              </div>

              <div className="aspect-[16/10] w-full border border-slate-800 overflow-hidden">
                <PixelAreaScene areaId={area.id} resolved={sceneMode === 'after'} />
              </div>

              <p
                className={`mt-2.5 text-xs leading-relaxed ${
                  sceneMode === 'after' ? 'text-emerald-300' : 'text-orange-300'
                }`}
              >
                {sceneMode === 'after' ? area.afterVoice : area.scream}
              </p>
            </div>

            {/* Right Overview: Scream -> Solution Weapon */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              <div className="border-2 border-red-400/70 bg-red-950/25 p-3.5">
                <div className="text-xs text-red-300 mb-1">
                  ▼ 解決前の課題（現場の悲鳴）
                </div>
                <p className="text-sm text-slate-100 leading-relaxed">{area.scream}</p>
              </div>

              <div className="border-2 border-cyan-400 bg-cyan-950/25 p-4 flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-cyan-300 mb-1.5">
                  <Wrench className="w-4 h-4 shrink-0" />
                  <span>装備した解決ソリューション</span>
                </div>
                <div className="text-base sm:text-lg text-yellow-300 mb-3">
                  『{area.solutionTitle}』
                </div>
                <ul className="space-y-1.5 text-sm text-slate-100">
                  {area.solutionItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 shrink-0">◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Quantitative Before / After Section */}
          <section className="border-2 border-emerald-400 bg-[#07191e] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm sm:text-base text-emerald-300 mb-3">
              <TrendingDown className="w-4 h-4 shrink-0" />
              <h3>定量的 Before / After（改善インパクト）</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {area.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="border border-emerald-500/40 bg-[#09090b] p-3.5 flex flex-col justify-between gap-2"
                >
                  <div className="text-xs text-slate-300">{metric.label}</div>
                  <div className="text-xs text-orange-300">
                    Before：{metric.beforeText}
                  </div>
                  <div className="pt-1 border-t border-slate-800 flex items-baseline gap-2">
                    <span className="text-xs text-emerald-400 shrink-0">After ▶</span>
                    <span className="text-base sm:text-xl text-yellow-300 tabular-nums">
                      {metric.afterHighlight}
                    </span>
                  </div>
                  {metric.subNote && (
                    <p className="text-xs text-slate-400">{metric.subNote}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Dark Dashboard Mini-Simulator for Stage 03 */}
          {area.hasDashboardPreview && (
            <section className="border-2 border-slate-600 bg-[#09090b] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="text-xs sm:text-sm text-cyan-300">
                  ■ ダークテーマ売上・請求ダッシュボード イメージプレビュー
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      retroSound.playCursor();
                      setDashboardSpan('monthly');
                    }}
                    className={`px-2.5 py-1 text-xs border cursor-pointer whitespace-nowrap ${
                      dashboardSpan === 'monthly'
                        ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    月別表示
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      retroSound.playCursor();
                      setDashboardSpan('quarterly');
                    }}
                    className={`px-2.5 py-1 text-xs border cursor-pointer whitespace-nowrap ${
                      dashboardSpan === 'quarterly'
                        ? 'border-cyan-400 bg-cyan-950/70 text-cyan-200'
                        : 'border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    四半期表示
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs tabular-nums">
                <div className="border border-slate-800 bg-slate-900/70 p-3">
                  <div className="text-slate-400">全社売上総額（{dashboardSpan === 'monthly' ? '当月' : '当四半期'}）</div>
                  <div className="text-lg text-white mt-1">
                    {dashboardSpan === 'monthly' ? '¥42,800,000' : '¥128,450,000'}
                  </div>
                  <div className="text-emerald-400 mt-0.5">入金進捗率：96.4%</div>
                </div>
                <div className="border border-slate-800 bg-slate-900/70 p-3">
                  <div className="text-slate-400">部署別突合ステータス</div>
                  <div className="text-lg text-cyan-300 mt-1">全4部署 リアルタイム同期済</div>
                  <div className="text-slate-400 mt-0.5">Excel手集計：不要（自動化済）</div>
                </div>
                <div className="border border-emerald-500/40 bg-emerald-950/20 p-3">
                  <div className="text-slate-400">未請求・回収遅延アラート</div>
                  <div className="text-lg text-emerald-300 mt-1">漏れ 0件（自動検知ON）</div>
                  <div className="text-yellow-300 mt-0.5">期日3日前に自動通知</div>
                </div>
              </div>
            </section>
          )}

          {/* Non-Engineer Accompaniment Section */}
          <section className="border-2 border-yellow-400/80 bg-[#17150b] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm sm:text-base text-yellow-300 mb-3">
              <Users className="w-4 h-4 shrink-0" />
              <h3>非エンジニアの現場に寄り添う「伴走支援」のポイント</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-slate-100">
              {area.accompanimentPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <Sparkles className="w-4 h-4 text-yellow-300 shrink-0 mt-1" />
                  <span>「{point}」</span>
                </li>
              ))}
            </ul>
            {area.footnote && (
              <p className="mt-3 pt-3 border-t border-yellow-500/30 text-xs sm:text-sm text-cyan-300">
                {area.footnote}
              </p>
            )}
          </section>

          {/* Deliverable External Links (Stage 04) */}
          {area.deliverableLinks && area.deliverableLinks.length > 0 && (
            <section className="pt-1">
              <div className="text-xs sm:text-sm text-cyan-300 mb-2.5">
                ▼ 稼働中の実物Webアプリを見る（クリックで別タブ展開）
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {area.deliverableLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => retroSound.playCursor()}
                    className="group rpg-btn flex items-center justify-between gap-2 px-4 py-3 text-sm text-cyan-300 hover:text-yellow-300"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        ▶
                      </span>
                      <span className="truncate">[ {link.label} ]</span>
                    </span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

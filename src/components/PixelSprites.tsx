import React from 'react';
import { AreaId } from '../types/quest';

interface SceneProps {
  areaId: AreaId;
  resolved: boolean;
}

/**
 * Pure SVG 16-bit Pixel Art Scenes (zero external PNG/JPG assets).
 * Renders distinct "Before (troubled)" and "After (DX solved)" pixel dioramas for each area.
 */
export const PixelAreaScene: React.FC<SceneProps> = ({ areaId, resolved }) => {
  switch (areaId) {
    case 'clinic-reception':
      return <ClinicReceptionSprite resolved={resolved} />;
    case 'clinic-exam':
      return <ClinicExamSprite resolved={resolved} />;
    case 'management-room':
      return <ManagementRoomSprite resolved={resolved} />;
    case 'back-office':
      return <BackOfficeSprite resolved={resolved} />;
  }
};

const ClinicReceptionSprite: React.FC<{ resolved: boolean }> = ({ resolved }) => (
  <svg
    viewBox="0 0 64 40"
    className="w-full h-full"
    shapeRendering="crispEdges"
    role="img"
    aria-label={resolved ? 'DX解決後のクリニック受付' : '混雑するクリニック受付'}
  >
    {/* Room Floor & Wall */}
    <rect x="0" y="0" width="64" height="24" fill={resolved ? '#0f2937' : '#1e1b2e'} />
    <rect x="0" y="24" width="64" height="16" fill={resolved ? '#133848' : '#27273a'} />
    <rect x="0" y="23" width="64" height="1" fill="#475569" />

    {/* Clinic Cross Sign */}
    <rect x="6" y="4" width="10" height="10" fill="#f8fafc" />
    <rect x="10" y="6" width="2" height="6" fill="#10b981" />
    <rect x="8" y="8" width="6" height="2" fill="#10b981" />

    {/* Reception Counter */}
    <rect x="20" y="18" width="22" height="10" fill="#cbd5e1" />
    <rect x="20" y="17" width="22" height="2" fill="#94a3b8" />

    {/* Receptionist Character */}
    <rect x="28" y="9" width="6" height="5" fill="#fde68a" />
    <rect x="27" y="7" width="8" height="3" fill="#334155" />
    <rect x="27" y="14" width="8" height="4" fill={resolved ? '#34d399' : '#fb7185'} />
    {/* Eyes / Smile */}
    <rect x="29" y="11" width="1" height="1" fill="#0f172a" />
    <rect x="32" y="11" width="1" height="1" fill="#0f172a" />

    {!resolved ? (
      <>
        {/* Ringing Red Phone + Sweat */}
        <rect x="21" y="14" width="4" height="3" fill="#ef4444" />
        <rect x="20" y="11" width="2" height="2" fill="#facc15" />
        <rect x="24" y="10" width="2" height="2" fill="#facc15" />
        <rect x="36" y="8" width="2" height="3" fill="#38bdf8" />

        {/* Paper stack on counter */}
        <rect x="36" y="13" width="5" height="4" fill="#f8fafc" />
        <rect x="37" y="14" width="3" height="1" fill="#94a3b8" />

        {/* Crowded Queue of 3 Waiting Patients */}
        <g>
          <rect x="46" y="16" width="5" height="5" fill="#fed7aa" />
          <rect x="46" y="14" width="5" height="2" fill="#7c2d12" />
          <rect x="45" y="21" width="7" height="9" fill="#f97316" />

          <rect x="53" y="17" width="5" height="5" fill="#fde68a" />
          <rect x="53" y="15" width="5" height="2" fill="#1e293b" />
          <rect x="52" y="22" width="7" height="9" fill="#fb7185" />

          <rect x="59" y="18" width="4" height="5" fill="#fed7aa" />
          <rect x="58" y="23" width="5" height="9" fill="#a855f7" />

          {/* Frustration mark */}
          <rect x="48" y="10" width="2" height="3" fill="#f87171" />
        </g>
      </>
    ) : (
      <>
        {/* Self Check-in Kiosk Terminal + QR / LINE Green Screen */}
        <rect x="47" y="11" width="10" height="19" fill="#e2e8f0" />
        <rect x="48" y="13" width="8" height="8" fill="#064e3b" />
        <rect x="50" y="15" width="4" height="4" fill="#34d399" />
        <rect x="46" y="30" width="12" height="2" fill="#64748b" />

        {/* Patient smoothly scanning LINE QR */}
        <rect x="10" y="17" width="5" height="5" fill="#fde68a" />
        <rect x="10" y="15" width="5" height="2" fill="#1e293b" />
        <rect x="9" y="22" width="7" height="9" fill="#22d3ee" />
        {/* Smartphone in hand */}
        <rect x="17" y="21" width="2" height="3" fill="#4ade80" />

        {/* Sparkle Pixels */}
        <rect x="43" y="8" width="2" height="2" fill="#fde047" />
        <rect x="59" y="9" width="2" height="2" fill="#34d399" />
      </>
    )}
  </svg>
);

const ClinicExamSprite: React.FC<{ resolved: boolean }> = ({ resolved }) => (
  <svg
    viewBox="0 0 64 40"
    className="w-full h-full"
    shapeRendering="crispEdges"
    role="img"
    aria-label={resolved ? 'DX解決後のクリニック診察室' : '残業中のクリニック診察室'}
  >
    {/* Wall & Night/Bright Window */}
    <rect x="0" y="0" width="64" height="24" fill={resolved ? '#0f2937' : '#131324'} />
    <rect x="0" y="24" width="64" height="16" fill={resolved ? '#163547' : '#1f2438'} />
    <rect x="0" y="23" width="64" height="1" fill="#475569" />

    {/* Window showing Midnight Moon (Before) vs Clear Day/Early Finish (After) */}
    <rect x="6" y="4" width="14" height="12" fill="#475569" />
    <rect x="7" y="5" width="12" height="10" fill={resolved ? '#0ea5e9' : '#09090b'} />
    {!resolved ? (
      <>
        <rect x="15" y="7" width="2" height="2" fill="#fde047" />
        <rect x="9" y="8" width="1" height="1" fill="#e2e8f0" />
      </>
    ) : (
      <>
        <rect x="9" y="7" width="6" height="2" fill="#f8fafc" />
        <rect x="14" y="6" width="3" height="3" fill="#fde047" />
      </>
    )}

    {/* Desk */}
    <rect x="22" y="21" width="32" height="4" fill="#94a3b8" />
    <rect x="24" y="25" width="3" height="9" fill="#64748b" />
    <rect x="49" y="25" width="3" height="9" fill="#64748b" />

    {/* PC Monitor */}
    <rect x="36" y="12" width="11" height="8" fill="#e2e8f0" />
    <rect
      x="37"
      y="13"
      width="9"
      height="6"
      fill={resolved ? '#059669' : '#dc2626'}
    />
    <rect x="40" y="20" width="3" height="1" fill="#cbd5e1" />

    {/* Doctor in White Coat */}
    <rect x="25" y="10" width="6" height="5" fill="#fed7aa" />
    <rect x="24" y="8" width="8" height="3" fill="#1e293b" />
    <rect x="24" y="15" width="8" height="6" fill="#f8fafc" />
    <rect x="27" y="16" width="2" height="4" fill="#0ea5e9" />
    <rect x="26" y="12" width="1" height="1" fill="#0f172a" />
    <rect x="29" y="12" width="1" height="1" fill="#0f172a" />

    {!resolved ? (
      <>
        {/* Towering Piles of Medical Documents */}
        <rect x="49" y="10" width="6" height="11" fill="#f1f5f9" />
        <rect x="50" y="12" width="4" height="1" fill="#94a3b8" />
        <rect x="50" y="15" width="4" height="1" fill="#94a3b8" />
        <rect x="50" y="18" width="4" height="1" fill="#94a3b8" />
        <rect x="56" y="14" width="5" height="7" fill="#e2e8f0" />

        {/* Sweat & Exhaustion */}
        <rect x="33" y="9" width="2" height="3" fill="#38bdf8" />
        <rect x="38" y="15" width="7" height="2" fill="#fca5a5" />
      </>
    ) : (
      <>
        {/* Python + AI Bot Helper Badge on Screen & Happy Patient Chair */}
        <rect x="38" y="15" width="5" height="2" fill="#a7f3d0" />
        <rect x="50" y="14" width="7" height="7" fill="#064e3b" />
        <rect x="51" y="15" width="5" height="5" fill="#34d399" />
        <rect x="52" y="16" width="1" height="1" fill="#09090b" />
        <rect x="54" y="16" width="1" height="1" fill="#09090b" />

        {/* Sparkle */}
        <rect x="33" y="7" width="2" height="2" fill="#fde047" />
        <rect x="58" y="10" width="2" height="2" fill="#34d399" />
      </>
    )}
  </svg>
);

const ManagementRoomSprite: React.FC<{ resolved: boolean }> = ({ resolved }) => (
  <svg
    viewBox="0 0 64 40"
    className="w-full h-full"
    shapeRendering="crispEdges"
    role="img"
    aria-label={resolved ? 'DX解決後の経営管理室' : 'Excelが散乱する経営管理室'}
  >
    <rect x="0" y="0" width="64" height="24" fill={resolved ? '#0c2434' : '#1f1928'} />
    <rect x="0" y="24" width="64" height="16" fill={resolved ? '#123246' : '#2a2236'} />
    <rect x="0" y="23" width="64" height="1" fill="#475569" />

    {!resolved ? (
      <>
        {/* Scattered Disconnected Excel Sheets Floating Around */}
        <rect x="7" y="5" width="11" height="9" fill="#f8fafc" />
        <rect x="7" y="5" width="11" height="2" fill="#16a34a" />
        <rect x="9" y="9" width="7" height="1" fill="#ef4444" />
        <rect x="9" y="11" width="5" height="1" fill="#94a3b8" />

        <rect x="46" y="4" width="12" height="10" fill="#f8fafc" />
        <rect x="46" y="4" width="12" height="2" fill="#16a34a" />
        <rect x="48" y="8" width="8" height="2" fill="#f97316" />

        <rect x="48" y="17" width="10" height="8" fill="#f8fafc" />
        <rect x="48" y="17" width="10" height="2" fill="#dc2626" />

        {/* Troubled Manager / Accountant */}
        <rect x="28" y="12" width="7" height="6" fill="#fde68a" />
        <rect x="27" y="10" width="9" height="3" fill="#334155" />
        <rect x="26" y="18" width="11" height="11" fill="#475569" />
        <rect x="31" y="19" width="1" height="5" fill="#ef4444" />
        {/* Question Marks */}
        <rect x="22" y="8" width="2" height="4" fill="#fb923c" />
        <rect x="38" y="8" width="2" height="4" fill="#f87171" />
      </>
    ) : (
      <>
        {/* Large Unified Dark-Theme Executive Dashboard Wall Monitor */}
        <rect x="16" y="3" width="38" height="18" fill="#e2e8f0" />
        <rect x="18" y="5" width="34" height="14" fill="#09090b" />
        {/* Rising Emerald Revenue Bars */}
        <rect x="21" y="14" width="4" height="3" fill="#22d3ee" />
        <rect x="27" y="12" width="4" height="5" fill="#22d3ee" />
        <rect x="33" y="9" width="4" height="8" fill="#34d399" />
        <rect x="39" y="7" width="4" height="10" fill="#fde047" />
        {/* Alert Zero Check Badge */}
        <rect x="45" y="7" width="5" height="5" fill="#10b981" />

        {/* Confident Executive */}
        <rect x="7" y="13" width="6" height="5" fill="#fde68a" />
        <rect x="6" y="11" width="8" height="3" fill="#334155" />
        <rect x="6" y="18" width="8" height="11" fill="#1e293b" />
        <rect x="9" y="19" width="2" height="5" fill="#38bdf8" />

        {/* Sparkle */}
        <rect x="56" y="6" width="2" height="2" fill="#fde047" />
      </>
    )}
  </svg>
);

const BackOfficeSprite: React.FC<{ resolved: boolean }> = ({ resolved }) => (
  <svg
    viewBox="0 0 64 40"
    className="w-full h-full"
    shapeRendering="crispEdges"
    role="img"
    aria-label={resolved ? 'DX解決後のバックオフィス事務室' : '手入力に追われるバックオフィス事務室'}
  >
    <rect x="0" y="0" width="64" height="24" fill={resolved ? '#0e2736' : '#231a29'} />
    <rect x="0" y="24" width="64" height="16" fill={resolved ? '#14364a' : '#2e2436'} />
    <rect x="0" y="23" width="64" height="1" fill="#475569" />

    {/* Office Desk */}
    <rect x="10" y="22" width="44" height="4" fill="#cbd5e1" />
    <rect x="12" y="26" width="3" height="8" fill="#64748b" />
    <rect x="49" y="26" width="3" height="8" fill="#64748b" />

    {/* Office Staff */}
    <rect x="29" y="11" width="6" height="5" fill="#fde68a" />
    <rect x="28" y="9" width="8" height="3" fill="#451a03" />
    <rect x="28" y="16" width="8" height="6" fill={resolved ? '#22d3ee' : '#f97316'} />
    <rect x="30" y="13" width="1" height="1" fill="#0f172a" />
    <rect x="33" y="13" width="1" height="1" fill="#0f172a" />

    {!resolved ? (
      <>
        {/* PDF Stacks Left & Right */}
        <rect x="12" y="11" width="7" height="11" fill="#f8fafc" />
        <rect x="13" y="12" width="5" height="2" fill="#ef4444" />
        <rect x="20" y="14" width="6" height="8" fill="#e2e8f0" />
        <rect x="21" y="15" width="4" height="2" fill="#ef4444" />

        <rect x="44" y="12" width="8" height="10" fill="#f8fafc" />
        <rect x="45" y="13" width="6" height="2" fill="#f97316" />

        {/* Sweat + Error X */}
        <rect x="38" y="9" width="2" height="3" fill="#38bdf8" />
        <rect x="39" y="16" width="3" height="3" fill="#ef4444" />
      </>
    ) : (
      <>
        {/* Clean Dual Web App Screens (Quote Comparison & AI Daily Report) */}
        <rect x="14" y="12" width="11" height="9" fill="#f8fafc" />
        <rect x="15" y="13" width="9" height="7" fill="#065f46" />
        <rect x="16" y="15" width="7" height="2" fill="#34d399" />

        <rect x="39" y="12" width="11" height="9" fill="#f8fafc" />
        <rect x="40" y="13" width="9" height="7" fill="#0e7490" />
        <rect x="41" y="15" width="7" height="2" fill="#fde047" />

        {/* Sparkles */}
        <rect x="11" y="8" width="2" height="2" fill="#fde047" />
        <rect x="52" y="8" width="2" height="2" fill="#34d399" />
      </>
    )}
  </svg>
);

export const PixelExclamationBadge: React.FC = () => (
  <svg
    viewBox="0 0 12 14"
    className="w-5 h-6 shrink-0"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <rect x="1" y="0" width="10" height="14" fill="#ef4444" />
    <rect x="0" y="1" width="12" height="12" fill="#ef4444" />
    <rect x="5" y="2" width="2" height="6" fill="#ffffff" />
    <rect x="5" y="10" width="2" height="2" fill="#ffffff" />
  </svg>
);

export const PixelCrownBadge: React.FC = () => (
  <svg
    viewBox="0 0 16 14"
    className="w-7 h-6 shrink-0"
    shapeRendering="crispEdges"
    aria-hidden="true"
  >
    <rect x="1" y="4" width="2" height="7" fill="#facc15" />
    <rect x="7" y="2" width="2" height="9" fill="#facc15" />
    <rect x="13" y="4" width="2" height="7" fill="#facc15" />
    <rect x="3" y="6" width="4" height="5" fill="#fde047" />
    <rect x="9" y="6" width="4" height="5" fill="#fde047" />
    <rect x="1" y="11" width="14" height="2" fill="#eab308" />
    <rect x="7" y="7" width="2" height="2" fill="#ef4444" />
  </svg>
);

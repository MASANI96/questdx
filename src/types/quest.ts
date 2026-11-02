export type AreaId = 'clinic-reception' | 'clinic-exam' | 'management-room' | 'back-office';

export interface QuantitativeMetric {
  label: string;
  beforeText: string;
  afterHighlight: string;
  subNote?: string;
}

export interface DeliverableLink {
  label: string;
  url: string;
}

export interface QuestArea {
  id: AreaId;
  stageNumber: string;
  title: string;
  roleLabel: string;
  scream: string;
  afterVoice: string;
  solutionTitle: string;
  solutionItems: string[];
  metrics: QuantitativeMetric[];
  accompanimentPoints: string[];
  footnote?: string;
  deliverableLinks?: DeliverableLink[];
  hasDashboardPreview?: boolean;
  sfxText: string;
}

export interface HistoryMilestone {
  era: string;
  phaseLabel: string;
  summary: string;
  detail: string;
}

export interface SkillMastery {
  name: string;
  years: number;
  yearsText: string;
  category: string;
}

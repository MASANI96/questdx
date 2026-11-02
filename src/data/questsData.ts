import { QuestArea, HistoryMilestone, SkillMastery } from '../types/quest';

export const QUEST_AREAS: QuestArea[] = [
  {
    id: 'clinic-reception',
    stageNumber: 'STAGE 01',
    title: 'クリニック受付エリア',
    roleLabel: '受付スタッフ・来院患者',
    scream:
      '「電話予約の対応でパンク！受付に行列ができ、会計や書類対応でスタッフが疲弊している…」',
    afterVoice:
      '「LINEと自動チェックイン機で受付がスムーズに！スタッフも笑顔で丁寧な応対に集中できています」',
    solutionTitle: 'LINE予約連携 ＆ 自動チェックインシステム',
    solutionItems: [
      'LINE電子診察券の構築・予約導線の一元化',
      '会計用QRコード送付機能によるスムーズ精算',
      '診断書などの書類作成依頼フォーム設置',
      '無人自動チェックイン機の構築・現場導入',
    ],
    metrics: [
      {
        label: '受付待ち時間',
        beforeText: '電話と窓口対応が重なり常時混雑',
        afterHighlight: '20% 削減',
      },
      {
        label: '必要な受付スタッフ体制',
        beforeText: '複数名での手作業対応が必須',
        afterHighlight: '2人分 削減（省人化・無人化達成）',
      },
    ],
    accompanimentPoints: [
      '患者さん側が迷わないLINE導線設計（高齢の患者様でも直感的にタップできる画面構成）',
      'ITが苦手な受付スタッフへの丁寧な操作レクチャーとマニュアル整備まで一貫して伴走',
    ],
    sfxText: 'ピロリン♪ 自動チェックイン稼働！',
  },
  {
    id: 'clinic-exam',
    stageNumber: 'STAGE 02',
    title: 'クリニック診察室',
    roleLabel: '医師・医療クラーク',
    scream:
      '「診察後の電子カルテ入力と書類の下書き作成で毎日深夜残業…患者と向き合う時間が削られる」',
    afterVoice:
      '「既存カルテのまま自動化＆AI下書きが完成！診察後の書類残業が激減し、診療に専念できます」',
    solutionTitle: '電子カルテPython自動化 ＆ 書類下書きAI',
    solutionItems: [
      'Pythonを用いた既存電子カルテの自動操作スクリプト構築',
      '生成AIを活用した診断書・紹介状・各種医療書類の下書き自動生成',
    ],
    metrics: [
      {
        label: '書類作成時間',
        beforeText: '診療後に毎日手入力で深夜残業',
        afterHighlight: '月50時間 削減',
        subNote: '医師が患者様と向き合う本来の診療時間を確保',
      },
    ],
    accompanimentPoints: [
      '高額なカルテシステムの改修を行わず、既存カルテのままPythonで自動化（低コスト・短納期）',
      '医療現場特有の言い回しや院内ルールを丁寧にヒアリングし、AIプロンプトを徹底チューニング',
    ],
    sfxText: 'シャキーン！ 書類下書きAI発動！',
  },
  {
    id: 'management-room',
    stageNumber: 'STAGE 03',
    title: '経営管理室（売上・請求）',
    roleLabel: '経営者・経理責任者',
    scream:
      '「部署ごとにExcelがバラバラで売上や入金状況がリアルタイムに分からない！未請求の回収漏れが怖い…」',
    afterVoice:
      '「全社・部署別の売上と入金状況がひと目で把握可能に！未請求アラートで回収漏れもゼロになりました」',
    solutionTitle: '請求台帳・売上入金管理ダッシュボード',
    solutionItems: [
      '全社・部署別の売上／未請求総額のリアルタイム可視化',
      '月別・四半期別の入金進捗グラフ表示',
      '請求漏れ・入金遅延を防ぐ未請求アラート機能',
    ],
    metrics: [
      {
        label: '集計作業工数',
        beforeText: '各部署のExcelを手作業で突合・集計',
        afterHighlight: '月20時間 削減',
      },
      {
        label: '経営管理・ガバナンス成果',
        beforeText: '請求漏れリスク・月末まで数字が不明',
        afterHighlight: '未請求・入金回収漏れの完全防止、経営判断の即時化',
      },
    ],
    accompanimentPoints: [
      '「どこから手をつけていいか分からない」状態からの数字の棚卸しと業務フロー整理から伴走',
      '数字やシステムが苦手な担当者でも一目で直感的に分かるダークテーマダッシュボードUIの設計',
    ],
    footnote: '※面談時に実物モックを直接ご提示してご説明します。',
    hasDashboardPreview: true,
    sfxText: 'テレテテッテテー♪ 経営数字を完全可視化！',
  },
  {
    id: 'back-office',
    stageNumber: 'STAGE 04',
    title: 'バックオフィス・事務室',
    roleLabel: '事務・購買・管理スタッフ',
    scream:
      '「バラバラの形式で届くPDF請求書の手入力、日報の集計、相見積もりの比較で毎日手作業のミスが多発…」',
    afterVoice:
      '「PDF仕訳も相見積もり比較も日報管理もWebアプリ＆AIで自動化！転記ミスゼロの快適な事務室に！」',
    solutionTitle: 'Python×GAS×AI 自動仕訳 ＆ 業務特化Webアプリ',
    solutionItems: [
      'PDF請求書のAI自動振り分け・内容自動チェック機構',
      '会議議事録からの提出資料・報告書自動生成',
      '購買相見積もり比較Webシステム（Vercel稼働中）',
      'AI日報作成・管理システム（Vercel稼働中）',
    ],
    metrics: [
      {
        label: '入力・突合作業工数',
        beforeText: '目視確認と手入力による転記ミスが頻発',
        afterHighlight: '30% 削減（転記ミスゼロ化）',
      },
    ],
    accompanimentPoints: [
      '現場の愚痴や細かな作業フローをじっくりヒアリングし、属人化していた事務作業を完全に仕組み化',
      '専門知識のない非エンジニアスタッフでも迷わず直感的に使える業務特化Webアプリとして提供',
    ],
    deliverableLinks: [
      {
        label: '相見積比較システムを見る (外部リンク)',
        url: 'https://purchase-quote-comparison-system-xi.vercel.app/',
      },
      {
        label: 'AI日報システムを見る (外部リンク)',
        url: 'https://ai-daily-reporting-system-9qan.vercel.app/reports',
      },
    ],
    sfxText: 'ズバッ！ 属人化ルーチンを一掃！',
  },
];

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    era: '2019年以前',
    phaseLabel: 'ORIGIN：ものづくり現場の原体験',
    summary: '機械設計業務に従事',
    detail: '現場の物理構造や図面、泥臭いものづくりの解像度と「現場目線で考える姿勢」を獲得。',
  },
  {
    era: '2019年〜',
    phaseLabel: 'LV.1：手作業改善の第一歩',
    summary: 'VBAによるExcel差異比較・データ整理自動化',
    detail: '目の前の担当者が苦しむ手作業・目視チェックの改善から業務効率化キャリアをスタート。',
  },
  {
    era: '2020年〜',
    phaseLabel: 'LV.2：データ可視化への拡張',
    summary: 'Power BIダッシュボードによる社内分析ツールの構築',
    detail: '散在する社内データを統合し、意思決定につながるデータの可視化基盤を構築。',
  },
  {
    era: '2021年〜',
    phaseLabel: 'LV.3：システム間連携の自動化',
    summary: 'RPA (Power Automate Desktop) による基幹システム連携自動化',
    detail: 'APIを持たないレガシー基幹システムとExcel間の定型転記・連携作業を無人化。',
  },
  {
    era: '2022年〜',
    phaseLabel: 'LV.4：現場データベース構築',
    summary: 'VBA × RPA 部品情報データベース化・検索修正ツールの開発',
    detail: '複雑な部品情報の検索・一括修正を誰でも扱える業務ツールとしてパッケージ化。',
  },
  {
    era: '2023年〜',
    phaseLabel: 'LV.5：独立・エンタープライズ伴走支援',
    summary: 'ITエンジニアフリーランスとして独立',
    detail: '大手人材派遣会社等にて、VBA / GAS / RPA / Chrome拡張を組み合わせた現場密着の業務改善を推進。',
  },
  {
    era: '2025年〜現在',
    phaseLabel: 'LV.MAX：AI統合 × 業務特化Webアプリ × 無人化DX',
    summary: 'Python × GAS × 生成AI連携、Webアプリ開発、クリニックDX（無人化支援）',
    detail: '上流の業務整理からAI組み込み開発、現場スタッフへの操作レクチャーまで一気通貫で伴走。',
  },
];

export const SKILL_MASTERIES: SkillMastery[] = [
  {
    name: 'RPA (Power Automate Desktop)',
    years: 7,
    yearsText: '7年',
    category: '業務自動化・基幹連携',
  },
  {
    name: 'Excel VBA',
    years: 7,
    yearsText: '7年',
    category: '定型処理・ツール開発',
  },
  {
    name: 'GAS (Google Apps Script)',
    years: 7,
    yearsText: '7年',
    category: 'クラウド連携・自動化',
  },
  {
    name: 'Excel (ピボット / パワークエリ)',
    years: 7,
    yearsText: '7年',
    category: 'データ整形・集計設計',
  },
  {
    name: 'Python',
    years: 5,
    yearsText: '5年',
    category: 'カルテ自動操作・データ処理',
  },
  {
    name: 'AI活用・プロンプト開発',
    years: 2,
    yearsText: '2年',
    category: '書類生成・自動仕訳AI',
  },
];

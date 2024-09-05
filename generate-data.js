const fs = require('fs');

const skillCategories = [
  ["言語", ["Java", "Kotlin", "TypeScript", "JavaScript", "Python", "Ruby", "PHP", "Go", "C", "C++", "C#", "Swift"]],
  ["フレームワーク", ["Spring", "SpringBoot", "Laravel", "Ruby on Rails", "Django", "Flask", "Express", "React", "Vue.js", "Angular", "Next.js"]],
  ["クラウド", ["AWS", "GCP", "Azure", "Firebase", "Heroku"]],
  ["OS", ["Linux", "Windows", "Mac"]],
  ["その他", ["Git", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum"]]
];

const projectDetails = {
  "フロントエンドエンジニア": {
    titles: [
      "【継続先社員×2】大手ECサイトのフロントエンド開発案件",
      "【急募】新規SNSアプリのフロントエンドエンジニア募集",
      "【高報酬】金融系Webアプリのフロントエンド開発",
      "【リモート可】ヘルスケアプラットフォームのフロントエンド開発",
      "【大手企業】社内システムのフロントエンドリニューアル案件"
    ],
    descriptions: [
      "最新のWeb技術を活用した大規模プロジェクトに参加し、ユーザーインターフェースの設計と実装を担当します。チームでの協力が重要で、高度な技術力が求められます。3年以上のフロントエンド開発経験が必要です。ReactやVue.jsを使用したプロジェクトの経験がある方を歓迎します。",
      "フロントエンドの最新技術を駆使して、ユーザー体験を向上させるプロジェクトです。設計から実装、テストまで一貫して担当していただきます。2年以上の実務経験が必要です。ReactやVue.jsの経験が必須です。",
      "高報酬のフロントエンドエンジニア案件です。リーダーシップを発揮してチームを牽引し、プロジェクトの成功に貢献してください。5年以上のフロントエンド開発経験と、チームリーダーとしての経験が求められます。",
      "リモートワーク可能なフロントエンドエンジニアポジションです。柔軟な働き方が可能で、最新の技術を使用した開発に携わることができます。3年以上の実務経験が必要です。ReactやVue.jsの経験が必須です。",
      "大手企業でのフロントエンドエンジニア募集。安定した環境でスキルを磨きながら、ユーザーインターフェースの最適化に取り組んでいただきます。2年以上の実務経験が必要です。ReactやVue.jsの経験が必須です。"
    ],
    additionalTexts: [
      "ユーザーインターフェースの最適化とパフォーマンス向上",
      "新規機能の設計と実装",
      "既存システムのリファクタリングと最適化",
      "レスポンシブデザインの実装",
      "アクセシビリティの向上"
    ]
  },
  "バックエンドエンジニア": {
    titles: [
      "【急募】大手金融機関向けバックエンドシステム開発",
      "【高報酬】新規決済プラットフォームのバックエンド開発",
      "【リモート可】クラウドサービスのバックエンドエンジニア募集",
      "【大手企業】社内データ管理システムのバックエンド開発",
      "【注目】IoTデバイス連携システムのバックエンド開発"
    ],
    descriptions: [
      "バックエンドの最新技術を駆使して、システムの安定性とパフォーマンスを向上させるプロジェクトです。JavaやPythonを使用した開発経験がある方を募集しています。3年以上のバックエンド開発経験が必要です。",
      "高報酬のバックエンドエンジニア案件です。高度な技術力が求められ、データベース設計やAPI開発に携わっていただきます。5年以上のバックエンド開発経験と、データベース設計の経験が求められます。",
      "リモートワーク可能なバックエンドエンジニアポジションです。柔軟な働き方が可能で、クラウド環境での開発経験がある方を歓迎します。3年以上の実務経験が必要です。AWSやGCPの経験がある方を歓迎します。",
      "大手企業でのバックエンドエンジニア募集。安定した環境でスキルを磨きながら、システムの最適化とスケーラビリティの向上に取り組んでいただきます。2年以上の実務経験が必要です。JavaやPythonの経験が必須です。",
      "注目のバックエンドエンジニア案件です。最新技術を活用したプロジェクトに参加し、システムの設計と実装を担当します。3年以上の実務経験が必要です。JavaやPythonの経験が必須です。"
    ],
    additionalTexts: [
      "高可用性システムの設計と実装",
      "APIの設計と開発",
      "データベースの設計と最適化",
      "マイクロサービスアーキテクチャの導入",
      "クラウド環境でのデプロイと運用"
    ]
  },
  "フルスタックエンジニア": {
    titles: [
      "【高報酬】新規Webサービスのフルスタック開発",
      "【急募】スタートアップ向けフルスタックエンジニア募集",
      "【リモート可】Eコマースプラットフォームのフルスタック開発",
      "【大手企業】社内業務システムのフルスタックエンジニア募集",
      "【注目】AI活用プロジェクトのフルスタック開発"
    ],
    descriptions: [
      "フルスタックエンジニアとして、フロントエンドとバックエンドの両方を担当するプロジェクトです。ReactやNode.jsを使用した開発経験がある方を募集しています。3年以上のフルスタック開発経験が必要です。",
      "急募のフルスタックエンジニア案件です。幅広い技術力が求められ、プロジェクトの全体像を把握しながら開発を進めていただきます。5年以上のフルスタック開発経験が必要です。",
      "リモートワーク可能なフルスタックエンジニアポジションです。柔軟な働き方が可能で、最新の技術を使用した開発に携わることができます。3年以上の実務経験が必要です。ReactやNode.jsの経験が必須です。",
      "大手企業でのフルスタックエンジニア募集。安定した環境でスキルを磨きながら、フロントエンドとバックエンドの両方に携わっていただきます。2年以上の実務経験が必要です。ReactやNode.jsの経験が必須です。",
      "注目のフルスタックエンジニア案件です。最新技術を活用したプロジェクトに参加し、システム全体の設計と実装を担当します。3年以上の実務経験が必要です。ReactやNode.jsの経験が必須です。"
    ],
    additionalTexts: [
      "フロントエンドとバックエンドの統合開発",
      "新規機能の設計と実装",
      "既存システムのリファクタリングと最適化",
      "クラウド環境でのデプロイと運用",
      "データベースの設計と最適化"
    ]
  },
  "PM": {
    titles: [
      "【リモート可】大手企業のプロジェクトマネージャー募集",
      "【急募】新規プロジェクトのPMポジション",
      "【高報酬】グローバルプロジェクトのPM案件",
      "【大手企業】社内システム開発のプロジェクトマネージャー",
      "【注目】AIプロジェクトのPM募集"
    ],
    descriptions: [
      "プロジェクトマネージャーとして、プロジェクト全体の進行管理を担当するポジションです。チームのリーダーシップを発揮し、プロジェクトの成功に貢献してください。5年以上のプロジェクトマネジメント経験が必要です。",
      "急募のプロジェクトマネージャー案件です。リーダーシップが求められ、プロジェクトの計画と実行を担当していただきます。3年以上のプロジェクトマネジメント経験が必要です。",
      "高報酬のプロジェクトマネージャー案件です。高度なマネジメントスキルが求められ、複数のプロジェクトを同時に管理していただきます。5年以上のプロジェクトマネジメント経験が必要です。",
      "大手企業でのプロジェクトマネージャー募集。安定した環境でスキルを磨きながら、プロジェクトの進行管理とチームの調整を担当していただきます。3年以上のプロジェクトマネジメント経験が必要です。",
      "注目のプロジェクトマネージャー案件です。最新技術を活用したプロジェクトに参加し、プロジェクトの成功に向けてリーダーシップを発揮してください。5年以上のプロジェクトマネジメント経験が必要です。"
    ],
    additionalTexts: [
      "プロジェクトの計画と進行管理",
      "チームのリーダーシップと調整",
      "リスク管理と問題解決",
      "ステークホルダーとのコミュニケーション",
      "プロジェクトの成果物の品質管理"
    ]
  },
  "PL": {
    titles: [
      "【大手企業】社内システム開発のプロジェクトリーダー募集",
      "【急募】新規プロジェクトのPLポジション",
      "【高報酬】グローバルプロジェクトのPL案件",
      "【リモート可】クラウドサービスのプロジェクトリーダー",
      "【注目】AIプロジェクトのプロジェクトリーダー募集"
    ],
    descriptions: [
      "プロジェクトリーダーとして、チームのリーダーシップを発揮するポジションです。プロジェクトの計画と実行を担当し、チームの成功に貢献してください。5年以上のプロジェクトリーダー経験が必要です。",
      "急募のプロジェクトリーダー案件です。リーダーシップが求められ、プロジェクトの進行管理とチームの調整を担当していただきます。3年以上のプロジェクトリーダー経験が必要です。",
      "高報酬のプロジェクトリーダー案件です。高度なマネジメントスキルが求められ、複数のプロジェクトを同時に管理していただきます。5年以上のプロジェクトリーダー経験が必要です。",
      "リモートワーク可能なプロジェクトリーダーポジションです。柔軟な働き方が可能で、チームのリーダーシップを発揮してプロジェクトを成功に導いてください。3年以上のプロジェクトリーダー経験が必要です。",
      "注目のプロジェクトリーダー案件です。最新技術を活用したプロジェクトに参加し、プロジェクトの成功に向けてリーダーシップを発揮してください。5年以上のプロジェクトリーダー経験が必要です。"
    ],
    additionalTexts: [
      "プロジェクトの計画と進行管理",
      "チームのリーダーシップと調整",
      "リスク管理と問題解決",
      "ステークホルダーとのコミュニケーション",
      "プロジェクトの成果物の品質管理"
    ]
  }
};

const generateProjectName = (skills, tags) => {
  const jobType = tags.find(tag => projectDetails[tag]);
  const details = projectDetails[jobType] || projectDetails["フロントエンドエンジニア"];
  const baseTitle = details.titles[Math.floor(Math.random() * details.titles.length)];
  const skillText = skills.map(s => s.skill).join(", ");
  const additionalText = details.additionalTexts[Math.floor(Math.random() * details.additionalTexts.length)];
  return `${baseTitle} - 必須スキル: ${skillText} - ${additionalText}`;
};

const generateDescription = (tags) => {
  const jobType = tags.find(tag => projectDetails[tag]);
  const details = projectDetails[jobType] || projectDetails["フロントエンドエンジニア"];
  return details.descriptions[Math.floor(Math.random() * details.descriptions.length)];
};

const generatePrice = () => {
  const lower = Math.floor(Math.random() * 12 + 9) * 5;
  const upper = Math.floor(Math.random() * ((120 - lower) / 5) + 1) * 5 + lower;
  return Math.random() > 0.5 ? { lower, upper } : { lower: null, upper };
};

const generateTags = () => {
  const jobTypes = ["フロントエンジニア", "バックエンドエンジニア", "フルスタックエンジニア", "PM", "PL"];
  const remoteOptions = ["フルリモート", "一部リモート", "常駐"];
  const commercialFlows = ["エンド直", "1次請", "2次請"];

  return [
    jobTypes[Math.floor(Math.random() * jobTypes.length)],
    remoteOptions[Math.floor(Math.random() * remoteOptions.length)],
    commercialFlows[Math.floor(Math.random() * commercialFlows.length)]
  ];
};

const generateSkills = () => {
  const skills = [];
  const usedCategories = new Set();

  for (let i = 0; i < 3; i++) {
    const categoryIndex = Math.floor(Math.random() * skillCategories.length);
    const [category, categorySkills] = skillCategories[categoryIndex];

    if (!usedCategories.has(category)) {
      const skill = categorySkills[Math.floor(Math.random() * categorySkills.length)];
      skills.push({ category, skill });
      usedCategories.add(category);
    }
  }

  return skills;
};

const generateProject = (index) => {
  const price = generatePrice();
  const skills = generateSkills();
  const tags = generateTags();
  return {
    id: `#CM${9800 + index}`,
    date: "24.8.1",
    name: generateProjectName(skills, tags),
    price: price.lower ? `${price.lower}〜${price.upper}万` : `〜${price.upper}万`,
    tags: tags,
    skills: skills,
    company: `株式会社xyz${index.toString().padStart(5, '0')}`,
    start_date: ["24.9.1", "24.10.1", "即日"][Math.floor(Math.random() * 3)],
    description: generateDescription(tags),
    require_skill: skills.map(s => s.skill).join(", ") + ", Git, Docker",
    desirable_skill: "Next.js, GraphQL, Kubernetes",
    remuneration: price.lower ? `${price.lower}〜${price.upper}万円` : `〜${price.upper}万円`,
    location: ["東京都渋谷区", "東京都新宿区", "東京都港区", "神奈川県横浜市"][Math.floor(Math.random() * 4)],
    remotework_text: ["フルリモート可能", "週3日まで可能", "月数回のみ可能"][Math.floor(Math.random() * 3)],
    foreign_worker_text: Math.random() > 0.7 ? "VISA取得支援あり" : "要相談",
    sole_proprietorship_text: Math.random() > 0.6 ? "条件付きで可" : "不可",
    usance: "月末締め翌月末払い",
    interview: "オンライン",
    interview_count: Math.floor(Math.random() * 3) + 1,
    business_flow: ["エンド直", "1次請", "2次請"][Math.floor(Math.random() * 3)],
    received_date: "2024-08-01",
    from_address: `recruit@xyz${index.toString().padStart(5, '0')}.co.jp`,
    is_attachment: Math.random() > 0.5
  };
};

const projects = Array.from({ length: 1000 }, (_, i) => generateProject(i));

const data = { projects };

fs.writeFileSync('case.json', JSON.stringify(data, null, 2));

console.log('Data generated and saved to case.json');
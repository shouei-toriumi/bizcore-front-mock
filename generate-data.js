const fs = require('fs');

const skillCategories = [
  ["言語", ["Java", "Kotlin", "TypeScript", "JavaScript", "Python", "Ruby", "PHP", "Go", "C", "C++", "C#", "Swift"]],
  ["フレームワーク", ["Spring", "SpringBoot", "Laravel", "Ruby on Rails", "Django", "Flask", "Express", "React", "Vue.js", "Angular", "Next.js"]],
  ["クラウド", ["AWS", "GCP", "Azure", "Firebase", "Heroku"]],
  ["OS", ["Linux", "Windows", "Mac"]],
  ["その他", ["Git", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum"]]
];

const generateProjectName = () => {
  const baseTitle = "【継続先社員×2 (営業代行) フロントエンドエンジニア、最強案件特集】";
  const additionalText = "のための高度なアルゴリズム開発と機械学習モデルの統合、リアルタイムデータ処理基盤の構築";
  return Math.random() > 0.5 ? baseTitle + additionalText : baseTitle;
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
  return {
    id: `#CM${9800 + index}`,
    date: "24.8.1",
    name: generateProjectName(),
    price: price.lower ? `${price.lower}〜${price.upper}万` : `〜${price.upper}万`,
    tags: generateTags(),
    skills: skills,
    company: `株式会社xyz${index.toString().padStart(5, '0')}`,
    start_date: ["24.9.1", "24.10.1", "即日"][Math.floor(Math.random() * 3)],
    description: "この案件は、最新のWeb技術を活用した大規模プロジェクトです。チームでの協力が重要で、高度な技術力が求められます。",
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

const projects = Array.from({ length: 100 }, (_, i) => generateProject(i));

const data = { projects };

fs.writeFileSync('case.json', JSON.stringify(data, null, 2));

console.log('Data generated and saved to case.json');
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MoreHorizontal, Eye, Star, ChevronDown, ChevronUp, Paperclip } from "lucide-react"

const skillCategories = [
  [
    "言語",
    [
      "Java", "Kotlin", "TypeScript", "JavaScript", "Python", "Ruby", "PHP", "Go",
      "C", "C++", "C#", "Swift", "Objective-C", "Scala", "Rust", "Perl", "Haskell",
    ],
  ],
  [
    "フレームワーク",
    [
      "Spring", "SpringBoot", "Laravel", "Ruby on Rails", "Django", "Flask", "Express",
      "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Gatsby.js", "Nest.js", "Deno",
      "Sinatra", "Phoenix", "ASP.NET", "CakePHP", "FuelPHP", "CodeIgniter", "Slim",
      "Symfony", "Zend Framework",
    ],
  ],
  [
    "クラウド",
    ["AWS", "GCP", "Azure", "Firebase", "Heroku", "Netlify", "Vercel"],
  ],
  ["OS", ["Linux", "Windows", "Mac"]],
  ["その他", ["Git", "Docker", "Kubernetes", "CI/CD", "Agile", "Scrum"]],
]

const generateProjectName = () => {
  const baseTitle = "【継続先社員×2 (営業代行) フロントエンドエンジニア、最強案件特集】"
  const additionalText = "のための高度なアルゴリズム開発と機械学習モデルの統合、リアルタイムデータ処理基盤の構築"
  const useFullTitle = Math.random() > 0.5
  return useFullTitle ? baseTitle + additionalText : baseTitle
}

const truncateProjectName = (name: string) => {
  if (name.length <= 40) return name
  return name.slice(0, 37) + "..."
}

const generatePrice = () => {
  const lower = Math.floor(Math.random() * 50 + 50)
  const upper = lower + Math.floor(Math.random() * 50 + 10)
  return { lower, upper }
}

const generateTags = () => {
  const jobTypes = ["フロントエンジニア", "バックエンドエンジニア", "フルスタックエンジニア", "PM", "PL"]
  const remoteOptions = ["フルリモート", "一部リモート", "常駐"]
  const commercialFlows = ["エンド直", "1次請", "2次請"]

  return [
    jobTypes[Math.floor(Math.random() * jobTypes.length)],
    remoteOptions[Math.floor(Math.random() * remoteOptions.length)],
    commercialFlows[Math.floor(Math.random() * commercialFlows.length)]
  ]
}

const generateSkills = () => {
  const skills = []
  const usedCategories = new Set()

  // Prioritize languages and frameworks
  const priorityCategories = ["言語", "フレームワーク"]

  for (const category of priorityCategories) {
    if (skills.length < 3) {
      const categorySkills = skillCategories.find(([cat]) => cat === category)[1]
      const skill = categorySkills[Math.floor(Math.random() * categorySkills.length)]
      skills.push({ category, skill })
      usedCategories.add(category)
    }
  }

  // Fill remaining slots with any category
  while (skills.length < 3 && usedCategories.size < skillCategories.length) {
    const categoryIndex = Math.floor(Math.random() * skillCategories.length)
    const [category, categorySkills] = skillCategories[categoryIndex]

    if (!usedCategories.has(category)) {
      const skill = categorySkills[Math.floor(Math.random() * categorySkills.length)]
      skills.push({ category, skill })
      usedCategories.add(category)
    }
  }

  return skills
}

const generateRequiredSkills = (mainSkills) => {
  const otherSkills = ["Git", "Docker", "AWS", "Linux", "CI/CD", "Agile"]
  const randomOtherSkills = otherSkills
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
  return [...mainSkills.map(s => s.skill), ...randomOtherSkills].join(", ")
}

const generateDesirableSkills = () => {
  const allSkills = skillCategories.flatMap(([_, skills]) => skills)
  const desirableSkills = new Set()
  while (desirableSkills.size < 3) {
    const randomSkill = allSkills[Math.floor(Math.random() * allSkills.length)]
    desirableSkills.add(randomSkill)
  }
  return Array.from(desirableSkills).join(", ")
}

const generateResponsibilities = () => {
  const responsibilities = [
    "フロントエンド開発（UI/UX設計、実装、テスト）",
    "バックエンド開発（API設計、データベース設計、実装）",
    "クラウドインフラの構築と運用",
    "CI/CDパイプラインの構築と最適化",
    "マイクロサービスアーキテクチャの設計と実装",
    "パフォーマンス最適化とスケーラビリティの向上",
    "セキュリティ対策の実装と監視",
    "チーム内でのコードレビューとベストプラクティスの共有",
    "新技術の調査と導入提案",
    "アジャイル開発プロセスの改善",
  ]
  return responsibilities.sort(() => 0.5 - Math.random()).slice(0, 3)
}

const generateDemoData = () => {
  return Array.from({ length: 100 }, (_, i) => {
    const price = generatePrice()
    const skills = generateSkills()
    const responsibilities = generateResponsibilities()
    return {
      id: `#CM${9800 + i}`,
      date: "24.8.1",
      name: generateProjectName(),
      price: `${price.lower}〜${price.upper}万`,
      tags: generateTags(),
      skills: skills,
      company: "株式会社xyzzzzzz",
      description: `この案件は、最新のWeb技術を活用した大規模プロジェクトです。チームでの協力が重要で、高度な技術力が求められます。担当範囲は以下を含みます：

${responsibilities.map(r => `- ${r}`).join('\n')}

幅広いレイヤーでの開発経験を活かし、プロジェクト全体の品質向上に貢献できる方を求めています。`,
      requirements: ["5年以上のフロントエンド開発経験", "Reactの深い知識", "チーム開発経験"],
      benefits: ["リモートワーク可", "フレックスタイム制", "社会保険完備"],
      location: "東京都渋谷区",
      contract: "準委任契約",
      period: "6ヶ月〜1年（延長の可能性あり）",
      title: generateProjectName(),
      subject: "新規プロジェクトのエンジニア募集",
      body: "弊社では新規プロジェクトに参画いただけるエンジニアを募集しております。詳細は以下の通りです。",
      from_address: "recruit@xyzzzzzz.co.jp",
      received_date: "2024-08-01",
      remuneration: `${price.lower}〜${price.upper}万円`,
      remuneration_upper: price.upper,
      remuneration_lower: price.lower,
      company_name: "株式会社xyzzzzzz",
      remotework: Math.random() > 0.5,
      foreign_worker: Math.random() > 0.7,
      start_date: "2024-09-01",
      usance: "月末締め翌月末払い",
      company_mail_domain: "xyzzzzzz.co.jp",
      interview: "オンライン",
      interview_count: Math.floor(Math.random() * 3) + 1,
      business_flow: "エンド直",
      business_flow_keyword: "直接取引",
      require_skill: generateRequiredSkills(skills),
      desirable_skill: generateDesirableSkills(),
      geo_locations: ["東京", "神奈川", "千葉", "埼玉"],
      is_attachment: Math.random() > 0.5,
      sole_proprietorship: Math.random() > 0.6,
      remotework_text: "週3日まで可能",
      foreign_worker_text: "VISA取得支援あり",
      sole_proprietorship_text: "条件付きで可",
    }
  })
}

const demoData = generateDemoData()

export function MatchinguUi() {
  const [items, setItems] = useState<typeof demoData>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof demoData)[0] | null>(null)
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({})

  const loadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const start = page * 10
    const end = start + 10
    const newItems = demoData.slice(start, end)
    
    setItems(prevItems => [...prevItems, ...newItems])
    setPage(prevPage => prevPage + 1)
    setHasMore(end < demoData.length)
    setLoading(false)
  }

  useEffect(() => {
    loadMore()

    // 無限スクロールのためのイベントリスナーを追加
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)

    // クリーンアップ関数
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (project: (typeof demoData)[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const toggleRowExpansion = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-gray-100 p-6 pb-0">
        <h1 className="text-2xl font-bold mb-4">案件検索</h1>
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">案件検索フォーム</h2>
            <p className="text-sm text-gray-500">必要な検索項目・方法</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">キーワード</Label>
                <Input id="keyword" placeholder="キーワードを入力" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">勤務地</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="勤務地を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    <SelectItem value="remote">フルリモート</SelectItem>
                    <SelectItem value="tokyo">東京</SelectItem>
                    <SelectItem value="osaka">大阪</SelectItem>
                    <SelectItem value="nagoya">名古屋</SelectItem>
                    <SelectItem value="fukuoka">福岡</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-6 pt-0">
        <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg">
          <Table>
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="w-5"></TableHead>
                <TableHead className="w-24 text-xs">kintone ID</TableHead>
                <TableHead className="w-24 text-xs">配信日</TableHead>
                <TableHead className="text-xs">案件名</TableHead>
                <TableHead className="w-24 text-xs">単価</TableHead>
                <TableHead className="w-48 text-xs">スキル</TableHead>
                <TableHead className="w-40 text-xs">会社名</TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <>
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium text-xs">{item.id}</TableCell>
                    <TableCell className="text-xs">{item.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 mb-1">
                        <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-800">
                          {item.tags[0]}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] bg-purple-100 text-purple-800">
                          {item.tags[1]}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-800">
                          {item.tags[2]}
                        </Badge>
                      </div>
                      {item.name.length > 40 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block text-[10px] text-gray-600">{truncateProjectName(item.name)}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs whitespace-pre-wrap">{item.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="block text-[10px] text-gray-600">{item.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-semibold">{item.price}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map(({ category, skill }, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="text-[10px]">
                                  {skill}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{category}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{item.company}</TableCell>
                    <TableCell>
                      <Button size="icon" variant="ghost" onClick={() => openModal(item)}>
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => toggleRowExpansion(item.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>詳細を見る</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            <span>お気に入り登録</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRows[item.id] && (
                    <TableRow>
                      <TableCell colSpan={9}>
                        <div className="bg-gray-50 p-4 rounded-lg text-xs">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-sm font-semibold">{item.title}</h3>
                            <Button size="icon" variant="ghost" onClick={() => toggleRowExpansion(item.id)}>
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-1 text-xs">案件概要</h4>
                              <p className="text-xs whitespace-pre-wrap">{item.description}</p>
                              <h4 className="font-semibold mt-3 mb-1 text-xs">必須スキル</h4>
                              <p className="text-xs">{item.require_skill}</p>
                              <h4 className="font-semibold mt-3 mb-1 text-xs">歓迎スキル</h4>
                              <p className="text-xs">{item.desirable_skill}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1 text-xs">案件詳細</h4>
                              <ul className="list-disc list-inside text-xs">
                                <li>報酬: {item.remuneration}</li>
                                <li>勤務地: {item.location}</li>
                                <li>リモートワーク: {item.remotework_text}</li>
                                <li>外国籍: {item.foreign_worker_text}</li>
                                <li>個人事業主: {item.sole_proprietorship_text}</li>
                                <li>開始日: {item.start_date}</li>
                                <li>支払いサイト: {item.usance}</li>
                                <li>面接: {item.interview} ({item.interview_count}回)</li>
                                <li>業務フロー: {item.business_flow}</li>
                              </ul>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h4 className="font-semibold mb-1 text-xs">その他情報</h4>
                            <p className="text-xs">受信日: {item.received_date}</p>
                            <p className="text-xs">送信元: {item.from_address}</p>
                            <p className="text-xs">
                              添付ファイル: {item.is_attachment ? <Paperclip className="inline h-3 w-3" /> : 'なし'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
        {loading && (
          <div className="flex justify-center mt-4">
            <p>読み込み中...</p>
          </div>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              案件【{selectedProject?.name.slice(0, 20)}...】に対してメールを送信して人材を提案する
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                宛先
              </Label>
              <Input id="to" defaultValue="test" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cc" className="text-right">
                CC
              </Label>
              <Input id="cc" defaultValue="test" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="body" className="text-right mt-2">
                本文
              </Label>
              <Textarea 
                id="body" 
                className="col-span-3" 
                rows={12}
                defaultValue={`株式会社NKCASIA
担当様

お世話になっております。
株式会社ビズリンクの竹内です。

この度、注目中の人材をご紹介させていただきます。
該当する案件ございましたらご紹介いただけると幸いでございます。

●セット大歓迎ですが、1名ずつでの参画もOKです。
フロント+サーバーサイド(PHP)の案件などが良いかもしれません。

【氏名】NR
【年齢】39歳
【性別】男性`} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              提案する（メール送信）
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
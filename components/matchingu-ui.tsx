"use client"

import React, { useState, useEffect, useCallback, forwardRef } from 'react';
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
import { Mail, MoreHorizontal, Eye, Star, ChevronDown, ChevronUp, Paperclip, Loader2 } from "lucide-react"
import { useInView } from 'react-intersection-observer';

interface Project {
  id: string;
  date: string;
  name: string;
  price: string;
  tags: string[];
  skills: { category: string; skill: string }[];
  company: string;
  start_date: string;
  description: string;
  require_skill: string;
  desirable_skill: string;
  remuneration: string;
  location: string;
  remotework_text: string;
  foreign_worker_text: string;
  sole_proprietorship_text: string;
  usance: string;
  interview: string;
  interview_count: number;
  business_flow: string;
  received_date: string;
  from_address: string;
  is_attachment: boolean;
}

const truncateProjectName = (name: string) => {
  if (name.length <= 40) return name
  return name.slice(0, 37) + "..."
}

export const MatchinguUi = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  const [items, setItems] = useState<Project[] | null>(null)
  const [displayedItems, setDisplayedItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    priceMin: '',
    priceMax: '',
    skills: '',
    jobType: '',
    businessFlow: '',
    location: '',
    nearestStation: '',
    distance: '',
    remote: '',
    foreignWorker: '',
    soleProprietorship: '',
    startDate: '',
    emailPeriodStart: '',
    emailPeriodEnd: ''
  });

  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [id]: value
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [id]: value
    }));
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log(searchParams);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3800/projects')
        const data = await response.json()
        setItems(data)
        setDisplayedItems(data.slice(0, 16))
        setHasMore(data.length > 16)
      } catch (error) {
        console.error("データの取得に失敗しました:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const loadMore = useCallback(() => {
    if (items) {
      setLoading(true);
      setTimeout(() => {
        const nextItems = items.slice(displayedItems.length, displayedItems.length + 10);
        setDisplayedItems(prev => [...prev, ...nextItems]);
        setPage(prev => prev + 1);
        setHasMore(displayedItems.length + nextItems.length < items.length);
        setLoading(false);
      }, 1000); // 1秒のディレイを追加
    }
  }, [items, displayedItems]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const toggleRowExpansion = (id: string) => {
    setExpandedRowId(prevId => prevId === id ? null : id)
  }

  return (
    <div ref={ref} className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-gray-100 p-6 pb-0">
        <h1 className="text-2xl font-bold mb-4">案件検索</h1>
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h2 className="text-lg font-semibold">案件検索フォーム</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            >
              {isSearchExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent className={isSearchExpanded ? "" : "hidden"}>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">キーワード</Label>
                <Input id="keyword" placeholder="キーワードを入力" value={searchParams.keyword} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">単価範囲（万円）</Label>
                <div className="flex items-center space-x-2">
                  <Input id="priceMin" type="number" placeholder="下限" value={searchParams.priceMin} onChange={handleInputChange} />
                  <span></span>
                  <Input id="priceMax" type="number" placeholder="上限" value={searchParams.priceMax} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">スキル</Label>
                <Input id="skills" placeholder="スキルを入力（カンマ区切り）" value={searchParams.skills} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">職種</Label>
                <Select onValueChange={(value) => handleSelectChange('jobType', value)}>
                  <SelectTrigger id="jobType">
                    <SelectValue placeholder="職種を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">フロントエンド</SelectItem>
                    <SelectItem value="backend">バックエンド</SelectItem>
                    <SelectItem value="fullstack">フルスタック</SelectItem>
                    <SelectItem value="mobile">モバイル</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessFlow">商流</Label>
                <Select onValueChange={(value) => handleSelectChange('businessFlow', value)}>
                  <SelectTrigger id="businessFlow">
                    <SelectValue placeholder="商流を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">エンド直</SelectItem>
                    <SelectItem value="primary">1次請け</SelectItem>
                    <SelectItem value="secondary">2次請け</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">勤務地</Label>
                <Input id="location" placeholder="勤務地を入力" value={searchParams.location} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nearestStation">最寄り駅</Label>
                <Input id="nearestStation" placeholder="最寄り駅を入力" value={searchParams.nearestStation} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distance">距離範囲（km以内）</Label>
                <Input id="distance" type="number" placeholder="距離を入力" value={searchParams.distance} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remote">リモート可否</Label>
                <Select onValueChange={(value) => handleSelectChange('remote', value)}>
                  <SelectTrigger id="remote">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">可</SelectItem>
                    <SelectItem value="no">不可</SelectItem>
                    <SelectItem value="partial">一部可</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="foreignWorker">外国籍可否</Label>
                <Select onValueChange={(value) => handleSelectChange('foreignWorker', value)}>
                  <SelectTrigger id="foreignWorker">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">可</SelectItem>
                    <SelectItem value="no">不可</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="soleProprietorship">個人事業主可否</Label>
                <Select onValueChange={(value) => handleSelectChange('soleProprietorship', value)}>
                  <SelectTrigger id="soleProprietorship">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">可</SelectItem>
                    <SelectItem value="no">不可</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">開始時期</Label>
                <Input id="startDate" type="date" value={searchParams.startDate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPeriod">メール受信期間</Label>
                <div className="flex items-center space-x-2">
                  <Input id="emailPeriodStart" type="date" value={searchParams.emailPeriodStart} onChange={handleInputChange} />
                  <span></span>
                  <Input id="emailPeriodEnd" type="date" value={searchParams.emailPeriodEnd} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <Button className="mt-4" onClick={handleSearch}>検索</Button>
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
                <TableHead className="w-24 text-xs">開始時期</TableHead>
                <TableHead className="w-48 text-xs">スキル</TableHead>
                <TableHead className="w-40 text-xs">会社名</TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedItems ? (
                displayedItems.length > 0 ? (
                  displayedItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <TableRow className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium text-xs">{item.id}</TableCell>
                        <TableCell className="text-xs">{item.date}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 mb-1">
                            {item.tags.map((tag, index) => {
                              let bgColor, textColor;
                              switch (index % 3) {
                                case 0:
                                  bgColor = "bg-green-100";
                                  textColor = "text-green-800";
                                  break;
                                case 1:
                                  bgColor = "bg-purple-100";
                                  textColor = "text-purple-800";
                                  break;
                                case 2:
                                  bgColor = "bg-blue-100";
                                  textColor = "text-blue-800";
                                  break;
                              }
                              return (
                                <Badge key={index} variant="secondary" className={`text-[10px] ${bgColor} ${textColor}`}>
                                  {tag}
                                </Badge>
                              );
                            })}
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
                        <TableCell className="text-xs">{item.start_date}</TableCell>
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
                                <span>気に入り登録</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {expandedRowId === item.id && (
                        <TableRow>
                          <TableCell colSpan={10}>
                            <div className="bg-gray-50 p-4 rounded-lg text-xs">
                              <div className="flex justify-between items-start mb-4">
                                <h3 className="text-sm font-semibold">{item.name}</h3>
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
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-4">
                      データがありません
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-4">
                    データを読み込んでいます...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p>データを読み込んでいます...</p>
          </div>
        )}
        <div ref={inViewRef} style={{ height: '20px' }} />
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
株式会社ビズンクの竹内です。

この度、注目中の人材をご紹介させていただきます。
該当する案件ございましらご紹介いただけると幸いでございます

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
})

MatchinguUi.displayName = 'MatchinguUi';
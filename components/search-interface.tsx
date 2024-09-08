'use client'

import { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { X, Plus, Search } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CustomInput = ({ tags, removeTag, setSelectedTag, addTag, inputValue, setInputValue, selectedTag, ...props }) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (newTag) {
        addTag(newTag)
      }
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      e.preventDefault()
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-full text-gray-900 shadow-sm">
      <div className="flex flex-wrap items-center gap-1 flex-grow">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="secondary"
            className={`rounded-full px-2 py-0.5 text-xs flex items-center gap-1 h-6 min-h-0 ${
              tag === selectedTag
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectedTag(tag)}
            data-tag={tag}
          >
            {tag}
            <X 
              className="h-3 w-3" 
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }} 
            />
          </Button>
        ))}
        <input
          type="text"
          className="flex-grow outline-none text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
      <div className="flex items-center gap-2 ml-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setSelectedTag('add_condition')}
                data-tag="add_condition"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>検索条件を追加する</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}

const TagDetails = ({ tag, arrowPosition, onClose }) => {
  return (
    <div className="relative mt-2">
      <div 
        className="absolute w-4 h-4 bg-[#1C1C1C] transform rotate-45 -top-2"
        style={{ left: `${arrowPosition}px` }}
      ></div>
      <div className="bg-[#1C1C1C] text-white p-4 rounded-lg text-sm relative z-10">
        {tag === 'add_condition' ? (
          <>
            <p className="mb-2">検索条件を追加します。以下のオプションから選択してください：</p>
            <ul className="space-y-1">
              <li>• キーワード検索</li>
              <li>• 日付範囲</li>
              <li>• カテゴリー選択</li>
              <li>• 価格範囲</li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-2">{tag} 検索バッチをクリックしたときにここが出る。ここでできることは、</p>
            <ul className="space-y-1">
              <li>• 文字の編集（スキルなど）、数字の編集（わかりやすいフォームが表示される）</li>
              <li>• andかorの変更</li>
              <li>• 条件を追加する場合は、条件の選択、その条件に対して上記などの設定</li>
              <li>• そもそもなんのクエリなのかの明記　・詳細検索できるようにした際ここ使う？？等々</li>
            </ul>
          </>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" onClick={onClose} className="text-[#1C1C1C] bg-white hover:bg-gray-100">キャンセル</Button>
          <Button className="bg-white text-[#1C1C1C] hover:bg-gray-100">保存</Button>
        </div>
      </div>
    </div>
  )
}

interface SearchInterfaceProps {
  className?: string;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ className }) => {
  const [tags, setTags] = useState(['Nuxt', 'フルリモ', 'Vue', 'AWS', '80万~'])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [arrowPosition, setArrowPosition] = useState(0)
  const inputRef = useRef<HTMLDivElement>(null)

  const addTag = (newTag: string) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setInputValue('')
      setSelectedTag(null)
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
    setSelectedTag(null)
  }

  const closeTagDetails = () => {
    setSelectedTag(null);
  };

  useEffect(() => {
    if (selectedTag && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect()
      const tagElement = inputRef.current.querySelector(`[data-tag="${selectedTag}"]`) as HTMLElement
      if (tagElement) {
        const tagRect = tagElement.getBoundingClientRect()
        const centerPosition = tagRect.left + tagRect.width / 2 - inputRect.left
        setArrowPosition(centerPosition)
      }
    }
  }, [selectedTag])

  return (
    <div className={className}>
      <div className="relative" ref={inputRef}>
        <CustomInput
          tags={tags}
          removeTag={removeTag}
          setSelectedTag={setSelectedTag}
          addTag={addTag}
          inputValue={inputValue}
          setInputValue={setInputValue}
          selectedTag={selectedTag}
          placeholder={tags.length === 0 ? "検索..." : ""}
        />
      </div>
      {selectedTag && (
        <TagDetails 
          tag={selectedTag} 
          arrowPosition={arrowPosition} 
          onClose={closeTagDetails}
        />
      )}
    </div>
  )
}
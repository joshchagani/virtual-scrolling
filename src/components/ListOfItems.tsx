import { useEffect, useRef, useState } from 'react'
import useScrollPosition from "../hooks/useScrollPosition"

const CONTAINER_HEIGHT = 500
const ITEM_HEIGHT = 30
const WORD_PADDING = 20

const wrapper = {
  backgroundColor: 'rgb(226, 222, 222)',
  height: `${CONTAINER_HEIGHT}px`,
  overflowY: 'scroll' as const
}

const ulStyles = {
  paddingInline: '10px',
  listStyle: 'none'
}

const liStyles = {
  border: '1px #000 solid',
  height: `${ITEM_HEIGHT}px`
}

const inputStyles = {
  border: '1px #000 solid',
  height: '20px',
  width: '300px',
  marginBlock: '10px'
}

type ListOfItemsProps = {
  words: string[]
}

function useSearchWords(allWords: string[], searchWord: string) {
  const [filteredWords, setFilteredWords] = useState<string[]>([])

  useEffect(() => {
    if (searchWord === '') {
      setFilteredWords(allWords)
      return
    }
    setFilteredWords(allWords.filter(w => w.includes(searchWord)))
  }, [searchWord, allWords])

  return filteredWords
}

function ListOfItems(props: ListOfItemsProps) {
  const [search, setSearch] = useState('')
  const words = useSearchWords(props.words, search)
  const divRef = useRef<HTMLDivElement | null>(null)
  const scrollPosition = useScrollPosition(divRef)
  const wordCount = words.length
  const totalHeightOfDictionary = wordCount * ITEM_HEIGHT

  const numberOfVisibleWords = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT + WORD_PADDING)
  const rawScrollRatio = (scrollPosition / totalHeightOfDictionary)

  // Keeps the scrollRatio from going into negative or overflowing past the height
  const scrollRatio = rawScrollRatio > 1 ? 1 : rawScrollRatio < 0 ? 0 : rawScrollRatio
  const sliceIndex = (wordCount - numberOfVisibleWords) * (scrollRatio)

  const paddingStart = scrollRatio * (totalHeightOfDictionary) + 'px'
  const paddingEnd = (1 - scrollRatio) * (totalHeightOfDictionary) + 'px'

  return (
    <>
      <input style={{ ...inputStyles }} onChange={(e) => setSearch(e.target.value)} value={search} />
      <div ref={divRef} style={{ ...wrapper }}>
        <ul style={{ ...ulStyles, paddingBlockStart: paddingStart, paddingBlockEnd: paddingEnd }}>
          {words.slice(sliceIndex, sliceIndex + numberOfVisibleWords).map(word => <li style={{ ...liStyles }} key={word}>{word}</li>)}
        </ul></div>
    </>
  )
}

export default ListOfItems

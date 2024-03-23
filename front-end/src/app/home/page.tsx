'use client'

import { IMovie } from '@/types/movie'
import { useEffect, useState } from 'react'
import BannerImage from '@/public/banner-leo.png'
import BannerSadImage from '@/public/banner-leo-sad.png'
import Image from 'next/image'
import Style from './home.module.scss'
import PrimaryButton from '@/components/Button'

export default function Home() {
  const MOVIES_TO_SHOW = 6
  const [allContent, setAllContent] = useState<IMovie[]>([])
  const [content, setContent] = useState<IMovie[]>([])
  const [isLast, setLast] = useState(false)
  const [itens, setItens] = useState(MOVIES_TO_SHOW)
  const [openModal, setOpenModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllContent(data)
        setContent(data.slice(0, itens))
      })
  }, [])

  const moreMovies = () => {
    const newItens = itens + MOVIES_TO_SHOW
    const newContent = allContent.slice(0, newItens)
    setContent(newContent)
    setItens(newItens)
    setLast(newItens >= allContent.length)

    if (newItens >= allContent.length) {
      setLast(true)
    }
  }

  function openDatails(item: IMovie) {
    console.log('item', item)
    setSelectedMovie(item)
    setOpenModal(true)
  }

  return (
    <div className={Style.home}>
      <div className={Style.banner}>
        <Image src={content?.length > 0 ? BannerImage : BannerSadImage} alt="Banner FistarolFlix" />
      </div>

      <div className={Style.container}>
        <div className={Style.title}>
          <h1>Catálogo</h1>
        </div>

        <div className={Style.content}>
          {content?.length > 0 ? (
            <>
              <div className={Style.grid}>
                {content.map((item, index) => (
                  <div key={index} className={Style.movie} onClick={() => openDatails(item)}>
                    <Image src={item?.posterUrl ?? ''} alt={item?.title ?? ''} width={200} height={300} />
                  </div>
                ))}
              </div>
              {!isLast && <PrimaryButton onClick={moreMovies}>Ver mais conteúdos</PrimaryButton>}
            </>
          ) : (
            <p>Ops! Infelizmente não estamos com conteúdos disponíveis no momento...</p>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

import { IMovie } from '@/types/movie'
import { useEffect, useState } from 'react'
import PrimaryButton from '@/components/Button'
import BannerImage from '@/public/banner-leo.png'
import BannerSadImage from '@/public/banner-leo-sad.png'
import CloseModalIcon from '@/public/close-logo.svg'
import Image from 'next/image'
import Style from './home.module.scss'

export default function Home() {
  const PAGE_SIZE = 3

  const [movies, setMovies] = useState<IMovie[]>([])
  const [content, setContent] = useState<IMovie[]>([])
  const [isLast, setLast] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null)

  useEffect(() => {
    getMovies(pageNumber, PAGE_SIZE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const moreMovies = () => {
    const newPage = pageNumber + 1

    if (!isLast) {
      setPageNumber(newPage)
      getMovies(newPage, PAGE_SIZE)
    }
  }

  async function getMovies(pageNumber: number, pageSize: number) {
    fetch(`/api/movies?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setContent([...content, ...data])

        if (data.length < PAGE_SIZE) {
          setLast(true)
        }
      })
  }

  function openDatails(item: IMovie) {
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

      {openModal && (
        <div className={Style.modalBackground}>
          <div className={Style.modal}>
            <div className={Style.closeModal} onClick={() => setOpenModal(false)}>
              <Image src={CloseModalIcon} alt="Fechar modal" width={24} height={24} />
            </div>

            <div className={Style.modalContent}>
              <Image src={selectedMovie?.posterUrl ?? ''} alt={selectedMovie?.title ?? ''} width={182} height={274} />

              <div className={Style.modalInfo}>
                <h2>{selectedMovie?.title}</h2>

                <ul>
                  <li>Duração: {selectedMovie?.duration}min</li>
                  <li>Classificação Etária: {selectedMovie?.ageRating}</li>
                  <li>Ano de Lançamento: {selectedMovie?.year}</li>
                </ul>

                <div className={Style.Synopsis}>
                  <span>Sinopse:</span>
                  <p>{selectedMovie?.synopsis}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

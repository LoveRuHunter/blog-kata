import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {Box, Pagination, LinearProgress} from "@mui/material"

import { Article } from '../../components/article/Article'
import { getArticles } from '../../redux/features/ArticleSlice'

import './HomePage.css'

export const HomePage = () => {

  const [isArticlesLoaded, setArticlesLoaded] = useState(false)
  const [articles, setArticles] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const dispatch = useDispatch()
  const data = useSelector(state => state.articles.data.articles)
  const articlesCount = useSelector(state => state.articles.data.articlesCount)
    
  useEffect(() => {
    dispatch(getArticles(pageNumber))
  }, [pageNumber])

  const isEmpty = (obj) => {
    for (let key in obj) return false
    return true
  }

  useEffect(() => {
      if (!isEmpty(articles)) {
        setArticlesLoaded(true)
      } else {
        setArticlesLoaded(false)
      }
      setArticles(data)
  }, [data, articles])

  const handlePageChange = (_, page) => {
    setPageNumber((page-1) * 5)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      <div className="article-list">
        {!isArticlesLoaded 
          ? <LinearProgress /> 
          : <>
              {articles.map(article => <Article key={article.slug} {...article}/>)}
              <Box display={"flex"} justifyContent={"center"} sx={{margin: "0 0 40px 0"}}>
                <Pagination
                  count={Math.ceil(articlesCount / 5)} 
                  onChange={handlePageChange}
                />  
              </Box>
            </>
        }
      </div> 
    </div>
  )
}

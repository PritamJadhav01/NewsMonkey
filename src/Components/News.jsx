import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = ({ category, country, pageSize, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const updateNews = async () => {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c08c7a5ddf44407a67ebbe4c6b7157e&page=${page}&pageSize=${pageSize}`;
      setLoading(true);
      setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    };

    document.title = `${category}- NewsMonkey`;
    updateNews();
  }, [category, country, pageSize, page, setProgress]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9c08c7a5ddf44407a67ebbe4c6b7157e&page=${page + 1}&pageSize=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: '90px' }}>NewsMonkey - Top {category} Headlines</h1>
      {loading && <Spinner />}
      {articles && (  // Add this check to render InfiniteScroll only if articles is defined
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author} date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
          </InfiniteScroll>
      )}
          </>


);
}

  
  

News.defaultProps = {
  country: 'in',
  pageSize: 8
};


News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;

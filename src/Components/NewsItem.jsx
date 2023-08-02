import React from "react";
const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl,author,date,source,} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position:'0'
          }
          }>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          <img src={!imageUrl?"https://c.ndtvimg.com/2022-11/33ilm3pg_ashok-gehlot-pm-modi-pti-650_650x400_02_November_22.jpg?downsize=570:351": imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author? "Unknown":author} on {new Date(date).toDateString()}</small></p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    ); 
  
}

export default NewsItem;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ data }) => {

  const readMore = (url) => {
    window.open(url, '_blank');  
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {data && data.length > 0 ? (
          data.map((curIndex, index) => (
            curIndex.urlToImage ? ( 
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <img src={curIndex.urlToImage} className="card-img-top" alt="news" />
                  <div className="card-body">
                    <h5 onClick={() => readMore(curIndex.url)} className="card-title pointer">
                      {curIndex.title}
                    </h5>
                    <p className="card-text">{curIndex.description}</p>
                    <button onClick={() => readMore(curIndex.url)} className="btn btn-primary">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ) : null  
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default Card;

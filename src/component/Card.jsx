import React from 'react';

const Card = ({ data }) => {
    const readMore = (url) => {
        window.open(url, '_blank');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!data || data.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📰</div>
                <h3 className="empty-title">No news available</h3>
                <p className="empty-text">Try searching for something else or check back later</p>
            </div>
        );
    }

    return (
        <div className="news-grid">
            {data.map((article, index) => {
                if (!article.image) return null;

                const isFirstArticle = index === 0;
                const isFeatured = index < 2;

                return (
                    <article
                        key={index}
                        className={`news-card ${isFirstArticle ? 'featured' : ''} ${isFeatured && !isFirstArticle ? 'secondary-featured' : ''}`}
                    >
                        <div className="card-image-wrapper">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="card-image"
                                loading="lazy"
                            />
                            <div className="card-overlay"></div>
                            {article.source?.name && (
                                <div className="card-source-badge">{article.source.name}</div>
                            )}
                        </div>

                        <div className="card-content">
                            <div className="card-meta">
                                {article.publishedAt && (
                                    <span className="card-date">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                                            <path d="M12 6v6l4 2" strokeWidth="2"/>
                                        </svg>
                                        {formatDate(article.publishedAt)}
                                    </span>
                                )}
                            </div>

                            <h2
                                className="card-title"
                                onClick={() => readMore(article.url)}
                            >
                                {article.title}
                            </h2>

                            <p className="card-description">{article.description}</p>

                            <button
                                onClick={() => readMore(article.url)}
                                className="card-button"
                            >
                                <span>Read Full Story</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default Card;
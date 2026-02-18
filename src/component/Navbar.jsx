import { useState, useEffect } from 'react';
import Card from './Card';


function Navbar() {
    const [newsData, setData] = useState([]);
    const [search, setSearch] = useState('India');
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState('India');

    useEffect(() => {
        getData();
    }, [search]);

    const getData = async () => {
        setLoading(true);

        try {
            const url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=in&max=10&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            console.log("API RESPONSE 👉", data);

            if (data.articles) {
                setData(data.articles);
            } else {
                setData([]);
                console.log("No articles found");
            }

        } catch (error) {
            console.log("Error fetching data 👉", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value || '');
    };

    const topics = (e) => {
        const category = e.target.getAttribute('value');
        setSearch(category);
        setActiveCategory(category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setActiveCategory('');
    };

    // Updated categories with better search queries for GNews API
    const categories = [
        { name: 'Home', value: 'India', icon: '🏠' },
        { name: 'World', value: 'World', icon: '🌍' },
        { name: 'Politics', value: 'Politics', icon: '⚖️' },
        { name: 'Technology', value: 'Technology AI startup', icon: '💻' },
        { name: 'Sports', value: 'Sports', icon: '⚽' },
        { name: 'Business', value: 'Business Economy', icon: '💼' },
        { name: 'Health', value: 'Health Fitness', icon: '💪' }
    ];

    console.log("API KEY 👉", import.meta.env.VITE_GNEWS_API_KEY);

    return (
        <>
            <nav className="modern-navbar">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <div className="brand-icon">📰</div>
                        <h1 className="brand-title">
                            KalTak<span className="brand-accent">App</span>
                        </h1>
                    </div>

                    <div className="navbar-search-desktop">
                        <form onSubmit={handleSubmit} className="search-form">
                            <input
                                type="search"
                                placeholder="Search news..."
                                value={search || ''}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <button type="submit" className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                                    <path d="m21 21-4.35-4.35" strokeWidth="2"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="navbar-categories">
                    <div className="categories-scroll">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={topics}
                                value={cat.value}
                                className={`category-btn ${activeCategory === cat.value ? 'active' : ''}`}
                            >
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-name">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="navbar-search-mobile">
                    <form onSubmit={handleSubmit} className="search-form">
                        <input
                            type="search"
                            placeholder="Search news..."
                            value={search || ''}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                                <path d="m21 21-4.35-4.35" strokeWidth="2"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </nav>

            <div className="content-wrapper">
                {loading ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                        <p className="loading-text">Loading latest news...</p>
                    </div>
                ) : (
                    <Card data={newsData} />
                )}
            </div>
        </>
    );
}

export default Navbar;
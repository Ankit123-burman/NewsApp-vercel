import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Card from './Card';

function Navbar() {
    const [newsData, setData] = useState([]);
    const [search, setSearch] = useState('India'); 
    const API_KEY = 'ac0b3a664c3f48dbad54f3efbe600eab';

    useEffect(() => {
        getData();
    }, []);

    const getData = async (e) => {
        if (e) e.preventDefault();  
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const Data = await response.json();
            console.log(Data.articles);
            setData(Data.articles);  
        } catch (error) {
            console.log('Error fetching data', error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);  
    };

    const topics = (e) => {
        setSearch(e.target.getAttribute('value'));
        getData(); 
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top bg-white text-black h-75">
                <div className="container-fluid">
                    <a className="navbar-brand text-black" href="#"><h1>KalTakApp</h1></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active pointer" aria-current="page" onClick={topics} value="India">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="World">World</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Politics">Politics</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Technology">Technology</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Sports">Sports</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Fitness">Fitness</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Space">Space</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Fact">Fact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black pointer" onClick={topics} value="Comedy">Comedy</a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={getData}>
                            <input className="form-control me-2" type="search" placeholder="Search" value={search} onChange={handleSearch} aria-label="Search" />
                            <button className="btn btn-outline-success text-black" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div>
                <Card data={newsData} />
            </div>
        </>
    );
}

export default Navbar;

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import "./style.css";


function HomePage() {
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        const fetchCategories = async ()=>{
            try{
                const response = await axios.get("/api/categories");
                setCategories(response.data.categories);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchCategories();
    },[]);

    return (
        <div className="page-layout">
            <NavBar />
            <div className="homepage-main flex flex-column">
                <div className="specialized-banner">
                    <div className="banner-card">
                        <div className="banner-text-group flex flex-column">
                            <p className="card-title">IPL</p>
                            <p className="h3">IPL Best moments</p>
                            <div className="h6">Watch the best moments from TATA IPL 2022</div>
                            <button className="btn btn-hover btn-banner remove-from-wishlist-button"><Link to={`/watch/JOW-pOahbro`}>Watch Now</Link></button>
                        </div>
                    </div>
                </div>
                <div className="category-section">
                    <div className="section-title">Categories</div>
                    <div className="section flex">
                        {
                            categories.map(category => {
                                return(
                                    <div className="card vertical-card overlay categories">
                                        <div className="card-image pos-relative">
                                            <img src={category.image} alt = {category.categoryName} />
                                        </div>
                                        <div className="overlay-layer-2">{category.categoryName}</div>
                                    </div>
                            )})
                        }
                        {/* <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="" alt = "sports" />
                            </div>
                            <div className="overlay-layer-2">Sports</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="" alt = "news" />
                            </div>
                            <div className="overlay-layer-2">News</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="" alt = "music" />
                            </div>
                            <div className="overlay-layer-2">Music</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="https://img.freepik.com/free-vector/skull-gaming-with-joy-stick-emblem-modern-style_32991-492.jpg?w=2000" alt = "bollywood" />
                            </div>
                            <div className="overlay-layer-2">Gaming</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCRz7pfuj8s85PcB2DzjPI0KFFFk70rZfUg&usqp=CAU" alt = "sci-fi" />
                            </div>
                            <div className="overlay-layer-2">Sci-fi</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage }
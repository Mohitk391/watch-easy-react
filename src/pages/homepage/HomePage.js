import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { useFilter } from "../../contexts/FilterContext";
import { getCategories } from "../../utils/APICallHandlers/CategoryService";
import "./style.css";


function HomePage() {
    const [categories, setCategories] = useState([]);
    const {filterDispatch} = useFilter();
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            setCategories(await getCategories());
        })();
    },[]);

    const goToCategory = (category)=>{
        filterDispatch({type:"SET_CATEGORY", payload: category});
        navigate("/explore");
    }

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
                                    <div className="card vertical-card overlay categories" key={category._id} onClick={()=>goToCategory(category.categoryName)}>
                                        <div className="card-image pos-relative">
                                            <img src={category.image} alt = {category.categoryName} />
                                        </div>
                                        <div className="overlay-layer-2">{category.categoryName}</div>
                                    </div>
                            )})
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage }
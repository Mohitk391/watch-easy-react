import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import "./style.css";


function HomePage() {

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
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="https://media.istockphoto.com/photos/huge-multi-sports-collage-taekwondo-tennis-soccer-basketball-etc-picture-id1364827675?b=1&k=20&m=1364827675&s=170667a&w=0&h=2ac1QP_pzf8aEAP4UkPtS2NarFgOnHoCbM4hXLf3G8w=" alt = "sports" />
                            </div>
                            <div className="overlay-layer-2">Sports</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="data:image/jpeg;base64,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" alt = "news" />
                            </div>
                            <div className="overlay-layer-2">News</div>
                        </div>
                        <div className="card vertical-card overlay categories">
                            <div className="card-image pos-relative">
                                <img src="data:image/jpeg;base64,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" alt = "music" />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { HomePage }
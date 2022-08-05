import { useEffect, useState } from "react";
import { useFilter } from "../../contexts/FilterContext";
import { getCategories } from "../../utils/APICallHandlers/CategoryService";
import "./categoryFilter.css";

export const CategoryFilter = () => {
    const [categories, setCategories] = useState([{_id: 0, categoryName: "All", image: null, description: "all"}]);
    const {filterState:{category}, filterDispatch} = useFilter();

    useEffect(()=>{
        (async ()=>{
            const backendCategories = await getCategories();
            setCategories([ {_id: 0, categoryName: "All", image: null, description: "all"}, ...backendCategories]);
        })();
    },[categories]);

    return (
        <aside className="menu">
                    <div className="category-menu">
                        <div className="title">Category</div>
                        <ul className="list-none">
                            {categories.map(currentCategory=>{
                                return (
                                    <li className="menu-item" key={currentCategory._id} onClick={()=>filterDispatch({type:"SET_CATEGORY", payload: currentCategory.categoryName})}>
                                        <button className={`btn btn-hover category-button ${currentCategory.categoryName === category ? "selected" : ""}`}>{currentCategory.categoryName}</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>
    );
}
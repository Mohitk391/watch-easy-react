import axios from "axios";
import { showToast } from "../toasts/toast";

export const getCategories = async () => {
    try{
        const response = await axios.get("/api/categories");
        return response.data.categories;
    }
    catch(error){
        console.error(error);
        showToast("error", "there seems to be some problem, Please try again later!!!");
    }
}
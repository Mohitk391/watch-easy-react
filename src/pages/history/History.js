import { NavBar } from "../../components/NavBar/NavBar";
import "./history.css";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useHistory } from "../../contexts";
import { Link } from "react-router-dom";
import { clearHistoryHandler } from "../../utils/APICallHandlers/HistoryService";
import { showToast } from "../../utils/toasts/toast";

const History = () => {
    const { historyState, historyDispatch } = useHistory();
    const { history } = historyState;
    const token = localStorage.getItem("token");

    const clearHistory = async () => {
        const response = await clearHistoryHandler(token);
        if(response.status === 200){
            historyDispatch({type: "SET_HISTORY", payload: response.data.history});
            showToast("success","History cleared successfully!!!");
        }
        else{
            showToast("error","Some error occured, Sorry for the inconvenience!!");
            console.log(response.data.message);
        }
    }

    return (
        <div class="page-layout">
        <NavBar />
        <main class="history-main">
            <div class="history-header flex flex-space-between">
                <h2>History</h2>
                <button class="btn clear-history-button" onClick={()=>clearHistory()}>
                    Clear History <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="history-content flex flex-wrap flex-gap-1">
            { history.length>0 ? (
                    history.map( video => {
                    return (
                        <VideoCard video={video} type={"delete"}/>
                    ) 
                })
                ) : (
                    <div className="flex flex-center flex-column">
                        <div>You don't have any video in History section.</div>
                        <div>Check out <Link to="/explore">Explore</Link>.</div>
                    </div>
                )}
            </div>
        </main>
    </div>
    );
}

export { History }
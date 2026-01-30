import axiosInstance from "../../axiosConfig";

const getAll = () => {
    return axiosInstance.get("/api/activity");
};

const ActivityService = {
    getAll
}

export default ActivityService;
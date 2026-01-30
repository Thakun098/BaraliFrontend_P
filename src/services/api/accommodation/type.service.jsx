import axiosInstance from "../../axiosConfig";

const getAll = async () => {
    return await axiosInstance.get("/api/accommodation/type");
};

const TypeService = {
    getAll
}

export default TypeService;
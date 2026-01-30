import axiosInstance from "../../axiosConfig";

const getPopularRoom = () => {
    return axiosInstance.get("/api/accommodation/popular");
};

const getPromotion = () => {
    return axiosInstance.get("/api/accommodation/promotion");
};

const getAll = async () => {
    return await axiosInstance.get("/api/accommodation");
};

const getSearch = async (checkIn, checkOut, adults, children) => {
    console.log("getSearch", checkIn, checkOut, adults, children);
    return await axiosInstance.get("/api/accommodation/search", {
        params: {
            checkIn,
            checkOut,
            adults,
            children
        }
    });
}

const getAvailableRooms = (formattedCheckIn, formattedCheckOut) => {
    return axiosInstance.get("/api/accommodation/promotion/availability", {
        params: {
            formattedCheckIn,
            formattedCheckOut
        }
    });
}

const AccommodationService = {
    getPopularRoom,
    getPromotion,
    getAll,
    getSearch,
    getAvailableRooms
}

export default AccommodationService;

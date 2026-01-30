import axiosInstance from "../../axiosConfig";

const MakeBooking = async (userId, roomIds, checkInDate, checkOutDate, adults, children, specialRequests, totalPrice) => {
    return await axiosInstance.post("/api/booking/make",
        {
            userId,
            roomIds,
            checkInDate,
            checkOutDate,
            adults,
            children,
            specialRequests,
            totalPrice
        }
    );
}

const BookingService = {
    MakeBooking,
};

export default BookingService;

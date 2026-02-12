import React, { useEffect, useState } from "react";
import AccommodationService from "../../services/api/accommodation/accommodation.service";
import AccommodationCard from "./AccommodationCard";
import { Spinner } from "react-bootstrap";
import dayjs from "dayjs";

const Accommodation = () => {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const checkInStr = dayjs().add(1, 'day').format('YYYY-MM-DD');
    const checkOutStr = dayjs().add(2, 'day').format('YYYY-MM-DD');

    useEffect(() => {
        fetchAccommodations();
    }, []);

    const fetchAccommodations = async () => {
        try {
            setLoading(true);
            const res = await AccommodationService.getAll();
            setAccommodations(res?.data || []);
        } catch (error) {
            console.error("Error fetching accommodations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row">
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    {accommodations.length > 0 ? (
                        accommodations.map((acc) => (
                            <AccommodationCard
                                key={acc.id}
                                accommodation={acc}
                                checkIn={checkInStr}
                                checkOut={checkOutStr}
                            />
                        ))
                    ) : (
                        <div className="text-center col-12">
                            <p className="text-danger">
                                ไม่สามารถโหลดข้อมูลห้องพักได้
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Accommodation;
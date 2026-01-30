import React, { useEffect, useState } from "react";
import AccommodationService from "../../services/api/accommodation/accommodation.service";
import AccommodationCard from "./AccommodationCard";
import { Spinner, Button } from "react-bootstrap";
import GetRoomAvailability from "../common/GetRoomAvailability";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Icon } from "@iconify/react";

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availabilityData, setAvailabilityData] = useState({});
  const [startIndex, setStartIndex] = useState(0); // สำหรับเลื่อน
useEffect(() => {
  if (promotions.length <= 3) return;
  const interval = setInterval(() => {
    setStartIndex((prev) =>
      prev + 1 > promotions.length - 3 ? 0 : prev + 1
    );
  }, 4000);
  return () => clearInterval(interval);
}, [promotions]);
  useEffect(() => {
    const checkInDate = dayjs().add(1, "day").toDate();
    const checkOutDate = dayjs().add(2, "day").toDate();

    const fetchData = async () => {
            if (checkInDate && checkOutDate) {
                const result = await GetRoomAvailability(checkInDate, checkOutDate);
                setAvailabilityData(result);
            }
        };
        fetchData();
    }, []);
  useEffect(() => {
    fetchPromotions();
  }, []);
  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await AccommodationService.getPromotion();
      setPromotions(res?.data || []);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, promotions.length - 3));
  };
  const visiblePromotions = promotions.slice(startIndex, startIndex + 3);

  return (
    <div className="position-relative">
      {loading ? (
        <div className="text-center my-5 w-100">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : promotions.length > 0 ? (
        <div className="position-relative">
          {/* ปุ่มเลื่อนซ้าย */}
          {startIndex > 0 && (
            <Button
              variant="light"
              className="position-absolute top-50 start-0 translate-middle-y z-3 shadow"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              onClick={handlePrev}
            >
              <Icon icon="ph:caret-left-bold" width={24} />
            </Button>
          )}

          {/* ปุ่มเลื่อนขวา */}
          {startIndex + 3 < promotions.length && (
            <Button
              variant="light"
              className="position-absolute top-50 end-0 translate-middle-y z-3 shadow"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
              onClick={handleNext}
            >
              <Icon icon="ph:caret-right-bold" width={24} />
            </Button>
          )}

          {/* แสดงการ์ดทีละ 3 ใบ */}
          <div
            className="d-flex justify-content-center gap-3 overflow-hidden px-4 py-3"
            style={{ transition: "transform 0.3s ease" }}
          >
            {visiblePromotions.map((acc) => (
              <div
                key={acc.id}
                className="flex-shrink-0 w-75"
                
              >
                <AccommodationCard
                  accommodation={acc}
                  availabilityRooms={availabilityData[acc.type_id] ?? 0}
                  promotion={acc.promotions?.[0]}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center col-12">
          <p className="text-danger">ไม่สามารถโหลดข้อมูลโปรโมชั่นได้</p>
        </div>
      )}
    </div>
  );
};

export default Promotion;

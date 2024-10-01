import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { ProgressBar } from "./ProgressBar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import moment from "moment";
import styled from "styled-components";

const StyledCalendarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .react-calendar {
        width: 100%;
        max-width: none;
        border: none;
    }
    /* 네비게이션 가운데 정렬 */
    .react-calendar__navigation {
        justify-content: center;
    }

    /* 네비게이션 폰트 설정 */
    .react-calendar__navigation button {
        font-weight: 800;
        font-size: 1rem;
    }
    /* 네비게이션 버튼 컬러 */
    .react-calendar__navigation button:focus {
        background-color: white;
    }

    /* 네비게이션 비활성화 됐을때 스타일 */
    .react-calendar__navigation button:disabled {
        background-color: white;
        color: ${(props) => props.theme.darkBlack};
    }
    /* 년/월 상단 네비게이션 칸 크기 줄이기 */
    .react-calendar__navigation__label {
        flex-grow: 0 !important;
    }

    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
        font-weight: 800;
    }
    /* 일요일에만 빨간 폰트 */
    .react-calendar__month-view__weekdays__weekday--weekend
        abbr[title="일요일"] {
        color: ${(props) => props.theme.red_1};
    }

    /* 오늘 날짜 폰트 컬러 */
    .react-calendar__tile--now {
        background: none;
        abbr {
            color: ${(props) => props.theme.primary_2};
        }
    }
    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        border-radius: 0.8rem;
        background-color: ${(props) => props.theme.gray_5};
        padding: 0;
    }

    /* 네비게이션 현재 월 스타일 적용 */
    .react-calendar__tile--hasActive {
        background-color: ${(props) => props.theme.primary_2};
        abbr {
            color: white;
        }
    }

    /* 일 날짜 간격 */
    .react-calendar__tile {
        padding: 5px 0px 18px;
        position: relative;
    }

    /* 네비게이션 월 스타일 적용 */
    .react-calendar__year-view__months__month {
        flex: 0 0 calc(33.3333% - 10px) !important;
        margin-inline-start: 5px !important;
        margin-inline-end: 5px !important;
        margin-block-end: 10px;
        padding: 20px 6.6667px;
        font-size: 0.9rem;
        font-weight: 600;
        color: ${(props) => props.theme.gray_1};
    }

    /* 선택한 날짜 스타일 적용 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background-color: rgba(255, 131, 61, 0.5);
    }
`;

export function SearchDate() {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    const onChange = (value) => {
        setDateRange(value);
    };

    const tileClassName = ({ date, view }) => {
        const [start, end] = dateRange;

        if (view === "month" && date >= start && date <= end) {
            return "bg-custom-orange bg-opacity-50"; // Tailwind 클래스
        }
        return null;
    };

    const formatDateRange = (start, end) => {
        const startStr = moment(start).format("YYYY.MM.DD");
        const endStr = moment(end).format("YYYY.MM.DD");
        return startStr === endStr ? startStr : `${startStr} - ${endStr}`;
    };

    return (
        <div className="flex flex-col h-[calc(100vh-250px)] mt-[-90px]">
            <ProgressBar />
            <div className="flex flex-col justify-center m-auto mt-10 w-full">
                <StyledCalendarContainer className="flex flex-col justify-center m-auto w-full px-4">
                    <div className="text-center mb-4 text-lg font-bold text-custom-orange">
                        {formatDateRange(dateRange[0], dateRange[1])}
                    </div>
                    <Calendar
                        onChange={onChange}
                        value={dateRange}
                        selectRange={true}
                        tileClassName={tileClassName}
                        formatDay={(locale, date) => moment(date).format("DD")}
                        className="shadow-bottom rounded-lg p-4"
                        navigationLabel={({ date }) => (
                            <span className="text-lg font-bold text-center w-full block">
                                {moment(date).format("YYYY.MM")}
                            </span>
                        )}
                        minDetail="year"
                        next2Label={null}
                        prev2Label={null}
                        calendarType="gregory"
                        prevLabel={
                            <span className="text-custom-orange">&lt;</span>
                        }
                        nextLabel={
                            <span className="text-custom-orange">&gt;</span>
                        }
                    />
                </StyledCalendarContainer>
            </div>
            <div className="p-4 max-w-[480px] mx-auto w-full fixed bottom-20 left-0 right-0 flex justify-end">
                <Button
                    text="건너뛰기"
                    fontSize="text-xs"
                    onClick={() => navigate("/search/step2")}
                />
            </div>
        </div>
    );
}

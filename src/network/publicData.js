import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/B551011/KorService1";

const publicDataAPI = axios.create({
    baseURL: BASE_URL,
    params: {
        serviceKey: import.meta.env.VITE_PUBLIC_DATA_API_KEY,
        MobileOS: "ETC",
        MobileApp: "APP",
        _type: "json",
    },
});

export const getFestivalData = async (
    startDate,
    endDate = "",
    areaCode = ""
) => {
    try {
        const response = await publicDataAPI.get("/searchFestival1", {
            params: {
                eventStartDate: startDate,
                eventEndDate: endDate,
                areaCode: areaCode,
                numOfRows: 6,
                pageNo: 1,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching festival data:", error);
        throw error;
    }
};

export const getFestivalDetail = async (contentId) => {
    try {
        const response = await publicDataAPI.get("/detailCommon1", {
            params: {
                contentId,
                defaultYN: "Y",
                firstImageYN: "Y",
                areacodeYN: "Y",
                catcodeYN: "Y",
                addrinfoYN: "Y",
                mapinfoYN: "Y",
                overviewYN: "Y",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching festival detail:", error);
        throw error;
    }
};

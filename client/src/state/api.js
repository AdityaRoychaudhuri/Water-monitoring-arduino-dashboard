import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["Sensor"],
    endpoints: (build) => ({
        getAllSensorData: build.query({
            query: () => "api/data",
            providesTags: ["Sensor"]
        })
    })
});

export const {
    useGetAllSensorDataQuery
} = api;
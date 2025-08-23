import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://fitness-server-web.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSeatingArrangement = create((set,get)=>({
    getArrangement: async () => {
        const res = await axiosInstance.get("seatallocation/generate-seating-arrangement");
        console.log(res.data);
        if(res.data.message==='success')
        return res.data.result;
        toast.error(res.data.message);
        return {};
    }
}))
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useRef } from "react";


export const useClassroomStore = create((set,get) => ({
    classrooms : [],
    isLoading: false,
    getClassrooms: async () => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.get("/classroom/");
            set({classrooms:res.data});
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoading:false});
        }
    },
    createClassroom: async (name,rows,columns,benchCapacity,navigate) => {
        // console.log(name,rows,columns,benchCapacity);
        set({isLoading:true});
        try {
            const res = await axiosInstance.post("/classroom/create",{name,rows,columns,benchCapacity});
            console.log(res.data.message);
            if (res.data.message === "Object Created") {
                localStorage.setItem("toastMessage", "Classroom created successfully!");
                navigate("/classrooms"); // Redirect to the desired page
            } else if (res.data.message === "Use different name") {
                toast.error("Choose a different class name.");
            } else {
                toast.error("Failed to create the classroom due to an unknown reason.");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }finally{
            set({isLoading:false});
        }
    },
    updateClassroomOnloadFetch: async(objectId)=>{
        // console.log(objectId);
        try {
            const res = await axiosInstance.get(`/classroom/${objectId}`);
            console.log(res.data);
            
            return res.data;
            
        } catch (error) {
            toast.error("No Object found");
        }
    },
    updateClassroom: async(name,rows,columns,benchCapacity,objectId,navigate)=>{
        set({isLoading:true});
        try {
            const res = await axiosInstance.patch(`/classroom/update/${objectId}`,{name,rows,columns,benchCapacity});
            console.log(res.data.message);
            if (res.data.message === "Classroom updated") {
                
                localStorage.setItem("toastMessage", "Classroom updated successfully!");
                console.log(789);
                navigate("/classrooms"); // Redirect to the desired page
            } else if (res.data.message === "Use different name") {
                toast.error("Choose a different class name.");
            } else {
                toast.error("Failed to create the classroom due to an unknown reason.");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }finally{
            set({isLoading:false});
        }
    },
    deleteClassroom:async(objectId)=>{
        try {
            const res = await axiosInstance.delete(`/classroom/delete/${objectId}`);
            if((res).data.message==="Object deleted successfully"){
                set((state) => ({
                    classrooms: state.classrooms.filter(classroom => classroom._id !== objectId),
                }));    
                toast.success("Classroom Deleted!");
                navigate("/classrooms");
            }
            else{
                toast.error("Classroom couldn't be deleted");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "An error occurred while creating the classroom.");
            } 
        }
    }
}));
import { useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { ArrowBigLeft, Pen } from "lucide-react";
import NumberInput from "../../components/NumberInput";
import { useClassroomStore } from "../../store/useClassroomStore";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from 'react'
import toast from "react-hot-toast";

const UpdateClassroom = ({setActionButton}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [objectId,setObjectId] = useState(null);

    useEffect(() => {
      if (!location.state || !location.state.id) {
        console.log("hi");
        toast.error("Please select a classroom to edit")
        navigate('/classrooms');
      }
      else{
        setObjectId(location.state.id);
      }
    }, [location, navigate]);
    
    const {updateClassroomOnloadFetch,updateClassroom} = useClassroomStore();
    const name = useRef(null);
    const rows = useRef(null);
    const columns = useRef(null);
    const benchCapacity = useRef(null);

    const [oldClassroom, setOldClassroom] = useState({name: "",rows: "",columns: "",benchCapacity: ""});

    useEffect(()=>{
        const fetchData = async () => {
          console.log(objectId);
            if(objectId){
              const data = await updateClassroomOnloadFetch(objectId); 
              if (data) { // Ensure data exists before setting ref values
                if (data && name.current && rows.current && columns.current && benchCapacity.current) {
                  setOldClassroom({
                    name: data.name,
                    rows: data.rows,
                    columns: data.columns,
                    benchCapacity: data.benchCapacity
                  });
                }
              }
            }
            console.log("Effect triggered");
        };
    
        fetchData(); // Call the async function
    },[objectId]);

    const handleClassUpdate = (e)=>{
        e.preventDefault();
        updateClassroom(name.current.value,rows.current.value,columns.current.value,benchCapacity.current.value,objectId,navigate);
    };

    const action = (
        <Link
          className="btn btn-active btn-primary"
          to="/classrooms"
        >
          <ArrowBigLeft />
          Back
        </Link>
      );
      // setActionButton(action);
  return (
    <>
      {/* <PageHeader heading="Create Classroom Object" action={action}/> */}
      <form className="px-4 my-4 w-fit mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 items-center text-center font-bold">
          <h1>Field Name</h1>
          <h1>New Value</h1>
          <h1>Old Value</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 items-center bg-white p-4 shadow rounded-xl">
          <label htmlFor="object-name">Object Name</label>
          <input ref={name} type="text" id="object-name" name="object-name" placeholder="Type here" className="input mx-4 w-full max-w-xs bg-base-300"/>
          <input type="text" value={oldClassroom.name} className="input !text-black text-center" disabled />  
        </div>
        <div className="grid grid-cols-3 gap-4 items-center bg-white p-4 shadow rounded-xl">
          <label htmlFor="rows">Number of Rows</label>
          <NumberInput ref={rows} min={1} max={50} value={1} name="rows" />
          <input type="text" value={oldClassroom.rows} className="input !text-black text-center" disabled />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center bg-white p-4 shadow rounded-xl">
          <label htmlFor="columns">Columns</label>
          <NumberInput ref={columns} min={1} max={50} value={1} name="columns"/>
          <input type="text" value={oldClassroom.columns} className="input !text-black text-center" disabled />
        </div>
        <div className="grid grid-cols-3 gap-4 items-center bg-white p-4 shadow rounded-xl">
          <label htmlFor="bench-capacity">Students Per Bench</label>
          <NumberInput ref={benchCapacity} min={1} max={50} value={2} name="bench-capacity"/>
          <input type="text" value={oldClassroom.benchCapacity} className="input !text-black text-center" disabled /> 
        </div>
        <div className="flex">
          <button className="btn btn-primary btn-wide mx-auto gap-2" onClick={handleClassUpdate}>Update Classroom <Pen size={20} /></button>
        </div>
      </form>
    </>
  )
}

export default UpdateClassroom
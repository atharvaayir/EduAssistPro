import { useRef } from "react";
import PageHeader from "../../components/PageHeader";
import { ArrowBigLeft, Pen } from "lucide-react";
import NumberInput from "../../components/NumberInput";
import { useClassroomStore } from "../../store/useClassroomStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const UpdateClassroom = () => {
    const navigate = useNavigate();
    const {updateClassroomOnloadFetch,updateClassroom} = useClassroomStore();
    const objectId = useLocation().state.id;
    const name = useRef(null);
    const rows = useRef(null);
    const columns = useRef(null);
    const benchCapacity = useRef(null);
    useEffect(()=>{
        const fetchData = async () => {
            const data = await updateClassroomOnloadFetch(objectId); 
            if (data) { // Ensure data exists before setting ref values
                if (name.current) name.current.value = data.name;
                if (rows.current) rows.current.value = data.rows;
                if (columns.current) columns.current.value = data.columns;
                if (benchCapacity.current) benchCapacity.current.value = data.benchCapacity;
                console.log(name);
                
            }
        };
    
        fetchData(); // Call the async function
    },[])

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
  return (
    <>
      <PageHeader heading="Create Classroom Object" action={action}/>
      <form className="px-4 my-4 w-fit mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="object-name">Object Name</label>
          <input ref={name} type="text" id="object-name" name="object-name" placeholder="Type here" className="input mx-4 w-full max-w-xs bg-base-300"/>
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="rows">Number of Rows</label>
          <NumberInput ref={rows} min={1} max={50} value={1} name="rows" />
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="columns">Columns</label>
          <NumberInput ref={columns} min={1} max={50} value={1} name="columns"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 items-center">
          <label htmlFor="bench-capacity">Students Per Bench</label>
          <NumberInput ref={benchCapacity} min={1} max={50} value={2} name="bench-capacity"
          />
        </div>
        <div className="flex">
          <button className="btn btn-primary btn-wide mx-auto gap-2" onClick={handleClassUpdate}>Update Classroom <Pen size={20} /></button>
        </div>
      </form>
      
    </>
  )
}

export default UpdateClassroom
import { useRef } from "react";
import PageHeader from "../components/PageHeader";
import { ArrowBigLeft, Pen } from "lucide-react";
import NumberInput from "../components/NumberInput";
import { useClassroomStore } from "../store/useClassroomStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const UpdateClassroom = () => {
  const navigate = useNavigate();
  const { updateClassroomOnloadFetch, updateClassroom } = useClassroomStore();
  const objectId = useLocation().state.id;

  // State variables to store fetched values (initialized as null to avoid overriding)
  const [name, setName] = useState(null);
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);
  const [benchCapacity, setBenchCapacity] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
      const fetchData = async () => {
          const data = await updateClassroomOnloadFetch(objectId);
          if (data) {
              setName(data.name ?? ""); 
              setRows(data.rows ?? 1);
              setColumns(data.columns ?? 1);
              setBenchCapacity(data.benchCapacity ?? 2);
              setLoading(false); // Data loaded
          }
      };
      fetchData();
  }, []);

  const handleClassUpdate = (e) => {
      e.preventDefault();
      updateClassroom(name, rows, columns, benchCapacity, objectId, navigate);
  };

  const action = (
      <Link className="btn btn-active btn-primary" to="/classrooms">
          <ArrowBigLeft />
          Back
      </Link>
  );

  return (
      <>
          <PageHeader heading="Update Classroom" action={action} />

          {/* Show loading message until data is fetched */}
          {loading ? (
              <p className="text-center">Loading...</p>
          ) : (
              <form className="px-4 my-4 w-fit mx-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="object-name">Object Name</label>
                      <input
                          type="text"
                          id="object-name"
                          name="object-name"
                          placeholder="Type here"
                          className="input mx-4 w-full max-w-xs bg-base-300"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="rows">Number of Rows</label>
                      <NumberInput
                          min={1}
                          max={50}
                          value={rows ?? ""}
                          onChange={(e) => {setRows(Number(e.target.value));alert("hi")}}
                          name="rows"
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="columns">Columns</label>
                      <NumberInput
                          min={1}
                          max={50}
                          value={columns ?? ""}
                          onChange={(e) => setColumns(Number(e.target.value))}
                          name="columns"
                      />
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center">
                      <label htmlFor="bench-capacity">Students Per Bench</label>
                      <NumberInput
                          min={1}
                          max={50}
                          value={benchCapacity ?? ""}
                          onChange={(e) => setBenchCapacity(Number(e.target.value))}
                          name="bench-capacity"
                      />
                  </div>
                  <div className="flex">
                      <button className="btn btn-primary btn-wide mx-auto gap-2" onClick={handleClassUpdate}>
                          Update Classroom <Pen size={20} />
                      </button>
                  </div>
              </form>
          )}
      </>
  );
};


export default UpdateClassroom
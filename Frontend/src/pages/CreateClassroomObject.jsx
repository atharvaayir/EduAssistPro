import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Trash, Plus, X } from "lucide-react";
import NumberInput from "../components/NumberInput";
import { useClassroomStore } from "../store/useClassroomStore";

const obj = [

];

const CreateClassroomObjects = () => {
  const [total, setTotal] = useState(0);
  const [classrooms, setClassrooms] = useState(obj);
  const modalRef = useRef(null);
  const rows = useRef(null);
  const columns = useRef(null);
  const benchCapacity = useRef(null);
  const classCount = useRef(null);

  useEffect(() => {
    const newTotal = classrooms.reduce(
      (sum, ob) => sum + ob.rows * ob.columns * ob.benchCapacity * ob.classCount,
      0
    );
    setTotal(newTotal);
  }, [classrooms]); // Runs only when 'classrooms' changes
  // Handle input changes
  const handleClassCreate = (e) => {
    e.preventDefault();
    setClassrooms([
      ...classrooms,
      {
        rows: Number(rows.current.value) || 0,
        columns: Number(columns.current.value) || 0,
        benchCapacity: Number(benchCapacity.current.value) || 0,
        classCount: Number(classCount.current.value) || 0,
      },
    ]);
    modalRef.current.close();
    console.log(classrooms);
  };

  // Save new classroom entry
  const handleSave = () => {
    setClassrooms((prev) => [...prev, formData]);
    modalRef.current.close();
  };

  const handleDelete = (index) => {
    setClassrooms((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <PageHeader heading="Create Classroom Object" />
      <div className="px-4 my-4">
        <div className="flex gap-3 mb-5 items-center">
          <label htmlFor="object-name">Object Name</label>
          <input
            type="text"
            id="object-name"
            name="object-name"
            placeholder="Type here"
            className="input mx-4 w-full max-w-xs bg-base-300"
          />
        </div>
        <div className="flex gap-3 mb-5 items-center">
          <label htmlFor="create-class">Create Class Type</label>
          <button
            onClick={() =>
              document
                .getElementById("create-class-type-form-dialog")
                .showModal()
            }
            className="btn btn-primary btn-sm"
          >
            Create Class Type
            <Plus size={15} />
          </button>
        </div>
        <div className="mt-5">
          <div className="overflow-auto">
            <table className="table table-lg w-fit rounded-lg bg-neutral-200 shadow-md overflow-hidden">
              <thead>
                <tr className=" text-black text-base border-b-2 border-neutral-400/65">
                  <th className="border-r border-neutral-400/65">Sr. No.</th>
                  <th className="border-x border-neutral-400/65">Rows</th>
                  <th className="border-x border-neutral-400/65">Columns</th>
                  <th className="border-x border-neutral-400/65">Students Per Bench</th>
                  <th className="border-x border-neutral-400/65">No. of Classes of this size</th>
                  <th className="border-x border-neutral-400/65">Sub Total</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((ob, index) => (
                  <tr key={index}>
                    <td className="border-r border-neutral-400/65">{index + 1}</td>
                    <td className="border-r border-neutral-400/65">{ob.rows} </td>
                    <td className="border-r border-neutral-400/65">{ob.columns} </td>
                    <td className="border-r border-neutral-400/65">{ob.benchCapacity} </td>
                    <td className="border-r border-neutral-400/65">{ob.classCount} </td>
                    <td className="border-r border-neutral-400/65">{ob.rows * ob.columns * ob.benchCapacity * ob.classCount} </td>
                    <td className="flex gap-2">
                      {/* <button className="btn btn-accent btn-sm">
                        Edit
                        <Pencil size={15} />
                      </button> */}
                      <button className="btn btn-secondary btn-sm" onClick={()=>handleDelete(index)}>
                        Delete
                        <Trash size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-neutral-400/65">
                  <th /><th /><th /><th />
                  <th className="text-right">Total Capacity</th>
                  <th>{total}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog
        id="create-class-type-form-dialog"
        ref={modalRef}
        className="modal"
      >
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Create Class Type</h3>
            <button
                  className="btn btn-sm p-1 bg-red-300 hover:bg-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    modalRef.current.close();
                    console.log(classrooms);
                  }}
                >
                  <X size={25}/>
                </button>
          </div>
            {/* TODO change this translate */}
          <form className="py-4 space-y-4 w-fit mx-auto my-4 translate-x-8">
            <div className="grid grid-cols-2 gap-4">
              <label className="text-right" htmlFor="rows">Number of Rows</label>
              <NumberInput ref={rows} min={1} max={50} value={1} name="rows" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-right" htmlFor="columns">Columns</label>
              <NumberInput
                ref={columns}
                min={1}
                max={50}
                value={1}
                name="columns"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-right" htmlFor="bench-capacity">Students Per Bench</label>
              <NumberInput
                ref={benchCapacity}
                min={1}
                max={50}
                value={2}
                name="bench-capacity"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="text-right" htmlFor="class-count">
                Number of Classes of this type
              </label>
              <NumberInput
                ref={classCount}
                min={1}
                max={50}
                value={2}
                name="class-count"
              />
            </div>
          </form>
          <div className="modal-action  w-fit mx-auto">
              <div method="dialog">
                <button className="btn btn-primary btn-wide" onClick={handleClassCreate}>
                  Save
                </button>
                
              </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreateClassroomObjects;

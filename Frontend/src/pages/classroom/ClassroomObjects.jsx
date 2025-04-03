import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { EllipsisVertical, Pencil, Trash, Plus } from "lucide-react";
import { useClassroomStore } from "../../store/useClassroomStore";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ClassroomObjects = () => {
  const { classrooms, getClassrooms, deleteClassroom } = useClassroomStore();
  const navigate = useNavigate();

  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);


  const handleEdit = (id) => {
    navigate("/update-classroom", { state: { id: id } });
  };
  const handleDelete = (id, name) => {
    document.getElementById("deleteModal").showModal();
    setDeleteName(name);
    setDeleteId(id);
  };
  const confirmDelete = () => {
    deleteClassroom(deleteId);
  };

  useEffect(() => {
    getClassrooms();
    const message = localStorage.getItem("toastMessage");
    if (message) {
      toast.success(message);
      localStorage.removeItem("toastMessage");
    }
  }, []);
  const action = (
    <Link className="btn btn-active btn-primary" to="/create-classroom">
      Create Object
      <Plus />
    </Link>
  );

  return (
    <>
      <PageHeader heading="Class Room Objects" action={action} />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
      {classrooms.map((obj) => (
  <div
    className="relative group"
    key={obj._id}
    onMouseEnter={() => setHoveredId(obj._id)}
    onMouseLeave={() => setHoveredId(null)} // Use onMouseLeave instead of onMouseOut
  >
    <div className="stats shadow border border-neutral-400 rounded-lg w-full h-32 overflow-hidden">
      <div className="stat">
        <div className="stat-title">
          <p className="text-ellipsis overflow-hidden w-11/12">
            {obj.name}
          </p>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: hoveredId === obj._id ? -20 : 0,
            opacity: hoveredId === obj._id ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-value flex gap-2 items-center mx-auto">
            {obj.rows * obj.columns * obj.benchCapacity}
            <div className="stat-desc text-xs font-normal">
              /students <br /> per day
            </div>
          </div>
        </motion.div>

        {/* Hovered (Visible on hover) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: hoveredId === obj._id ? 0 : 20,
            opacity: hoveredId === obj._id ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-value flex gap-2 items-center mx-auto">
            {obj.rows}
            <div className="stat-desc text-xs font-normal">rows</div>
            {obj.columns}
            <div className="stat-desc text-xs font-normal">columns</div>
            {obj.benchCapacity}
            <div className="stat-desc text-xs font-normal">
              Bench
              <br />
              Capacity
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Dropdown */}
    <div className="invisible dropdown dropdown-bottom dropdown-end absolute right-2 top-4 size-8 group-hover:visible">
      <div
        tabIndex={0}
        role="button"
        className="btn bg-neutral-200 border border-neutral-300 btn-sm btn-circle"
      >
        <EllipsisVertical size={15} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-[1] w-32 bg-base-300 p-2 shadow"
      >
        <li>
          <a
            onClick={() => handleEdit(obj._id)}
            className="flex gap-4 items-center"
          >
            <Pencil size={14} />
            Edit
          </a>
        </li>
        <li>
          <a
            onClick={() => handleDelete(obj._id, obj.name)}
            className="flex gap-4 items-center"
          >
            <Trash size={14} />
            Delete
          </a>
        </li>
      </ul>
    </div>
  </div>
))}
      </div>

      {/* modal for delete operation */}
      <dialog id="deleteModal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">
            Are you sure you want to delete "{deleteName}" Classroom?
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn btn-primary font-bold mr-5"
                onClick={confirmDelete}
              >
                Proceed
              </button>
              <button className="btn bg-red-400 hover:bg-red-500 font-bold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ClassroomObjects;

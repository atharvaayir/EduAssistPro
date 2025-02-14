import React from "react";
import PageHeader from "../components/PageHeader";
import { EllipsisVertical, Pencil, Trash, Plus } from "lucide-react";


const objs = [
  {
    title: "Semester Object",
    capacity: 660,
  },
  {
    title: "Computer Dept ITs Object",
    capacity: 160,
  },
  {
    title: "Mechanical Dept ITs Object",
    capacity: 180,
  },
  {
    title: "CiVil Dept ITs Object",
    capacity: 170,
  },
];

const ClassroomObjects = () => {
  const action = (
    <a
      className="btn btn-active btn-primary"
      href="/create-classroom-object"
    >
      Create Object
      <Plus />
    </a>
  );

  const createObject = (e) => {
    e.preventDefault();
    alert("hi");
  };

  return (
    <>
      <PageHeader heading="Class Room Objects" action={action} />
      <div className="grid grid-cols-4 gap-3">
        {objs.map((obj) => (
          <div className="relative group" key={obj.title}>
            <div className="stats shadow border w-full h-32 ">
              <div className="stat">
                <div className="stat-title">
                  <p className="text-ellipsis overflow-hidden w-11/12">
                    {obj.title}
                  </p>
                </div>
                <div className="stat-value flex gap-2 items-center mx-auto">
                  {obj.capacity}
                  <div className="stat-desc text-xs font-normal">
                    /students <br /> per day
                  </div>
                </div>
              </div>
            </div>
            <div className="invisible dropdown dropdown-bottom dropdown-end absolute right-2 top-4 size-8 group-hover:visible">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-neutral btn-sm btn-circle"
              >
                <EllipsisVertical size={15} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box z-[1] w-32 bg-base-300 p-2 shadow"
              >
                <li>
                  <a className="flex gap-4 items-center">
                    <Pencil size={14} />
                    Edit
                  </a>
                </li>
                <li>
                  <a className="flex gap-4 items-center">
                    <Trash size={14} />
                    Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassroomObjects;

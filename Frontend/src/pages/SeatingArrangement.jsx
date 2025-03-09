import React, { useEffect, useState } from "react";
import { useSeatingArrangement } from "../store/useSeatingArrangementstore";

const SeatingArrangement = () => {
  const { getArrangement } = useSeatingArrangement();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const arrangement = await getArrangement();
        setData(arrangement);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message || "Something went wrong"}</div>;
  }

  const colorMap = {};
  let colorIndex = 0;
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-orange-200",
    "bg-teal-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-lime-200",
  ];

  const transposeMatrix = (matrix) => {
    if (!matrix || matrix.length === 0) return [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = Array.from({ length: cols }, () =>
      Array(rows).fill(null)
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        transposed[j][i] = matrix[i][j];
      }
    }
    return transposed;
  };

  return (
    <div>
      {Object.entries(data).map(([slotName, classRooms]) => (
        <div key={slotName} className="m-5 p-2 border-2 border-black">
          <h2>{slotName}</h2>

          <div className="flex gap-5 flex-wrap">
            {classRooms.map((classRoom) => {
              const transposedArrangement = transposeMatrix(
                classRoom.arrangement
              );
              return (
                <div key={classRoom.name}>
                  <h3>{classRoom.name}</h3>
                  <table className="border-collapse w-full">
                    <thead>
                      <tr>
                        <th className="border p-2 text-center">Row/Col</th>
                        {transposedArrangement[0].map((_, index) => (
                          <th key={index} className="border p-2 text-center">
                            {index + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {transposedArrangement.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border p-2 text-center">
                            {rowIndex + 1}
                          </td>
                          {row.map((cell, colIndex) => {
                            let cellColor = "";
                            if (cell !== null) {
                              if (!colorMap[cell]) {
                                colorMap[cell] =
                                  colors[colorIndex % colors.length];
                                colorIndex++;
                              }
                              cellColor = colorMap[cell];
                            }

                            return (
                              <td
                                key={colIndex}
                                className={`border p-2 text-center ${cellColor}`}
                              >
                                {cell !== null ? cell : "-"}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatingArrangement;
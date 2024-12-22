import ReactPaginate from "react-paginate";
import { useState } from "react";

export default function WeatherTable({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentData = data.time.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Max Temp</th>
            <th className="px-4 py-2">Min Temp</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((time, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <td className="border px-4 py-2">{time}</td>
              <td className="border px-4 py-2">
                {data.temperature_2m_max[index]}
              </td>
              <td className="border px-4 py-2">
                {data.temperature_2m_min[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          onPageChange={handlePageClick}
          pageCount={Math.ceil(data.time.length / itemsPerPage)}
          containerClassName="flex space-x-2"
          activeClassName="bg-blue-500 text-white"
          pageClassName="px-3 py-1 border rounded hover:bg-blue-100 transition duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}

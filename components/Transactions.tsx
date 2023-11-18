import React from "react";
import { FiFileText } from "react-icons/fi";
import Tables from "./Tables";

type Props = {};

const Transactions = (props: Props) => {
  return (
    <section className=" py-5 px-5 my-10">
      <div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between">
          <h1 className="bg-[#164e63] w-fit text-white px-5 text-lg font-medium rounded-sm">
            Transactions
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white shadow-sm transition duration-200 py-2 px-3 rounded-md cursor-pointer text-[#475569]">
              <FiFileText />
              <span className=" font-medium whitespace-nowrap">Export to Excel</span>
            </div>
            <div className="flex items-center gap-2 bg-white shadow-sm transition duration-200 py-2 px-3 rounded-md cursor-pointer text-[#475569]">
              <FiFileText />
              <span className="font-medium whitespace-nowrap">Export to PDF</span>
            </div>
          </div>
        </div>
        {/* Tables */}
        <Tables />
      </div>
    </section>
  );
};

export default Transactions;
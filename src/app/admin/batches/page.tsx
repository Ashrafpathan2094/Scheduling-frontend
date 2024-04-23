'use client';

import { createColumnHelper } from '@tanstack/react-table';
import AddBatches from 'components/addBatches';
import DataTable from 'components/dataTable/dataTable';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
const Batches = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const [tableData, setTableData] = useState<any>({
    lecturers: [{ name: 'ashraf', timings: '12 - 2' }],
    totalCount: 15,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnHelper = createColumnHelper<any>();
  const [loading, setLoading] = useState(false);

  const columns: any = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Batch Name
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <div className="mr-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.row.index + 1} . {info.getValue()}{' '}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('timings', {
      id: 'timings',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Batch Timings
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];
  return (
    <div className="relative">
      {isModalOpen && <AddBatches setIsModelClose={setIsModalOpen} />}
      <div className="flex w-full p-4">
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 flex-row-reverse">
          <div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-sm bg-[#008BD2] px-4 py-2 font-poppins font-extrabold text-white"
            >
              Add Batch
            </div>
          </div>
        </div>
      </div>
      <div>
        {tableData?.lecturers && tableData?.lecturers.length > 0 ? (
          <DataTable columns={columns} tableData={tableData?.lecturers} />
        ) : (
          <div className="flex min-h-[80vh] items-center justify-center text-4xl	font-bold	">
            {!loading ? 'No Users Found' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;

'use client';

import { createColumnHelper } from '@tanstack/react-table';
import AddBatches from 'components/addBatches';
import DataTable from 'components/dataTable/dataTable';
import FullScreenLoader from 'components/fullscreenLoader';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const Batches = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const name = searchParams.get('name');

  const [batchData, setBatchData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const columnHelper = createColumnHelper<any>();

  const columns: any = [
    columnHelper.accessor('batchName', {
      id: 'batchName',
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
          {info.row.original.start} - {info.row.original.end}
        </p>
      ),
    }),
  ];

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}batches/findAll`,
          {
            method: 'POST',
            body: JSON.stringify({ courseId: id }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          setBatchData(data?.batchList);
        } else {
          console.error('Failed to get the batches');
          toast.error('Failed to get the batches');
        }
      } catch (error) {
        console.error('Failed to get the batches:', error);
        toast.error('Failed to get the batches');
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, [id]);
  return (
    <div className="relative">
      {loading && <FullScreenLoader />}
      {isModalOpen && (
        <AddBatches
          setIsModelClose={setIsModalOpen}
          id={id}
          setBatchData={setBatchData}
        />
      )}
      <div className="flex w-full p-4">
        <div className="flex w-1/2 text-4xl font-extrabold">
          Course : {name}
        </div>
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
        {batchData && batchData.length > 0 ? (
          <DataTable columns={columns} tableData={batchData} />
        ) : (
          <div className="flex min-h-[80vh] items-center justify-center text-4xl	font-bold	">
            {!loading ? 'No Batches found Found' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;

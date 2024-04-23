'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddLecturer from 'components/addLecturer';
import DataTable from 'components/dataTable/dataTable';
import FullScreenLoader from 'components/fullscreenLoader';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Lecturers = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnHelper = createColumnHelper<any>();
  const [loading, setLoading] = useState(false);

  const columns: any = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          User Name
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
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Email
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}lecturer`,
        );
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
        } else {
          console.error('Failed to get the lecturers');
          toast.error('Failed to get the lecturers');
        }
      } catch (error) {
        console.error('Failed to get the lecturers:', error);
        toast.error('Failed to get the lecturers');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to execute only once on component mount

  return (
    <div className="relative">
      {loading && <FullScreenLoader />}
      {isModalOpen && (
        <AddLecturer
          setIsModelClose={setIsModalOpen}
          setTableData={setTableData}
        />
      )}
      <div className="flex w-full p-4">
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 flex-row-reverse">
          <div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-sm bg-[#008BD2] px-4 py-2 font-poppins font-extrabold text-white"
            >
              Add Lecturer
            </div>
          </div>
        </div>
      </div>
      <div>
        {tableData && tableData.length > 0 ? (
          <DataTable columns={columns} tableData={tableData} />
        ) : (
          <div className="flex min-h-[80vh] items-center justify-center text-4xl	font-bold	">
            {!loading ? 'No Lecturer Found' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lecturers;

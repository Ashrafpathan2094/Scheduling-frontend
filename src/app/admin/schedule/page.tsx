'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddCourses from 'components/addCourses';
import AddSchedule from 'components/addSchedule';
import DataTable from 'components/dataTable/dataTable';
import FullScreenLoader from 'components/fullscreenLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedulesData] = useState<any>([]);

  const columnHelper = createColumnHelper<any>();
  const [loading, setLoading] = useState(false);

  const columns: any = [
    columnHelper.accessor('instructorDetails', {
      id: 'instructorDetails',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Lecturer Name
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <div className="mr-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.row.index + 1} . {info.row.original.instructorDetails[0].name}
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('courseDetails', {
      id: 'courseDetails',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Course Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.row.original?.courseDetails[0]?.name || ''}
        </p>
      ),
    }),
    columnHelper.accessor('batchDetails', {
      id: 'batchDetails',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Batch Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.row.original.batchDetails[0].batchName}
        </p>
      ),
    }),
    columnHelper.accessor('date', {
      id: 'date',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">Date</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}scheduling`,
        );
        if (response.ok) {
          const data = await response.json();
          console.log('🚀 ~ fetchSchedules ~ data:', data);
          setSchedulesData(data);
        } else {
          console.error('Failed to get the schedules');
          toast.error('Failed to get the schedules');
        }
      } catch (error) {
        console.error('Failed to get the schedules:', error);
        toast.error('Failed to get the schedules');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);
  return (
    <div className="relative">
      {loading && <FullScreenLoader />}
      {isModalOpen && <AddSchedule setIsModelClose={setIsModalOpen} />}
      <div className="flex w-full p-4">
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 flex-row-reverse">
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-sm bg-[#008BD2] px-4 py-2 font-poppins font-extrabold text-white"
            >
              Schedule a Batch
            </button>
          </div>
        </div>
      </div>
      <div>
        {schedules && schedules.length > 0 ? (
          <DataTable columns={columns} tableData={schedules} />
        ) : (
          <div className="flex min-h-[80vh] items-center justify-center text-4xl	font-bold	">
            {!loading ? 'No Users Found' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;

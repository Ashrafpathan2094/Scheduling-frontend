'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddCourses from 'components/addCourses';
import AddSchedule from 'components/addSchedule';
import DataTable from 'components/dataTable/dataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableData, setTableData] = useState<any>({
    courses: [
      {
        _id: '123',
        lecturerName: 'ashraf',
        courseName: 'test course',
        batchName: 'batchName test',
        date: '12-2-1',
      },
    ],
    totalCount: 15,
  });

  const columnHelper = createColumnHelper<any>();
  const [loading, setLoading] = useState(false);

  const columns: any = [
    columnHelper.accessor('lecturerName', {
      id: 'lecturerName',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Lecturer Name
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
    columnHelper.accessor('courseName', {
      id: 'courseName',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Course Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('batchName', {
      id: 'batchName',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Batch Name
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
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

  // useEffect(() => {
  //   const fetchUsers = async () => {

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(data),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )

  //     if (response.ok) {
  //       setSuccess(true)
  //       setError('')
  //     } else {
  //       setError(
  //         'There was a problem while attempting to send you a password reset email. Please try again.',
  //       )
  //     }
  //   }, [])
  //     try {
  //       setLoading(true);
  //       const userData = await getUsers(filter);
  //       setTableData(userData?.data?.data);
  //     } catch (error) {
  //       console.log('error', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  return (
    <div className="relative">
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
        {tableData?.courses && tableData?.courses.length > 0 ? (
          <DataTable columns={columns} tableData={tableData?.courses} />
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

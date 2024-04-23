'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddLecturer from 'components/addLecturer';
import DataTable from 'components/dataTable/dataTable';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Lecturers = () => {
  const [tableData, setTableData] = useState<any>({
    lecturers: [{ name: 'ashraf', email: 'test@test.com' }],
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
      {isModalOpen && <AddLecturer setIsModelClose={setIsModalOpen} />}
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

export default Lecturers;

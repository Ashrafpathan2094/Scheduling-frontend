'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddCourses from 'components/addCourses';
import DataTable from 'components/dataTable/dataTable';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableData, setTableData] = useState<any>({
    courses: [
      {
        _id: '123',
        name: 'ashraf',
        level: '1',
        description: 'desciption',
        image:
          'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      },
    ],
    totalCount: 15,
  });

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
    columnHelper.accessor('level', {
      id: 'level',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          level
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          description
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('image', {
      id: 'image',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Image
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          <Image
            src={`data:image/jpeg;base64,${info.getValue()}`}
            height={20}
            width={20}
            alt="course image"
          />
        </p>
      ),
    }),
    columnHelper.accessor('_id', {
      id: '_id',
      header: () => (
        <p className="text-sm font-bold text-[#B1A2D0] dark:text-white">
          Batches
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          <a href={`/admin/batches?id=${info.getValue()}`}>
            <Image
              src={`/img/eye-icon.png`}
              height={20}
              width={20}
              alt="course image"
            />
          </a>
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
      {isModalOpen && <AddCourses setIsModelClose={setIsModalOpen} />}
      <div className="flex w-full p-4">
        <div className="flex w-1/2"></div>
        <div className="flex w-1/2 flex-row-reverse">
          <div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-sm bg-[#008BD2] px-4 py-2 font-poppins font-extrabold text-white"
            >
              Add Courses
            </div>
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

export default Courses;

'use client';
import { createColumnHelper } from '@tanstack/react-table';
import AddCourses from 'components/addCourses';
import DataTable from 'components/dataTable/dataTable';
import FullScreenLoader from 'components/fullscreenLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [coursesData, setCoursesData] = useState<any>([]);

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
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${info.getValue()}`}
            height={50}
            width={50}
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
          <a
            href={`/admin/batches?id=${info.getValue()}&name=${
              info.row.original.name
            }`}
          >
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}courses`,
        );
        if (response.ok) {
          const data = await response.json();
          console.log('🚀 ~ fetchCourses ~ data:', data);
          setCoursesData(data);
        } else {
          console.error('Failed to get the courses');
          toast.error('Failed to get the courses');
        }
      } catch (error) {
        console.error('Failed to get the courses:', error);
        toast.error('Failed to get the courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  return (
    <div className="relative">
      {loading && <FullScreenLoader />}
      {isModalOpen && (
        <AddCourses
          setIsModelClose={setIsModalOpen}
          setCoursesData={setCoursesData}
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
              Add Courses
            </div>
          </div>
        </div>
      </div>
      <div>
        {coursesData && coursesData.length > 0 ? (
          <DataTable columns={columns} tableData={coursesData} />
        ) : (
          <div className="flex min-h-[80vh] items-center justify-center text-4xl	font-bold	">
            {!loading ? 'No Courses Found' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

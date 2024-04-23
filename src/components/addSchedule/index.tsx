import Card from 'components/card';
import FullScreenLoader from 'components/fullscreenLoader';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddSchedule = ({ setIsModelClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [value, onChange] = useState(new Date());

  const [allCourses, setAllCourses] = useState([
    { label: 'testing course', value: '123123123' },
    { label: 'testing course 1', value: '123123123' },
    { label: 'testing course 1', value: '123123123' },
  ]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name should be at least 3 characters')
      .max(20, 'Name should be at most 20 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/submit-job-application`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        );

        if (response.ok) {
          console.log('Job application submitted successfully!');
          toast.success('Lecturer Created');
          setIsModelClose(false);
        } else {
          console.error('Failed to create the lecturer');
          toast.error('Failed to create the lecturer');

          // Handle error if needed
        }
      } catch (error) {
        console.error('Failed to create the lecturer:', error);
        toast.error('Failed to create the lecturer');

        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => {
    setIsModelClose(false);
  };

  return (
    <div
      className={`absolute top-0 z-[60] flex min-h-[100vh] w-[100%] items-center justify-center bg-[rgba(0,0,0,0.25)]`}
    >
      {isLoading && <FullScreenLoader />}
      <div className="max-[580px]:min-w-[90%] min-w-[60%] overflow-hidden rounded-[1.25rem] bg-[#fff] p-8">
        <div className="flex items-center justify-end">
          <button type="button" onClick={handleClose}>
            <Image
              src={`/img/close-icon.svg`}
              alt="modal banner"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="text-2xl font-extrabold">Add Schedule</div>
        <div className="flex items-center justify-center">
          <div className="min-[1025px]:w-[30%] w-[100%] min-w-[30%]">
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`flex h-[17rem] flex-col items-center justify-center`}
              >
                <>
                  <Card extra="flex w-full h-full flex-col px-3 py-3">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
                      nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
                      view={'month'}
                    />
                  </Card>
                </>
              </div>
              <div className="mt-5 flex w-full items-center justify-end gap-2">
                <button
                  type="submit"
                  className={`flex h-[2.5rem] w-[6.5rem] items-center justify-center rounded-lg bg-[#008BD2] text-lg font-semibold text-[#fff]`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;

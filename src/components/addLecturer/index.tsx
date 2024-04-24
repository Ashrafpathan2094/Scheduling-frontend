import FullScreenLoader from 'components/fullscreenLoader';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';

const AddLecturer = ({ setIsModelClose, setTableData }) => {
  const [isLoading, setIsLoading] = useState(false);

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
        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}lecturer`,
        //   {
        //     mode: 'no-cors',
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        //   },
        // );

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}lecturer`,
          values,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('🚀 ~ onSubmit: ~ response:', response);
        if (response.status === 200 || response.status === 201) {
          const newLecturer = await response.data;
          setTableData((prevTableData) => [newLecturer, ...prevTableData]);
          console.log('Lecturer created successfully!');
          toast.success('Lecturer Created');

          setIsModelClose(false);
        } else {
          console.error('Failed to create the lecturer');
          toast.error('Failed to create the lecturer');
        }
      } catch (error) {
        console.error('Failed to create the lecturer:', error);
        toast.error('Failed to create the lecturer');
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
        <div className="text-2xl font-extrabold">Add Lecturer</div>
        <div className="flex items-center justify-center">
          <div className="min-[1025px]:w-[30%] w-[100%] min-w-[30%]">
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`flex h-[17rem] flex-col items-center justify-center`}
              >
                <>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="name"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Name
                    </label>
                    <input
                      className={`mt-2 w-full rounded-[0.5rem]  border-[#8D8D8D] bg-[#F9FAFA]  p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
                      type="text"
                      id="name"
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="email"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Email
                    </label>
                    <input
                      className={` mt-2 w-full rounded-[0.5rem]  border-[#8D8D8D] bg-[#F9FAFA]  p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
                      type="email"
                      id="email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>
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

export default AddLecturer;

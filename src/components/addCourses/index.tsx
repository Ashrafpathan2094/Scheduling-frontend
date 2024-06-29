import FullScreenLoader from 'components/fullscreenLoader';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddCourses = ({ setIsModelClose, setCoursesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('1');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name should be at least 3 characters')
      .max(20, 'Name should be at most 20 characters')
      .required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      level: '1',
      description: '',
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        // Create FormData object
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('level', values.level);
        formData.append('description', values.description);
        if (values.image) {
          formData.append('image', values.image);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}courses`,
          {
            method: 'POST',
            body: formData,
          },
        );

        if (response.ok) {
          const newCourse = await response.json();
          setCoursesData((prevTableData) => [newCourse, ...prevTableData]);
          toast.success('Course Created');
          setIsModelClose(false);
        } else {
          console.error('Failed to create the Course');
          toast.error('Failed to create the Course');
        }
      } catch (error) {
        console.error('Failed to create the Course:', error);
        toast.error('Failed to create the Course');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => {
    setIsModelClose(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
    } else {
      formik.setFieldValue('image', '');
    }
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
        <div className="text-2xl font-extrabold">Add Course</div>
        <div className="flex items-center justify-center">
          <div className="min-[1025px]:w-[30%] w-[100%] min-w-[30%]">
            <form onSubmit={formik.handleSubmit}>
              <div className={`flex flex-col items-center justify-center`}>
                <>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="name"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Name
                    </label>
                    <input
                      className={`mt-2 w-full rounded-[0.5rem] border-[#8D8D8D] bg-[#F9FAFA] p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
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
                      htmlFor="level"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Level
                    </label>
                    <select
                      className={`mt-2 w-full rounded-[0.5rem] border-[#8D8D8D] bg-[#F9FAFA] p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
                      id="level"
                      value={selectedLevel}
                      onChange={(e) => {
                        formik.setFieldValue('level', e.target.value);
                        setSelectedLevel(e.target.value);
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="description"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Description
                    </label>
                    <textarea
                      className={`mt-2 w-full rounded-[0.5rem] border-[#8D8D8D] bg-[#F9FAFA] p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
                      id="description"
                      {...formik.getFieldProps('description')}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className="text-red-500">
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="image"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/png,image/jpeg"
                      onChange={handleFileChange}
                    />
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

export default AddCourses;

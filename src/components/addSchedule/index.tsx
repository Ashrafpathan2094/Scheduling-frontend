import Card from 'components/card';
import FullScreenLoader from 'components/fullscreenLoader';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddSchedule = ({ setIsModelClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [value, onChange] = useState(new Date());
  console.log('🚀 ~ AddSchedule ~ value:', value);

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

  const handleSelect = (ranges: any) => {
    console.log('ranges', ranges);
  };

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
            <form onSubmit={formik.handleSubmit} className="mt-5">
              <div className={`min-w-full `}>
                <div
                  onClick={() => setShowCalendar(true)}
                  className="relative flex items-start justify-start gap-5 "
                >
                  Select Date <FaCalendarAlt />
                  {showCalendar && (
                    <div className="absolute left-[30%] top-0 ml-[20rem] mt-5 w-[15rem]">
                      <Calendar
                        onChange={handleSelect}
                        value={value}
                        prevLabel={<MdChevronLeft className="ml-1 h-6 w-6 " />}
                        nextLabel={<MdChevronRight className="ml-1 h-6 w-6 " />}
                        view={'month'}
                      />
                      <div className="mt-5 flex items-center justify-end gap-10">
                        <button
                          onClick={() => setShowCalendar(false)}
                          className={`flex h-[2.5rem] w-[6.5rem] items-center justify-center rounded-lg bg-[#fff] text-lg font-semibold text-[#008BD2]`}
                        >
                          cancel
                        </button>
                        <button
                          className={`flex h-[2.5rem] w-[6.5rem] items-center justify-center rounded-lg bg-[#008BD2] text-lg font-semibold text-[#fff]`}
                        >
                          Ok
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div>
                  <label htmlFor="dropdown">Select an option:</label>
                  <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select...</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>

              <div></div>
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

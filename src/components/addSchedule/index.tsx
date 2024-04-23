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

const AddSchedule = ({ setIsModelClose, setSchedulesData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coursesData, setCoursesData] = useState<any>([]);
  const [courseId, setCourseId] = useState<any>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [batchData, setBatchData] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState('');

  const [value, setValue] = useState(new Date());

  const handleCourseChange = (event) => {
    setCourseId(event.target.value);
    formik.setFieldValue('courseId', event.target.value);
  };

  const handleBatchChange = (event) => {
    formik.setFieldValue('batchId', event.target.value);
  };

  const handleLecturerChange = (event) => {
    formik.setFieldValue('instructorId', event.target.value);
  };

  const validationSchema = Yup.object({
    date: Yup.string().required('date is required'),
    courseId: Yup.string().required('Course is required'),
    batchId: Yup.string().required('Batch is required'),
    instructorId: Yup.string().required('Lecturer is required'),
  });

  const handleSelect = (range: any) => {
    setValue(range);
    const selectedDate = new Date(range);
    const formattedDate = selectedDate
      .toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');
    setSelectedDate(formattedDate);
  };
  const formik = useFormik({
    initialValues: {
      date: '',
      courseId: '',
      batchId: '',
      instructorId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}scheduling`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        );
        console.log('response', response);
        if (response.ok) {
          const newSchedule = await response.json();
          if (newSchedule?.code == '201') {
            toast.error(newSchedule?.message);
            return;
          }
          setSchedulesData((prevTableData) => [newSchedule, ...prevTableData]);
          console.log('Schedule Added!');
          toast.success('Schedule Added');
          setIsModelClose(false);
        } else {
          console.error('Failed to Add a Schedule');
          toast.error('Failed to Add a Schedule');
        }
      } catch (error) {
        console.error('Failed to Add a Schedule:', error);
        toast.error('Failed to Add a Schedule');

        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleClose = () => {
    setIsModelClose(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}courses`,
        );
        if (response.ok) {
          const data = await response.json();
          setCoursesData(data);
        } else {
          console.error('Failed to get the courses');
          toast.error('Failed to get the courses');
        }
      } catch (error) {
        console.error('Failed to get the courses:', error);
        toast.error('Failed to get the courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}batches/findAll`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId: courseId }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          setBatchData(data?.batchList);
          if (data?.batchList.length > 0) {
            formik.setFieldValue('batchId', data?.batchList[0]?._id);
          }
        } else {
          console.error('Failed to get the batch');
          toast.error('Failed to get the batch');
        }
      } catch (error) {
        console.error('Failed to get the batch:', error);
        toast.error('Failed to get the batch');
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchBatches();
    }
  }, [courseId, formik]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}lecturer`,
        );
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
          if (data.length > 0) {
            formik.setFieldValue('instructorId', data[0]?._id);
          }
        } else {
          console.error('Failed to get the lecturers');
          toast.error('Failed to get the lecturers');
        }
      } catch (error) {
        console.error('Failed to get the lecturers:', error);
        toast.error('Failed to get the lecturers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [formik]);
  console.log('formik.values', formik.values);

  const handleOkClick = () => {
    formik.setFieldValue('date', selectedDate);
    setShowCalendar(false);
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
                </div>
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-red-500">{formik.errors.date}</div>
                ) : null}
                {showCalendar && (
                  <div className="my-10 w-[15rem]">
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
                        onClick={handleOkClick}
                        className={`flex h-[2.5rem] w-[6.5rem] items-center justify-center rounded-lg bg-[#008BD2] text-lg font-semibold text-[#fff]`}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                )}
                <div className="my-4">
                  <label htmlFor="Course" className="text-base font-bold">
                    Select an Course:
                  </label>
                  <select
                    id="Course"
                    value={formik.values.courseId}
                    onChange={handleCourseChange}
                    className="mx-4 w-[50%] text-base "
                  >
                    {coursesData.map((option, index) => (
                      <option
                        key={index}
                        value={option?._id}
                        className="text-base "
                      >
                        {option?.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.courseId && formik.errors.courseId ? (
                    <div className="text-red-500">{formik.errors.courseId}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <label htmlFor="batch" className="text-base font-bold">
                    Select an Batch:
                  </label>
                  <select
                    id="batch"
                    value={formik.values.batchId}
                    onChange={handleBatchChange}
                    className="text-base "
                  >
                    {batchData.map((option, index) => (
                      <option key={index} value={option?._id}>
                        {option?.batchName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.batchId && formik.errors.batchId ? (
                    <div className="text-red-500">{formik.errors.batchId}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <label htmlFor="Lecturer" className="text-base font-bold">
                    Select an Lecturer:
                  </label>
                  <select
                    id="Lecturer"
                    value={formik.values.instructorId}
                    onChange={handleLecturerChange}
                    className="text-base "
                  >
                    {tableData.map((option, index) => (
                      <option key={index} value={option?._id}>
                        {option?.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.instructorId && formik.errors.instructorId ? (
                    <div className="text-red-500">
                      {formik.errors.instructorId}
                    </div>
                  ) : null}
                </div>
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

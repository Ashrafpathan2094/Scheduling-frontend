import { TimePicker } from 'antd';
import FullScreenLoader from 'components/fullscreenLoader';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const AddBatches = ({ setIsModelClose, id, setBatchData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    batchName: Yup.string()
      .min(3, 'Name should be at least 3 characters')
      .max(20, 'Name should be at most 20 characters')
      .required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      batchName: '',
      timings: ['00:00', '00:00'],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}batches`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              batchName: values.batchName,
              start: values.timings[0],
              end: values.timings[1],
              courseId: id,
            }),
          },
        );

        if (response.ok) {
          const newBatch = await response.json();
          console.log('Job application submitted successfully!');
          toast.success('Batch Created');
          setBatchData((prevTableData) => [newBatch, ...prevTableData]);

          setIsModelClose(false);
        } else {
          console.error('Failed to create the Batch');
          toast.error('Failed to create the Batch');

          // Handle error if needed
        }
      } catch (error) {
        console.error('Failed to create the Batch:', error);
        toast.error('Failed to create the Batch');

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
        <div className="text-2xl font-extrabold">Add Batch</div>
        <div className="flex items-center justify-center">
          <div className="min-[1025px]:w-[30%] w-[100%] min-w-[30%]">
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`flex h-[17rem] flex-col items-center justify-center`}
              >
                <>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="batchName"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Name
                    </label>
                    <input
                      className={`mt-2 w-[50%] rounded-[0.5rem]  border-[#8D8D8D] bg-[#F9FAFA]  p-2 text-gray-700 transition-all duration-300 focus:border-[#000]`}
                      type="text"
                      id="batchName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.batchName}
                    />
                    {formik.touched.batchName && formik.errors.batchName ? (
                      <div className="text-red-500">
                        {formik.errors.batchName}
                      </div>
                    ) : null}
                  </div>
                  <div className="my-3 flex w-[100%] flex-col items-start justify-center">
                    <label
                      htmlFor="timings"
                      className="mb-2 text-base font-medium text-[#192734]"
                    >
                      Pick Timings for the batch
                    </label>
                    <TimePicker.RangePicker
                      value={[
                        dayjs(formik.values.timings[0], 'HH:mm'),
                        dayjs(formik.values.timings[1], 'HH:mm'),
                      ]}
                      format={'HH:mm'}
                      onChange={(e, time) => {
                        formik.setFieldValue('timings', time);
                      }}
                    />

                    {formik.touched.timings && formik.errors.timings ? (
                      <div className="text-red-500">
                        {formik.errors.timings}
                      </div>
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

export default AddBatches;

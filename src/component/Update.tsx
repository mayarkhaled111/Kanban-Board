import { useFormik } from "formik";
import * as Yup from "yup";
import { Member } from "../Interfaces";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormValues {
  column: string;
  title: string;
  name: string;
  age: number;
  email: string;
  phone: string;
}

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch member from localStorage
  const storedData = JSON.parse(localStorage.getItem('myData') || '[]');
  const member = storedData.find((item: Member) => `${item.id}` === id);



  // Validation schema for the form
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().min(2, 'Min length is 2 characters').max(10, 'Max length is 10 characters').required('Name is required'),
    age: Yup.number().required('Age is required'),
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Invalid phone format').required('Phone is required'),
    column: Yup.string().oneOf(['Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send To Therapist']).required('You must choose a column'),
  });

  // useFormik with initialValues set to the member data
  const formik = useFormik({
    initialValues: {
      column: member.column,
      title: member.title,
      name: member.name,
      age: member.age,
      email: member.email,
      phone: member.phone,
    },
    validationSchema,
    onSubmit: (values) => {
      submitValue(values);
    },
  });

  // Handle form submission to update the member data in localStorage
  function submitValue(values: FormValues) {
    const updatedMember = { ...member, ...values };
    const updatedData = storedData.map((item: Member) =>
      item.id === member.id ? updatedMember : item
    );
    localStorage.setItem('myData', JSON.stringify(updatedData));
    navigate('/');
    toast.info('Updated Is Done')
  }

  return (
    <div className="container mt-10">
      <h1 className="my-6 text-3xl text-borderColor text-center">Update Your Member</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-600">{formik.errors.name as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input type="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-600">{formik.errors.email as string}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input type="tel" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-xs text-red-600">{formik.errors.phone as string}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Age</label>
            <input type="number" id="age" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {formik.touched.age && formik.errors.age && (
              <p className="text-xs text-red-600">{formik.errors.age as string}</p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your title</label>
          <textarea id="title" rows={4} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {formik.touched.title && formik.errors.title && (
            <p className="text-xs text-red-600">{formik.errors.title as string}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="column" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Column</label>
          <select id="column" name="column" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.column} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" label="Select column" disabled />
            <option value="Unclaimed" label="Unclaimed" />
            <option value="First Contact" label="First Contact" />
            <option value="Preparing Work Offer" label="Preparing Work Offer" />
            <option value="Send To Therapist" label="Send To Therapist" />
          </select>
          {formik.touched.column && formik.errors.column && (
            <p className="text-xs text-red-600">{formik.errors.column as string}</p>
          )}
        </div>

        <button type="submit" className="text-borderColor bg-CardBackGround hover:bg-CardBackGround focus:ring-4 focus:outline-none focus:ring-CardBackGround font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-CardBackGround dark:hover:bg-CardBackGround dark:focus:ring-CardBackGround block ms-auto">
          Update
        </button>
      </form>
    </div>
  );
}
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Form() {

  let navigate = useNavigate()

  interface FormValues{
    column: string;
    title: string;
    name: string;
    age: number;
    email: string;
    phone: string;
  }

  let validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    name: Yup.string().min(2, 'min length is 2 character').max(10, 'max length is 10 character').required('name is required'),
    age: Yup.number().required('Age is required'),
    email: Yup.string().matches(/^[a-zA-Z0-9._%]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/, 'Email must be valid').required('Email is required'),
    phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'Phone must be valid').required('Phone is required')
  })

  const formik = useFormik({
    initialValues: {
      column: "Unclaimed",
      title: '',
      name: '',
      age: 0,
      email: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submitValue,
  })

  function submitValue(values:FormValues){
    const newData = {
      id: uuidv4(),
      ...values,
    };
    let myData = JSON.parse(localStorage.getItem('myData') || '[]');
    myData.push(newData);

  localStorage.setItem('myData', JSON.stringify(myData));
  navigate('/')
  formik.resetForm();
  toast.info('Member Added Successfully')
  }

  return (
    <div className="container mt-10">
      <h1 className='my-6 text-3xl text-borderColor text-center'>Add Your Member</h1>
      <form onSubmit={formik.handleSubmit}>
            <div className='grid gap-6 mb-3 md:grid-cols-2'>
              <div >
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

            <div className='grid gap-6 mb-3 md:grid-cols-2'>
              <div className="">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input type="tel" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-xs text-red-600">{formik.errors.phone as string}</p>
                )}
              </div>

              <div className="">
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
            <button type="submit" className="text-borderColor bg-CardBackGround hover:bg-CardBackGround focus:ring-4 focus:outline-none focus:ring-CardBackGround font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-CardBackGround dark:hover:bg-CardBackGround dark:focus:ring-CardBackGround block ms-auto">Add</button>
          </form>
    </div>

  )
}

// import { toast, ToastOptions } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// type messageType = 'default' | 'success' | 'warning' | 'error';

// const getDefaultOptions = (): ToastOptions => ({
//   position: 'top-right',
//   autoClose: 3000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
// });

// function isNumeric(input:any) {
//   // Check if input is a number or a numeric string
//   return !isNaN(parseFloat(input)) && isFinite(input);
// }

// const emitMessage = (message: string, type: messageType = 'default'): void => {
//   if (typeof message !== 'string') return;
//   else {
//     switch (type) {
//       case 'success':
//         toast.success(isNumeric(message)?'Successful':message || 'Successful', { ...getDefaultOptions() });
//         break;
//       case 'warning':
//         toast.warn(isNumeric(message)?'Warning':message || 'Warning', { ...getDefaultOptions() });
//         break;
//       case 'error':
//         toast.error(isNumeric(message)?'Something Went Wrong':message || 'Something Went Wrong', {
//           ...getDefaultOptions(),
//           toastId: 'error',
//         });
//         break;
//       case 'default':
//       default:
//         toast.info(message, { ...getDefaultOptions(), toastId: 'default' });
//         break;
//     }
//   }
// };

// export default emitMessage;

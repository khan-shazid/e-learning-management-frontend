import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastSuccess = (msg) => toast.success(msg);
export const toastError = (msg) => toast.error(msg);

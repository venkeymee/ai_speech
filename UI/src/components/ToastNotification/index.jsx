import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props) => {

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      {...props}
    />
  )
}

let notify = {
  success: (msg, options = undefined) => {
    toast.success(msg || '', options);
  },
  info: (msg, options = undefined) => {
    toast.info(msg || '', options);
  },
  error: (msg, options = undefined) => {
    toast.error(msg || '', options);
  },
  warning: (msg, options = undefined) => {
    toast.warning(msg || '', options);
  },
  dark: (msg, options = undefined) => {
    toast.dark(msg || '', options);
  },
}

export {
  Notification,
  notify
}
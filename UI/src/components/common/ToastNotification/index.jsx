import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = (props: any) => {

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      {...props}
    />
  )
}

let notify = {
  success: (msg: string, options = undefined) => {
    toast.success(msg || '', options);
  },
  info: (msg: string, options = undefined) => {
    toast.info(msg || '', options);
  },
  error: (msg: string, options = undefined) => {
    toast.error(msg || '', options);
  },
  warning: (msg: string, options = undefined) => {
    toast.warning(msg || '', options);
  },
  dark: (msg: string, options = undefined) => {
    toast.dark(msg || '', options);
  },
}

export {
  Notification,
  notify
}
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Success from './Success';

const SweetAlert = withReactContent(Swal);

export const showTxAlert = ({
  title,
  progressSteps,
  confirmButtonText,
  showCancelButton,
  showConfirmButton,
  showLoaderOnConfirm,
  html,
  onClose,
  preConfirm
}: {
  title?: string;
  progressSteps?: string[];
  confirmButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  showLoaderOnConfirm?: boolean;
  html?: any;
  onClose?: any;
  preConfirm?: any;
}) => {
  SweetAlert.fire({
    title,
    progressSteps,
    confirmButtonText,
    showCancelButton,
    showConfirmButton,
    showLoaderOnConfirm,
    html,
    onClose,
    preConfirm
  });
};

export const showSuccess = (html: any, onClose?: any) =>
  SweetAlert.fire({
    icon: 'success',
    html,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
    onClose
  });

export const showError = (html, onClose?: any) =>
  SweetAlert.fire({
    icon: 'error',
    html,
    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true,
    onClose
  });

import { sileo } from 'sileo';

export const PASSWORD_TOAST_ID = 'pass-req';

export function showSuccessToast(options) {
  return sileo.success(options);
}

export function showErrorToast(options) {
  return sileo.error(options);
}

export function showInfoToast(options) {
  return sileo.info(options);
}

export function showWarningToast(options) {
  return sileo.warning(options);
}

export function showActionToast(options) {
  return sileo.action(options);
}

export function dismissToast(id) {
  sileo.dismiss(id);
}

export function clearToasts(position) {
  sileo.clear(position);
}

export function showPromiseToast(promise, options) {
  return sileo.promise(promise, options);
}

export const notify = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  warning: showWarningToast,
  action: showActionToast,
  dismiss: dismissToast,
  clear: clearToasts,
  promise: showPromiseToast,
};

export function dismissPasswordToast() {
  dismissToast(PASSWORD_TOAST_ID);
}

export function showPasswordRequirementsToast({ hasMismatch, requirementList }) {
  const showToast = hasMismatch ? showWarningToast : showInfoToast;
  showToast({
    id: PASSWORD_TOAST_ID,
    title: 'Password requirements',
    description: requirementList,
    duration: 4000,
  });
}

export function showPasswordSuccessToast() {
  showSuccessToast({
    id: PASSWORD_TOAST_ID,
    title: 'Security criteria met',
    description: 'Your password is strong and ready to use.',
    duration: 2000,
  });
}

export function showRegisterPromiseToast(promise) {
  return showPromiseToast(promise, {
    loading: { title: 'Verifying credentials...' },
    success: { title: 'Welcome to OmniStudy, Professor!' },
    error: { title: 'Registration failed. Please try again.' },
  });
}

export const INITIAL_REGISTER_FORM_DATA = {
  fullname: '',
  teacherId: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters' },
  { key: 'upper', label: 'At least 1 uppercase letter' },
  { key: 'number', label: 'At least 1 number' },
  { key: 'special', label: 'At least 1 symbol (@, #, $, etc.)' },
];

'use client';

import React, { useState } from 'react';
import { SileoNotification } from '../../../components/ui/SileoNotification';
import { showRegisterPromiseToast } from '../../../utils/sileoNotify';
import Modal from '../../../components/layout/Modal';
import RegisterForm from '../../../components/register/RegisterForm';
import RegisterSidebar from '../../../components/register/RegisterSidebar';
import { INITIAL_REGISTER_FORM_DATA, SUFFIX_OPTIONS } from '../../../constants/register.constants';
import useRegisterPasswordValidation from '../../../hooks/useRegisterPasswordValidation';
import styles from './register.module.css';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const [formData, setFormData] = useState(INITIAL_REGISTER_FORM_DATA);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isPassValid } = useRegisterPasswordValidation({ formData, styles });

  const handleRegister = (e) => {
    e.preventDefault();
    showRegisterPromiseToast(new Promise((res) => setTimeout(res, 2000)));
  };

  return (
    <main className={styles.wrapper}>
      <SileoNotification
        titleClassName={styles.toastTitle}
        descriptionClassName={styles.toastDescription}
      />

      <RegisterSidebar styles={styles} />

      <section className={styles.formContainer}>
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegister={handleRegister}
          isAgreed={isAgreed}
          isPassValid={isPassValid}
          setIsAgreed={setIsAgreed}
          setModalType={setModalType}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          styles={styles}
          suffixOptions={SUFFIX_OPTIONS.map((option) => ({
            value: option,
            label: option || 'None',
          }))}
        />
      </section>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)} title={modalType === 'guidelines' ? "Faculty Guidelines" : "Privacy Policy"}>
        <p>OmniStudy ensures the highest standard of data protection for faculty members.</p>
      </Modal>
    </main>
  );
}
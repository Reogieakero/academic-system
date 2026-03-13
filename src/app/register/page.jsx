'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../../components/ui/Button';
import { SileoNotification } from '../../../components/ui/SileoNotification';
import { showRegisterPromiseToast } from '../../../utils/sileoNotify';
import Modal from '../../../components/layout/Modal';
import RegisterSidebar from '../../../components/register/RegisterSidebar';
import PasswordInputField from '../../../components/register/PasswordInputField';
import { INITIAL_REGISTER_FORM_DATA } from '../../../constants/register.constants';
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
        <div className={styles.formContent}>
          <header className={styles.formHeader}>
            <h2 className={styles.brandName}>OmniStudy</h2>
          </header>

          <div className={styles.formTitles}>
            <h3>Registration</h3>
            <p>Already have an account? <Link href="/login">Login here.</Link></p>
          </div>
          
          <form className={styles.registerForm} onSubmit={handleRegister}>
            <div className={styles.fieldGroup}>
              <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required />
              <span className={styles.morphLine}></span>
            </div>

            <div className={styles.fieldGroup}>
              <input type="text" name="teacherId" placeholder="Teacher ID / Employee No." onChange={handleChange} required />
              <span className={styles.morphLine}></span>
            </div>

            <div className={styles.fieldGroup}>
              <input type="email" name="email" placeholder="Institutional Email" onChange={handleChange} required />
              <span className={styles.morphLine}></span>
            </div>
            
            <PasswordInputField
              name="password"
              placeholder="Create Password"
              showPassword={showPassword}
              onChange={handleChange}
              onToggle={() => setShowPassword(!showPassword)}
              styles={styles}
            />

            <PasswordInputField
              name="confirmPassword"
              placeholder="Confirm Password"
              showPassword={showPassword}
              onChange={handleChange}
              onToggle={() => setShowPassword(!showPassword)}
              styles={styles}
            />

            <div className={styles.agreementWrapper}>
              <label className={styles.checkboxContainer}>
                <input type="checkbox" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />
                <span className={styles.checkmark}></span>
                <p>
                  I agree to the <span className={styles.link} onClick={() => setModalType('guidelines')}>Guidelines</span> and <span className={styles.link} onClick={() => setModalType('privacy')}>Privacy Policy</span>.
                </p>
              </label>
            </div>

            <Button type="submit" variant="primary" disabled={!isPassValid || !isAgreed}>
              Register Now
            </Button>

            <Button 
              variant="secondary" 
              icon={<Image src="https://www.google.com/images/branding/product/2x/googleg_16dp.png" alt="G" width={16} height={16} />}
            >
              Sign up with Google
            </Button>
          </form>
        </div>
      </section>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)} title={modalType === 'guidelines' ? "Faculty Guidelines" : "Privacy Policy"}>
        <p>OmniStudy ensures the highest standard of data protection for faculty members.</p>
      </Modal>
    </main>
  );
}
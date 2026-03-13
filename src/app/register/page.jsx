'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { sileo, Toaster } from 'sileo';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/layout/Modal';
import styles from './register.module.css';

const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters' },
  { key: 'upper', label: 'At least 1 uppercase letter' },
  { key: 'number', label: 'At least 1 number' },
  { key: 'special', label: 'At least 1 symbol (@, #, $, etc.)' },
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  
  const [formData, setFormData] = useState({
    fullname: '',
    teacherId: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passValidation = useMemo(() => {
    return {
      length: formData.password.length >= 8,
      upper: /[A-Z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[^A-Za-z0-9]/.test(formData.password),
      match: formData.password === formData.confirmPassword && formData.confirmPassword !== ''
    };
  }, [formData.password, formData.confirmPassword]);

  const isPassValid = Object.values(passValidation).every(Boolean);

  const validationRules = useMemo(() => {
    return [
      ...PASSWORD_RULES.map((rule) => ({
        key: rule.key,
        label: rule.label,
        met: passValidation[rule.key],
      })),
      {
        key: 'match',
        label: 'Passwords must match',
        met: passValidation.match,
      },
    ];
  }, [passValidation]);

  const requirementList = useMemo(() => {
    return (
      <ul className={styles.toastList}>
        {validationRules.map((rule) => {
          const isMismatch = rule.key === 'match' && Boolean(formData.confirmPassword) && !rule.met;
          return (
            <li
              key={rule.key}
              className={
                rule.met
                  ? styles.toastRuleMet
                  : isMismatch
                    ? styles.toastRuleMismatch
                    : styles.toastRulePending
              }
            >
              {rule.label}
            </li>
          );
        })}
      </ul>
    );
  }, [validationRules, formData.confirmPassword]);

  useEffect(() => {
    if (!formData.password) {
      sileo.dismiss('pass-req'); 
      return;
    }

    const unmetRules = validationRules.filter((rule) => !rule.met);

    if (unmetRules.length > 0) {
      const hasMismatch = Boolean(formData.confirmPassword) && unmetRules.some((rule) => rule.key === 'match');

      sileo[hasMismatch ? 'warning' : 'info']({
        id: 'pass-req',
        title: 'Password requirements',
        description: requirementList,
        duration: 4000,
      });
      return;
    }

    sileo.success({
      id: 'pass-req',
      title: 'Security criteria met',
      description: 'Your password is strong and ready to use.',
      duration: 2000,
    });
  }, [formData.password, formData.confirmPassword, validationRules, requirementList]);

  const handleRegister = (e) => {
    e.preventDefault();
    sileo.promise(new Promise((res) => setTimeout(res, 2000)), {
      loading: { title: 'Verifying credentials...' },
      success: { title: 'Welcome to OmniStudy, Professor!' },
      error: { title: 'Registration failed. Please try again.' },
    });
  };

  return (
    <main className={styles.wrapper}>
      <Toaster 
        position="top-center" 
        theme="light"
        options={{
          fill: '#0f172a',
          roundness: 14,
          styles: {
            title: styles.toastTitle,
            description: styles.toastDescription,
          }
        }}
      />

      <section className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.mainIcon}>*</div>
          <div className={styles.welcomeText}>
            <h1>For Educators.</h1>
            <p>Join the OmniStudy faculty network. Manage classrooms and track student integrity in one unified platform.</p>
          </div>
        </div>
        <footer className={styles.sidebarFooter}>
          <p>© 2026 OmniStudy. All rights reserved.</p>
        </footer>
      </section>

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
            
            <div className={styles.fieldGroup}>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  placeholder="Create Password" 
                  onChange={handleChange}
                  required 
                />
                <button type="button" className={styles.iconButton} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
                </button>
                <span className={styles.morphLine}></span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword"
                  placeholder="Confirm Password" 
                  onChange={handleChange}
                  required 
                />
                <button type="button" className={styles.iconButton} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
                </button>
                <span className={styles.morphLine}></span>
              </div>
            </div>

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
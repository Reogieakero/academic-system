'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoEyeOutline, IoEyeOffOutline, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/layout/Modal';
import styles from './register.module.css';

const ValidationRow = ({ fulfilled, text }) => (
  <div className={`${styles.validationItem} ${fulfilled ? styles.valid : styles.invalid}`}>
    {fulfilled ? <IoCheckmarkCircle size={16} /> : <IoCloseCircle size={16} />}
    <span>{text}</span>
  </div>
);

export default function TeacherRegisterPage() {
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
  const canSubmit = isPassValid && isAgreed && formData.fullname && formData.teacherId && formData.email;

  return (
    <main className={styles.wrapper}>
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
            <h3>Teacher Registration</h3>
            <p>Already have an account? <Link href="/login">Login here.</Link></p>
          </div>
          
          <form className={styles.registerForm} onSubmit={(e) => e.preventDefault()}>
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
                <button 
                  type="button" 
                  className={styles.iconButton} 
                  onClick={() => setShowPassword(!showPassword)}
                >
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
                <button 
                  type="button" 
                  className={styles.iconButton} 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
                </button>
                <span className={styles.morphLine}></span>
              </div>
            </div>

            <div className={styles.validationGrid}>
              <ValidationRow fulfilled={passValidation.length} text="8+ Characters" />
              <ValidationRow fulfilled={passValidation.upper} text="Uppercase" />
              <ValidationRow fulfilled={passValidation.number} text="Number" />
              <ValidationRow fulfilled={passValidation.special} text="Symbol" />
              <ValidationRow fulfilled={passValidation.match} text="Passwords Match" />
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

            <Button type="submit" variant="primary" disabled={!canSubmit}>
              Register Now
            </Button>

            <Button 
              variant="secondary" 
              icon={<Image src="https://www.google.com/images/branding/product/2x/googleg_16dp.png" alt="G" width={16} height={16} />}
            >
              Sign up with Google Workspace
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
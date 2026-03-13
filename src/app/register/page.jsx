'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/layout/Modal';
import styles from './register.module.css';

export default function TeacherRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <main className={styles.wrapper}>
      <section className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.mainIcon}>*</div>
          <div className={styles.welcomeText}>
            <h1>For Educators.</h1>
            <p>
              Join the OmniStudy faculty network. Manage your classrooms, 
              track student integrity, and streamline your grading workflow 
              within our dedicated teacher portal.
            </p>
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
            <p>
              Already have a faculty account? <Link href="/login">Login here.</Link>
            </p>
          </div>
          
          <form className={styles.registerForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.fieldGroup}>
              <input type="text" name="fullname" placeholder="Full Name" required />
              <span className={styles.morphLine}></span>
            </div>

            <div className={styles.fieldGroup}>
              <input type="text" name="teacherId" placeholder="Teacher ID / Employee No." required />
              <span className={styles.morphLine}></span>
            </div>

            <div className={styles.fieldGroup}>
              <input type="email" name="email" placeholder="Institutional Email Address" required />
              <span className={styles.morphLine}></span>
            </div>
            
            <div className={styles.fieldGroup}>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Create Password" 
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

            <div className={styles.agreementWrapper}>
              <label className={styles.checkboxContainer}>
                <input 
                  type="checkbox" 
                  checked={isAgreed} 
                  onChange={(e) => setIsAgreed(e.target.checked)} 
                />
                <span className={styles.checkmark}></span>
                <p>
                  I confirm I am a verified faculty member and agree to the 
                  <span className={styles.link} onClick={(e) => { e.preventDefault(); setModalType('guidelines'); }}> Guidelines</span> and 
                  <span className={styles.link} onClick={(e) => { e.preventDefault(); setModalType('privacy'); }}> Privacy Policy</span>.
                </p>
              </label>
            </div>

            <Button type="submit" variant="primary" disabled={!isAgreed}>
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

      <Modal isOpen={modalType === 'guidelines'} onClose={() => setModalType(null)} title="Faculty Guidelines">
        <h4>Verification</h4>
        <p>OmniStudy is exclusive to verified educators. Accounts found to be impersonating faculty will be permanently suspended.</p>
        <h4>Academic Integrity</h4>
        <p>Teachers must use the platform to uphold the highest standards of academic honesty.</p>
      </Modal>

      <Modal isOpen={modalType === 'privacy'} onClose={() => setModalType(null)} title="Privacy Policy">
        <h4>Data Collection</h4>
        <p>We collect institutional email and faculty ID to ensure platform security and verification.</p>
      </Modal>
    </main>
  );
}
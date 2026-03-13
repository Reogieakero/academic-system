'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import styles from './login.module.css';


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className={styles.wrapper}>
      <section className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.mainIcon}>*</div>
          <div className={styles.welcomeText}>
            <h1>OmniStudy !</h1> 
            <p>
              Your secure gateway to academic integrity and student success. 
              Stay connected, access your records, and move forward with confidence 
              in one unified platform.
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
            <h3>Welcome Back!</h3>
            <p>
              New here? <Link href="/register">Create a new account now.</Link>
            </p>
          </div>
          
          <form className={styles.loginForm}>
            <div className={styles.fieldGroup}>
              <input type="email" name="email" placeholder="Email" required />
              <span className={styles.morphLine}></span>
            </div>
            
            <div className={styles.fieldGroup}>
              <div className={styles.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Password" 
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

            <button type="submit" className={styles.primaryButton}>Login Now</button>

            <button type="button" className={styles.secondaryButton}>
              <Image 
                src="https://www.google.com/images/branding/product/2x/googleg_16dp.png" 
                alt="Google" 
                width={16} 
                height={16} 
              />
              Login with Google
            </button>
          </form>

          <footer className={styles.formFooter}>
            <p>Forget password?<Link href="/forgot-password">Click here</Link></p>
          </footer>
        </div>
      </section>
    </main>
  );
}
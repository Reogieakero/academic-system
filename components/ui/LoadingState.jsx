'use client';

import styles from './LoadingState.module.css';

export default function LoadingState({
  fullScreen = false,
  size = 'md',
  label = 'Loading...',
  className = '',
}) {
  const containerClassName = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <div className={`${containerClassName} ${className}`.trim()} role="status" aria-live="polite">
      <div className={`${styles.spinner} ${styles[size] || styles.md}`} aria-hidden="true" />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

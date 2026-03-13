'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoGrid, IoSchool, IoCalendar, IoPeople, IoSettings, IoLogOut } from 'react-icons/io5';
import { supabase } from '../../../utils/supabaseClient';
import styles from './home.module.css';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login');
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const firstName = user?.user_metadata?.first_name || 'Faculty';

  const navItems = [
    { icon: <IoGrid size={20} />, label: 'Dashboard', active: true },
    { icon: <IoSchool size={20} />, label: 'Classes' },
    { icon: <IoPeople size={20} />, label: 'Students' },
    { icon: <IoCalendar size={20} />, label: 'Schedule' },
    { icon: <IoSettings size={20} />, label: 'Settings' },
  ];

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.logo}>
            <span>OmniStudy</span>
          </div>
          <nav className={styles.nav}>
            {navItems.map(({ icon, label, active }) => (
              <a key={label} href="#" className={`${styles.navItem} ${active ? styles.navActive : ''}`}>
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
        <button className={styles.signOutBtn} onClick={handleSignOut}>
          <IoLogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.greeting}>Good day, {firstName}!</h1>
            <p className={styles.subGreeting}>Here&apos;s an overview of your academic dashboard.</p>
          </div>
          <div className={styles.avatar}>
            {firstName.charAt(0).toUpperCase()}
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoSchool size={22} /></div>
            <div>
              <p className={styles.statValue}>0</p>
              <p className={styles.statLabel}>Classes</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoPeople size={22} /></div>
            <div>
              <p className={styles.statValue}>0</p>
              <p className={styles.statLabel}>Students</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoCalendar size={22} /></div>
            <div>
              <p className={styles.statValue}>0</p>
              <p className={styles.statLabel}>Schedules</p>
            </div>
          </div>
        </section>

        <section className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.emptyState}>
            <p>No recent activity yet.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

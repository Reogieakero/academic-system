'use client';

import { IoCheckmark, IoClose, IoPersonAdd } from 'react-icons/io5';
import { ADMIN_USER_FILTERS } from '../../constants/admin.constants';
import LoadingState from '../ui/LoadingState';
import styles from './UserManagement.module.css';

export default function UserManagement({
  filteredUsers,
  onApprove,
  onReject,
  pageLoading,
  setUserFilter,
  userFilter,
  userStatusCounts,
}) {
  return (
    <section className={styles.usersSection}>
      <div className={styles.filterTabs}>
        {ADMIN_USER_FILTERS.map((filterKey) => (
          <button
            key={filterKey}
            className={`${styles.filterTab} ${userFilter === filterKey ? styles.filterTabActive : ''}`}
            onClick={() => setUserFilter(filterKey)}
          >
            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            {filterKey !== 'all' && (
              <span className={styles.filterCount}>{userStatusCounts[filterKey] || 0}</span>
            )}
          </button>
        ))}
      </div>

      {pageLoading ? (
        <div className={styles.tableLoading}>
          <LoadingState size="md" label="Loading users" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <IoPersonAdd size={36} />
          <p>No users found.</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                  <td className={styles.emailCell}>{user.email}</td>
                  <td>
                    <span className={styles.roleBadge}>{user.role}</span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status_${user.status}`]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.status === 'pending' && (
                      <div className={styles.actionBtns}>
                        <button className={styles.approveBtn} onClick={() => onApprove(user.id)}>
                          <IoCheckmark size={14} /> Approve
                        </button>
                        <button className={styles.rejectBtn} onClick={() => onReject(user.id)}>
                          <IoClose size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

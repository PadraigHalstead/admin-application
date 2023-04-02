import { db, auth } from '../config/firebase';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { StudentUserAdminPanel } from '../components/StudentUserAdminPanel';
import { AdminUserAdminPanel } from '../components/AdminUserAdminPanel';

export const RoleBasedRender = () => {
  const [canAccessAdminPanel, setCanAccessAdminPanel] = useState(false);

  useEffect(() => {
    checkCanAccessAdminPanel();
  }, []);

  const checkCanAccessAdminPanel = () => {
    const fetchRolePermissions = async () => {
      try {
        const uid = auth.currentUser.uid;
        const userDataRef = doc(db, 'users', uid);
        const userSnapshot = await getDoc(userDataRef);
        const currentUserData = userSnapshot.data();
        const role = currentUserData.role;
        const roleDocRef = doc(db, 'roles', role);
        const roleDocSnapshot = await getDoc(roleDocRef);
        const roleData = roleDocSnapshot.data();
        setCanAccessAdminPanel(roleData.permissions.canAccessAdminPanel);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRolePermissions();
  };

  return (
    <>
      {!canAccessAdminPanel ? (
        <StudentUserAdminPanel />
      ) : (
        <AdminUserAdminPanel />
      )}
    </>
  );
};

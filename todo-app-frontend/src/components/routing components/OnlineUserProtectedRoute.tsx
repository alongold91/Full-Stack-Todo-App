import { useEffect, useState } from 'react';
import UserLists from '../../screens/user-lists/UserLists';
import ProtectedRoute from './ProtectedRoute';

function OnlineUserProtectedRoute() {

    const [isOnline, setIsOnline] = useState<boolean>(
        Boolean(window.sessionStorage.getItem('connectedUser'))
      );
    
      useEffect(() => {
        // Set up a listener for sessionStorage changes
        function handleStorageChange () {
          setIsOnline(Boolean(window.sessionStorage.getItem('connectedUser')));
        };
    
        // Subscribe to storage events
        window.addEventListener('storage', handleStorageChange);
        
        // Clean up on unmount
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);

  return (
    <ProtectedRoute condition={isOnline} alternativeRoute={'/login'}>
      <UserLists />
    </ProtectedRoute>
  );
}

export default OnlineUserProtectedRoute;

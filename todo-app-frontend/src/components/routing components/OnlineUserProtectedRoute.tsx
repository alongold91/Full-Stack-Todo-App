import { useEffect, useState } from 'react';
import TodosTable from '../../screens/todos-table/TodosTable';
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
      <TodosTable />
    </ProtectedRoute>
  );
}

export default OnlineUserProtectedRoute;

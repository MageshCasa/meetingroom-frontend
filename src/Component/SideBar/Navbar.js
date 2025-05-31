import React, { useEffect, useState } from 'react';
import { Badge, Button, Layout, message, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../asset/Casagrand-Logo1.jpg';
import './navbar.css';
import { BellOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_BASE_URL } from '../../Custom/config';

const { Header } = Layout;

const Navbar = () => {
    const [state, setState] = useState([]);
    const role = sessionStorage.getItem("role");  
    const empname = sessionStorage.getItem("empname");  
    const name = empname[0];

    const navigate = useNavigate(); 
    const [isBlue, setIsBlue] = useState(false);  

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBlue(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);  
    }, []);

    // Function to handle user logout
    const handleLogout = () => {
        sessionStorage.clear();  
        navigate('/');  
    };

    // Fetching user data with axios for requests list and filtering based on a condition
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getuserslist`);  // Make API request
                const filteredRequests = response.data.filter(item => item.Status === "2");  // Filter by status
                setState(filteredRequests.length);  // Set the number of filtered requests
            } catch (error) {
                console.error("Error fetching users data:", error);
                message.error("Error fetching data.");  // Display error message if API fails
            }
        };
        fetchAllData();  // Call the fetch function
    }, []);  // Empty dependency array ensures this runs only once on mount

    // Popover content based on user role
    const popoverContent = (
        <div>
            {role === '1' ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <a href="/request-list" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Request List</a>
                        <a href="/master" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Add Master</a>
                        <a href="/dashboard" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Dashboard</a>
                        <a href="/user-profile-update" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>User List</a>
                        <a href="/available-count" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Available Count</a>
                    </div>
                </>
            ) : role === '2' ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <a href="/roombook" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Request Room</a>
                        <a href="/current-request" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Pending Request</a>
                        <a href="/booked-request" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Request History</a>
                        <a href="/update_profile" style={{ marginBottom: '16px', color: 'orange' }} className='nav-link'>Update Profile</a>
                    </div>
                </>
            ) : null}
        </div>
    );

    // Handle the logo click to navigate based on the role
    const handleLogoClick = () => {
        if (role === '1') {
            navigate('/dashboard');  // Navigate to dashboard for admin
        } else if (role === '2') {
            navigate('/roombook');  // Navigate to room booking page for user
        }
    };

    return (
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#fdb23a" }}>
            {/* Logo section */}
            {role === '1' || role === '2' ? (
                <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: '40px', marginRight: '16px', marginTop: '20px' }}
                    />
                </div>
            ) : null}

            {/* Title */}
            <div>
                <h1 style={{
                    margin: 0,
                    color: isBlue ? 'white' : 'grey',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    transform: 'scale(1.2)',
                    letterSpacing: '1px',
                    transition: 'color 0.3s',
                    textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
                    fontFamily: '"Roboto", sans-serif'
                }}>
                    Conference Room Booking Application
                </h1>
            </div>

            {/* Notifications section for role '1' (admin) */}
            <div style={{ marginRight: "-110px" }}>
                {role === '1' && (
                    <Badge count={state} style={{ backgroundColor: '#52c41a', marginRight: '16px' }}>
                        <BellOutlined style={{ fontSize: '24px', color: 'white' }} />
                    </Badge>
                )}
            </div>

            {/* User Profile and Logout Button */}
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                <Popover
                    content={popoverContent}
                    title="Menu"
                    trigger="click"
                    placement="bottomRight"
                    style={{ backgroundColor: "orange" }}
                >
                    <div className="circle" style={{ backgroundColor: "white", color: "black", cursor: 'pointer' }}>
                        {name}  {/* Display first character of employee name */}
                    </div>
                </Popover>

                <Button type="primary" className="nav-link" onClick={handleLogout} style={{ marginLeft: '8px' }}>
                    Logout
                </Button>
            </div>
        </Header>
    );
};

export default Navbar;

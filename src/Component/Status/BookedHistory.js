import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Custom/config';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import Navbar from '../SideBar/Navbar';
import moment from 'moment';

const { Search } = Input;

const BookedHistory = () => {
    const navigate = useNavigate();
    const [request, setRequest] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchCurrentRequest = async () => {
            try {
                const empId = sessionStorage.getItem("empid"); 
                const response = await axios.post(`${API_BASE_URL}/getroomlist`, { empId });
                
                const filteredRequests = response.data.filter(item => item.EmpID === empId && item.Status === "1");
                setRequest(filteredRequests);
                setFilteredData(filteredRequests); 
            } catch (error) {
                console.error("Error fetching zone details:", error);
            }
        };

        fetchCurrentRequest();
    }, []);

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();
        const filtered = request.filter(item =>
            item.RoomName.toLowerCase().includes(searchValue) ||
            item.ZoneName.toLowerCase().includes(searchValue) ||
            item.OfficeName.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
    };

    const columns = [
        {
            title: 'Room Name',
            dataIndex: 'RoomName',
            key: 'RoomName',
            sorter: (a, b) => a.RoomName.localeCompare(b.RoomName),
        },
        {
            title: 'Zone Name',
            dataIndex: 'ZoneName',
            key: 'ZoneName',
            sorter: (a, b) => a.ZoneName.localeCompare(b.ZoneName),
        },
        {
            title: 'Office Name',
            dataIndex: 'OfficeName',
            key: 'OfficeName',
            sorter: (a, b) => a.OfficeName.localeCompare(b.OfficeName),
        },
        {
            title: 'From Date',
            dataIndex: 'FromDate',
            key: 'FromDate',
            // render: date => new Date(date).toLocaleString(),
            render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),

            sorter: (a, b) => new Date(a.FromDate) - new Date(b.FromDate),
        },
        {
            title: 'To Date',
            dataIndex: 'ToDate',
            key: 'ToDate',
            // render: date => new Date(date).toLocaleString(),
            render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),

            sorter: (a, b) => new Date(a.ToDate) - new Date(b.ToDate),
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: () => <Button style={{backgroundColor: 'green', color:'white'}}>Booked</Button>,
        },
    ];

    return (
        <div>
            <Navbar/>
            <Search 
                placeholder="Search by Room, Zone or Office Name"
                onSearch={onSearch}
                style={{ margin: '20px 0', width: '200px' }}
            />
            <Table 
                dataSource={filteredData} 
                columns={columns} 
                rowKey={(record) => record.RoomName} 
                pagination={{ pageSize: 100 }}
            />
        </div>
    );
}

export default BookedHistory;

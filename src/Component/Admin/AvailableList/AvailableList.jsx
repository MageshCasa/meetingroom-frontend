import React, { useState } from 'react';
import Navbar from '../../SideBar/Navbar';
import { Button, DatePicker, message, Table } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../../Custom/config';
import moment from 'moment';
import * as XLSX from 'xlsx'; // Import the XLSX library

const AvailableList = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [availableRooms, setAvailableRooms] = useState([]);

    const handleFromDateChange = (date) => setFromDate(date);
    const handleToDateChange = (date) => setToDate(date);

    const fetchAvailableRooms = async () => {
        if (!fromDate || !toDate) {
            message.error('Please select both From and To dates');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/availablecheck`, {
                FromDate: fromDate.format('YYYY-MM-DD'),
                ToDate: toDate.format('YYYY-MM-DD'),
            });

            setAvailableRooms(response.data);
            message.success('Rooms fetched successfully');
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            message.error('Failed to fetch available rooms');
        }
    };

    const columns = [
        {
            title: 'SerialNumber',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Zone Name',
            dataIndex: 'ZoneName',
            key: 'ZoneName',
        },
        {
            title: 'Office Name',
            dataIndex: 'OfficeName',
            key: 'OfficeName',
        },
        {
            title: 'Room Name',
            dataIndex: 'RoomName',
            key: 'RoomName',
        },
        {
            title: 'From Date',
            dataIndex: 'FromDate',
            key: 'FromDate',
            render: date => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'From Time',
            dataIndex: 'FromDate',
            key: 'FromTime',
            render: date => moment(date).subtract(11, 'hours').format('HH:mm:ss')
        },
        {
            title: 'To Date',
            dataIndex: 'ToDate',
            key: 'ToDate',
            render: date => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'To Time',
            dataIndex: 'ToDate',
            key: 'ToTime',
            render: date => moment(date).subtract(11, 'hours').format('HH:mm:ss')
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (_, record) => {
                let buttonText;
                let buttonColor;

                switch (record.Status) {
                    case 'Booked':
                        buttonText = 'Booked';
                        buttonColor = 'green';
                        break;
                    case 'Pending':
                        buttonText = 'Pending';
                        buttonColor = 'primary';
                        break;
                    case 'Cancelled':
                        buttonText = 'Cancelled';
                        buttonColor = 'red';
                        break;
                    default:
                        buttonText = 'Unknown';
                        buttonColor = 'gray';
                }

                return (
                    <Button type="primary" style={{ backgroundColor: buttonColor, borderColor: buttonColor }}>
                        {buttonText}
                    </Button>
                );
            }
        }
    ];



    const exportToExcel = () => {
        if (!availableRooms || availableRooms.length === 0) {
            message.error('No data available to export');
            return;
        }

        // Prepare the data for export
        const formattedData = availableRooms.map((room, index) => ({
            SerialNumber: index + 1,
            ZoneName: room.ZoneName,
            OfficeName: room.OfficeName,
            RoomName: room.RoomName,
            FromDate: moment(room.FromDate).format('DD-MM-YYYY HH:mm:ss'),
            ToDate: moment(room.ToDate).format('DD-MM-YYYY HH:mm:ss'),
            Status: room.Status,
        }));

        // Create a worksheet from the data
        const ws = XLSX.utils.json_to_sheet(formattedData);

        // Create a new workbook and append the worksheet to it
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Available Rooms');

        // Export the file
        XLSX.writeFile(wb, 'Available_Rooms.xlsx');
    };

    return (
        <div>
            <Navbar />
            <div style={{ marginBottom: 16, marginTop: '20px' }}>
                <DatePicker
                    onChange={handleFromDateChange}
                    placeholder="Select From Date"
                />
                <DatePicker
                    onChange={handleToDateChange}
                    placeholder="Select To Date"
                    style={{ marginLeft: 8 }}
                />

                <Button
                    type="primary"
                    onClick={fetchAvailableRooms}
                    style={{ marginLeft: 8 }}
                >
                    Search
                </Button>

                <Button
                    type="primary"
                    onClick={exportToExcel}
                    style={{ marginLeft: 8 }}
                >
                    Export to Excel
                </Button>
            </div>

            <div>
                {availableRooms.length > 0 && (
                    <div>
                        <h3>Available Rooms:</h3>
                        <Table
                            columns={columns}
                            dataSource={availableRooms}
                            rowKey="RoomName"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableList;

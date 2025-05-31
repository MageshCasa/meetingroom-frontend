import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../Custom/config';
import axios from 'axios';
import { Table, Input, Button, DatePicker, Select } from 'antd'; // Import Select
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Navbar from '../../SideBar/Navbar';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { Spin, message } from 'antd';

const { Option } = Select;

const UsersList = () => {

    const navigate = useNavigate();
    const [request, setRequest] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [departmentName, setDepartmentName] = useState('');
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [zoneName, setZoneName] = useState('')
    const [zoneNameoption, setZoneNameoption] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchDepartmentNames = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getdepartmentname`);
                const departments = response.data.map(dept => ({
                    value: dept.DepartmentID,
                    label: dept.DepartmentName
                }));
                setDepartmentOptions(departments);
            } catch (error) {
                console.error("Error fetching department details:", error);
                setDepartmentOptions([]);
            }
        };
        fetchDepartmentNames();
    }, []);

    useEffect(() => {
        const fetchZoneName = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getBookZone`);
                const zones = response.data.map(dept => ({
                    value: dept.ZoneId,
                    label: dept.ZoneName
                }));
                setZoneNameoption(zones);
                console.log(zones);
            } catch (error) {
                console.error("Error fetching department details:", error);
                setZoneNameoption([]);
            }
        };
        fetchZoneName();
    }, []);  // Add zoneNameoption to dependencies 

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getuserslist`);
                const filteredRequests = response.data.filter(item => item.Status === "2");
                setRequest(filteredRequests);
                setFilteredData(filteredRequests);
            } catch (error) {
                console.error("Error fetching users data:", error);
                message.error("Error fetching data.");
            }
        };
        fetchAllData();
    }, []);


    const updateRoomStatus = async (id, status, email, empName, zoneName, officeName, roomName, fromDate, mobileNumber, todate) => {
        try {
            // Update room status
            const response = await axios.post(`${API_BASE_URL}/UpdateRoomStatus`, { id, status });

            if (response.status === 200) {
                message.success(response.data.message);
                setLoading(true);

                let subject = '';
                let text = '';

                if (status === '1') {
                    subject = 'Your request has been approved';
                    text = `
                        <p>Hi ${empName},</p>
                        <p>Your request for the room has been <strong> approved </strong>. Below are the details of the blocked room:</p>
                        <p><strong>Zone Name:</strong> ${zoneName}</p>
                        <p><strong>Office Name:</strong> ${officeName}</p>
                        <p><strong>Room Name:</strong> ${roomName}</p>
                        <p><strong>Date:</strong> ${moment(fromDate).format('DD-MM-YYYY') + " to " + moment(todate).format('DD-MM-YYYY')}</p>
                        <p><strong>Time:</strong> ${moment(fromDate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss') + " to " + moment(todate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss')}</p>
                        <p>Best regards,<br>Admin Team</p>
                        <strong>Technical Support Contact,<br>IT Application Team</strong>
                    `;

                    // Send WhatsApp message only if status is approved (1)
                    const messageData = {
                        "messaging_product": "whatsapp",
                        "to": mobileNumber, // Dynamically use mobile number
                        "type": "template",
                        "template": {
                            "name": "room_request_confirmation",
                            "language": {
                                "code": "en"
                            },
                            "components": [
                                {
                                    "type": "body",
                                    "parameters": [
                                        { "type": "text", "text": empName },
                                        { "type": "text", "text": roomName },
                                        { "type": "text", "text": moment(fromDate).format('DD-MM-YYYY') + " to " + moment(todate).format('DD-MM-YYYY') },
                                        { "type": "text", "text": moment(fromDate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss') + " to " + moment(todate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss') }
                                    ]
                                }
                            ]
                        }
                    };

                    // Send message via WhatsApp API
                    const whatsappResponse = await axios.post('https://graph.facebook.com/v20.0/413229125210758/messages', messageData, {
                        headers: {
                            'Authorization': `Bearer EAARFFVvVhnsBOZBX9AZB9xiP9NEaiaoxRLN2AmfBiEoEbZA5u01SfdD8JSoLvwZCtqZBxeUhCfqkqjuulsjJo7qoye3RZBpDbMgJibSZAuabwALeZBW7eNQarMBfvZAWq42vt76YEQqSDZBYN6mE1pTR0CJhaccbxJWo8buAgf9ZCTtlI4i3cV6kP5Un6GlnmsWOZCY4cQZDZD`
                        }
                    });

                    if (whatsappResponse.status === 200) {
                        message.success('WhatsApp message sent successfully!');
                    } else {
                        message.error('Failed to send WhatsApp message.');
                    }
                } else if (status === '3') {
                    subject = 'Your request has been rejected';
                    text = `
                        <p>Hi ${empName},</p>
                        <p>Your request for the room has been <strong> rejected </strong>. Below are the details of the blocked room:</p>
                         <p><strong>Zone Name:</strong> ${zoneName}</p>
                        <p><strong>Office Name:</strong> ${officeName}</p>
                        <p><strong>Room Name:</strong> ${roomName}</p>
                        <p><strong>Date:</strong> ${moment(fromDate).format('DD-MM-YYYY') + " to " + moment(todate).format('DD-MM-YYYY')}</p>
                        <p><strong>Time:</strong> ${moment(fromDate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss') + " to " + moment(todate).subtract(5, 'hours').subtract(30, 'minutes').format('HH:mm:ss')}</p>
                        <p>Best regards,<br>Admin Team</p>
                        <strong>Technical Support Contact,<br>IT Application Team</strong>
                    `;
                }

                // Send Email
                const emailResponse = await axios.post(`${API_BASE_URL}/send-mail`, {
                    to: email,
                    subject: subject,
                    text: text
                });

                if (emailResponse.status === 200) {
                    message.success('Email sent successfully!');
                } else {
                    message.error('Failed to send email.');
                }

                setLoading(false);
            }

            // Reload the page or update the state as needed
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            setLoading(false); // Stop loading if there's an error
            console.error('Error updating room status:', error);
            message.error('Failed to update room status.');
        }
    };


    const fetchFilteredData = async () => {

        if (!fromDate || !toDate || !departmentName || !zoneName) {
            message.error('Please fill all filter fields.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/getfiltereduserslist`, {
                FromDate: fromDate.format('YYYY-MM-DD'),
                ToDate: toDate.format('YYYY-MM-DD'),
                DepartmentName: departmentName,
                ZoneName: zoneName
            });
            console.log(response.data);

            setRequest(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
            message.error("Failed to fetch filtered data.");
        }
    };

    const exportToExcel = () => {
        const filteredStatusData = filteredData.filter(item => item.Status === "2");

        if (filteredStatusData.length === 0) {
            message.warning("No data available to export with Status '2'.");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(filteredStatusData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users List");

        const fileName = `Users_List_${moment().format('YYYY-MM-DD')}.xlsx`;

        XLSX.writeFile(workbook, fileName);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {

        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

        const filtered = request.filter(item =>
            item[dataIndex]
                .toString()
                .toLowerCase()
                .includes(selectedKeys[0].toLowerCase())
        );

        setFilteredData(filtered);
    };

    const handleReset = (clearFilters) => {

        clearFilters();
        setSearchText('');
        setFilteredData(request);

    };

    const columns = [
        {
            title: 'EmpID',
            dataIndex: 'EmpID',
            key: 'EmpID',
            ...getColumnSearchProps('EmpID'),
        },
        {
            title: 'EmpName',
            dataIndex: 'EmpName',
            key: 'EmpName',
            ...getColumnSearchProps('EmpName'),
        },
        {
            title: 'MailID',
            dataIndex: 'MailID',
            key: 'MailID',
            ...getColumnSearchProps('MailID'),
        },
        {
            title: 'Department Name',
            dataIndex: 'DepartmentName',
            key: 'DepartmentName',
            ...getColumnSearchProps('DepartmentName'),
        },
        {
            title: 'Zone Name',
            dataIndex: 'ZoneName',
            key: 'ZoneName',
            ...getColumnSearchProps('ZoneName'),
        },
        {
            title: 'Office Name',
            dataIndex: 'OfficeName',
            key: 'OfficeName',
            ...getColumnSearchProps('OfficeName'),
        },
        {
            title: 'MobileNumber',
            dataIndex: 'MobileNumber',
            key: 'MobileNumber',
            ...getColumnSearchProps('MobileNumber'),
        },
        {
            title: 'Room Name',
            dataIndex: 'RoomName',
            key: 'RoomName',
            ...getColumnSearchProps('RoomName'),
        },
        {
            title: 'From Date',
            dataIndex: 'FromDate',
            key: 'FromDate',
            render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'To Date',
            dataIndex: 'ToDate',
            key: 'ToDate',
            render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'Status',
        //     key: 'Status',
        //     render: (_, record) => (
        //         <>
        //             <Button
        //                 onClick={() => updateRoomStatus(
        //                     record.ID,
        //                     '1',
        //                     record.MailID,
        //                     record.EmpName,
        //                     record.RoomName,
        //                     record.FromDate
        //                 )}
        //                 style={{ backgroundColor: "green", color: "white", width: '70%' }}
        //             >
        //                 Approved
        //             </Button>
        //             <Button
        //                 onClick={() => updateRoomStatus(
        //                     record.ID,
        //                     '3',
        //                     record.MailID,
        //                     record.EmpName,
        //                     record.RoomName,
        //                     record.FromDate
        //                 )}
        //                 style={{ backgroundColor: "red", color: "white", width: '70%' }}
        //             >
        //                 Rejected
        //             </Button>
        //         </>
        //     ),
        // }
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (_, record) => (  // record is passed here as the row data
                <>
                    <Button
                        onClick={() => updateRoomStatus(
                            record.ID,          // Pass the ID from the record
                            '1',                // '1' for Approved
                            record.MailID,      // Pass MailID from the record
                            record.EmpName,
                            record.ZoneName,
                            record.OfficeName,    // Pass EmpName from the record
                            record.RoomName,    // Pass RoomName from the record
                            record.FromDate,    // Pass FromDate from the record
                            record.MobileNumber,
                            record.ToDate
                        )}
                        style={{ backgroundColor: "green", color: "white", width: '70%' }}
                    >
                        Approved
                    </Button>
                    <Button
                        onClick={() => updateRoomStatus(
                            record.ID,          // Pass the ID from the record
                            '3',                // '3' for Rejected
                            record.MailID,      // Pass MailID from the record
                            record.EmpName,
                            record.ZoneName,
                            record.OfficeName,     // Pass EmpName from the record
                            record.RoomName,    // Pass RoomName from the record
                            record.FromDate,    // Pass FromDate from the record
                            record.MobileNumber, // Pass MobileNumber from the record
                            record.ToDate // Pass MobileNumber from the record
                        )}
                        style={{ backgroundColor: "red", color: "white", width: '70%' }}
                    >
                        Rejected
                    </Button>
                </>
            ),
        }
    ];

    return (
        <div>
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Spin size="large" />
                    <p>Sending Email...</p>
                </div>
            ) : null}
            <Navbar />
            <div style={{ marginBottom: 16, marginTop: '20px' }}>
                <DatePicker
                    onChange={(date) => setFromDate(date)}
                    placeholder="Select From Date"
                />
                <DatePicker
                    onChange={(date) => setToDate(date)}
                    placeholder="Select To Date"
                    style={{ marginLeft: 8 }}
                />
                <Select
                    placeholder="Select Department"
                    onChange={(value) => setDepartmentName(value)}
                    style={{ width: 200, marginLeft: 8 }}
                >
                    {departmentOptions.map(department => (
                        <Option key={department.value} value={department.label}>
                            {department.label}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select Zonename"
                    onChange={(value) => setZoneName(value)}
                    style={{ width: 200, marginLeft: 8 }}
                >
                    {Array.isArray(zoneNameoption) && zoneNameoption.map(department => (
                        <Option key={department.value} value={department.label}>
                            {department.label}
                        </Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={fetchFilteredData}
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
            <Table columns={columns} dataSource={filteredData} rowKey="EmpID" />
        </div>
    );
};

export default UsersList;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { API_BASE_URL } from '../../Custom/config';
// import axios from 'axios';
// import { Table, Input, Button } from 'antd';
// import Navbar from '../SideBar/Navbar';
// import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
// import moment from 'moment';

// const CurrentHistory = () => {
//     const navigate = useNavigate();
//     const [request, setRequest] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [data, setData] = useState([]);
//     const [searchText, setSearchText] = useState('');
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const [dots, setDots] = useState('');

//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//             navigate("/");
//         }
//     }, [navigate]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
//         }, 500);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const fetchCurrentRequest = async () => {
//             try {
//                 const empId = sessionStorage.getItem("empid");
//                 const response = await axios.post(`${API_BASE_URL}/getroomlist`, { empId });
//                 setData(response.data);

//                 const filteredRequests = response.data.filter(item => item.EmpID === empId);
//                 setRequest(filteredRequests);

//                 const relevantRequests = filteredRequests.filter(item => item.Status === "2" || item.Status === "3");
//                 setFilteredData(relevantRequests);


//             } catch (error) {
//                 console.error("Error fetching zone details:", error);
//             }
//         };

//         fetchCurrentRequest();
//     }, []);

//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{ width: 188, marginBottom: 8, display: 'block' }}
//                 />
//                 <Button
//                     type="primary"
//                     onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     icon={<SearchOutlined />}
//                     size="small"
//                     style={{ width: 90, marginRight: 8 }}
//                 >
//                     Search
//                 </Button>
//                 <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//                     Reset
//                 </Button>
//             </div>
//         ),
//         filterIcon: filtered => (
//             <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex]
//                 .toString()
//                 .toLowerCase()
//                 .includes(value.toLowerCase()),
//         render: text =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ''}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);

//         const filtered = data.filter(item =>
//             item[dataIndex]
//                 .toString()
//                 .toLowerCase()
//                 .includes(selectedKeys[0].toLowerCase())
//         );
//         setFilteredData(filtered);
//     };

//     const handleReset = clearFilters => {
//         clearFilters();
//         setSearchText('');
//         setFilteredData(data);
//     };

//     const columns = [
//         {
//             title: 'DepartmentName',
//             dataIndex: 'DepartmentName',
//             key: 'DepartmentName',
//             ...getColumnSearchProps('DepartmentName'),
//         },
//         {
//             title: 'Zone Name',
//             dataIndex: 'ZoneName',
//             key: 'ZoneName',
//             ...getColumnSearchProps('ZoneName'),
//         },
//         {
//             title: 'Office Name',
//             dataIndex: 'OfficeName',
//             key: 'OfficeName',
//             ...getColumnSearchProps('OfficeName'),
//         },
//         {
//             title: 'Room Name',
//             dataIndex: 'RoomName',
//             key: 'RoomName',
//             ...getColumnSearchProps('RoomName'),
//         },
//         {
//             title: 'From Date',
//             dataIndex: 'FromDate',
//             key: 'FromDate',
//             // render: date => new Date(date).toLocaleString(),
//                         render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            
//         },
//         {
//             title: 'To Date',
//             dataIndex: 'ToDate',
//             key: 'ToDate',
//             // render: date => new Date(date).toLocaleString(),
//                         render: date => moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            
//         },
//         {
//             title: 'Status',
//             dataIndex: 'Status',
//             key: 'Status',
//             render: (status) => (
//                 <div>
//                     {status === "2" && (
//                         <Button style={{ backgroundColor: 'blue', color: 'white', marginRight: '5px' }}>
//                             Pending{dots}
//                         </Button>
//                     )}
//                     {status === "3" && (
//                         <Button style={{ backgroundColor: 'red', color: 'white' }}>
//                             Rejected
//                         </Button>
//                     )}
//                 </div>
//             ),
//         }
//     ];

//     return (
//         <>
//             <Navbar />
//             <div style={{ marginBottom: 16, marginTop: '20px' }}>

//                 <Table
//                     dataSource={filteredData}
//                     columns={columns}
//                     rowKey={(record) => record.RoomName}
//                     pagination={{ pageSize: 100 }}
//                 />
//             </div>
//         </>
//     );
// }

// export default CurrentHistory;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../Custom/config';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import Navbar from '../SideBar/Navbar';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const CurrentHistory = () => {
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]); // Remove 'request' state
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [dots, setDots] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login page if token is not present
        }
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchCurrentRequest = async () => {
            try {
                const empId = sessionStorage.getItem("empid");
                const response = await axios.post(`${API_BASE_URL}/getroomlist`, { empId });
                setData(response.data);

                // Filter requests based on empId and Status
                const relevantRequests = response.data.filter(item => item.EmpID === empId && (item.Status === "2" || item.Status === "3"));
                setFilteredData(relevantRequests);

            } catch (error) {
                console.error("Error fetching zone details:", error);
            }
        };

        fetchCurrentRequest();
    }, []);

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
        render: text =>
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

        const filtered = data.filter(item =>
            item[dataIndex]
                .toString()
                .toLowerCase()
                .includes(selectedKeys[0].toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
        setFilteredData(data);
    };

    const columns = [
        {
            title: 'DepartmentName',
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
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => (
                <div>
                    {status === "2" && (
                        <Button style={{ backgroundColor: 'blue', color: 'white', marginRight: '5px' }}>
                            Pending{dots}
                        </Button>
                    )}
                    {status === "3" && (
                        <Button style={{ backgroundColor: 'red', color: 'white' }}>
                            Rejected
                        </Button>
                    )}
                </div>
            ),
        }
    ];

    return (
        <>
            <Navbar />
            <div style={{ marginBottom: 16, marginTop: '20px' }}>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey={(record) => record.RoomName}
                    pagination={{ pageSize: 100 }}
                />
            </div>
        </>
    );
}

export default CurrentHistory;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../../SideBar/Navbar';
// import axios from 'axios';
// import { API_BASE_URL } from '../../../Custom/config';
// import { Table, Input, Button, Modal, Form, message, Row, Col } from 'antd';
// import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';

// const UserProfileUpdate = () => {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchedColumn, setSearchedColumn] = useState('');
//     const [searchText, setSearchText] = useState('');
//     const [editingUser, setEditingUser] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         const FetchProfile = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/userprofile`);
//                 setData(response.data);
//                 setFilteredData(response.data);
//             } catch (error) {
//                 console.error("Error fetching user profiles:", error);
//                 setData([]);
//             }
//         };
//         FetchProfile();
//     }, []);

//     const handleEdit = (record) => {
//         setEditingUser(record);
//         form.setFieldsValue({
//             mailid: record.MailID,
//             empid: record.EmpID,
//             empname: record.EmpName,
//             password: '',
//             mobileNumber: ''
//         });
//         setIsModalVisible(true);
//     };

//     const handleUpdate = async () => {
//         try {
//             const values = form.getFieldsValue();
//             await axios.post(`${API_BASE_URL}/updateuserAdmin`, {
//                 mailid: values.mailid,
//                 empid: values.empid,
//                 empname: values.empname,
//                 password: values.password,
//                 mobileNumber: values.mobileNumber
//             });
//             setIsModalVisible(false);

//             const response = await axios.post(`${API_BASE_URL}/userprofile`);
//             setData(response.data);
//             setFilteredData(response.data);
//         } catch (error) {
//             console.error("Error updating user:", error);
//         }
//     };

//     const handleDelete = async (empid) => {
//         try {
//             const response = await axios.post(`${API_BASE_URL}/deleteProfile`, { empid });

//             if (response.status === 200) {
//                 setData(prevData => prevData.filter(user => user.EmpID !== empid));
//                 setFilteredData(prevData => prevData.filter(user => user.EmpID !== empid));
//                 message.success("User deleted successfully.");
//             } else {
//                 message.error("Failed to delete user.");
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             message.error("Failed to delete user. Please try again.");
//         }
//     };

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
//             title: 'Employee ID',
//             dataIndex: 'EmpID',
//             key: 'EmpID',
//             ...getColumnSearchProps('EmpID'),
//         },
//         {
//             title: 'Employee Name',
//             dataIndex: 'EmpName',
//             key: 'EmpName',
//             ...getColumnSearchProps('EmpName'),
//         },
//         {
//             title: 'Mail ID',
//             dataIndex: 'MailID',
//             key: 'MailID',
//             ...getColumnSearchProps('MailID'),
//         },
//         {
//             title: 'Mobile Number',
//             dataIndex: 'MobileNumber',
//             key: 'MobileNumber',
//             ...getColumnSearchProps('MobileNumber'),
//         },
//         {
//             title: 'Department Name',
//             dataIndex: 'DepartmentName',
//             key: 'DepartmentName',
//             ...getColumnSearchProps('DepartmentName'),
//         },
//         {
//             title: 'Status',
//             render: (text, record) => (
//                 <>
//                     <Button
//                         icon={<EditOutlined />}
//                         size="small"
//                         onClick={() => handleEdit(record)}
//                         style={{ backgroundColor: 'blue' }}
//                     >
//                         Edit
//                     </Button>

//                     <Button
//                         icon={<DeleteOutlined />}
//                         size="small"
//                         onClick={() => handleDelete(record.EmpID)}
//                         style={{ marginLeft: "10px", backgroundColor: 'red' }}
//                     >
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },

//     ];

//     return (
//         <div>
//             <Navbar />
//             <Row justify="end" style={{ marginBottom: '16px', padding: '0 16px' }}>
//                 <Col>
//                     <Button
//                         type="primary"
//                         style={{ marginBottom: '10px',marginTop: "25px"  }}
//                     >
//                         Add User
//                     </Button>
//                 </Col>
//             </Row>
//             <Table
//                 dataSource={filteredData}
//                 columns={columns}
//                 rowKey={(record) => record.EmpID}
//                 pagination={{ pageSize: 100 }}
//             />
// <Modal
//     title="Edit User"
//     visible={isModalVisible}
//     onOk={handleUpdate}
//     onCancel={() => setIsModalVisible(false)}
// >
//     <Form form={form}>
//         <Form.Item label="Mail ID" name="mailid">
//             <Input disabled />
//         </Form.Item>
//         <Form.Item label="Employee ID" name="empid">
//             <Input />
//         </Form.Item>
//         <Form.Item label="Employee Name" name="empname">
//             <Input />
//         </Form.Item>
//         <Form.Item label="Password" name="password">
//             <Input.Password />
//         </Form.Item>
//         <Form.Item label="Mobile Number" name="mobileNumber">
//             <Input />
//         </Form.Item>

//     </Form>
// </Modal>
//         </div>
//     );
// };

// export default UserProfileUpdate;
import React, { useEffect, useState } from 'react';
import Navbar from '../../SideBar/Navbar';
import axios from 'axios';
import { API_BASE_URL } from '../../../Custom/config';
import { Table, Input, Button, Modal, Form, message, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import CreateUsers from '../../Admin/Registration/CreateUsers.js'; // Import CreateUsers component

const UserProfileUpdate = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [modalType, setModalType] = useState(''); // To track whether it's 'add' or 'edit'

    useEffect(() => {
        const FetchProfile = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/userprofile`);
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error("Error fetching user profiles:", error);
                setData([]);
            }
        };
        FetchProfile();
    }, []);

    const handleEdit = (record) => {
        setModalType('edit'); // Set modal type to 'edit'
        form.setFieldsValue({
            mailid: record.MailID,
            empid: record.EmpID,
            empname: record.EmpName,
            password: '',
            mobileNumber: record.MobileNumber
        });
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const values = form.getFieldsValue();
            await axios.post(`${API_BASE_URL}/updateuserAdmin`, {
                mailid: values.mailid,
                empid: values.empid,
                empname: values.empname,
                password: values.password,
                mobileNumber: values.mobileNumber
            });
            setIsModalVisible(false);

            const response = await axios.post(`${API_BASE_URL}/userprofile`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async (empid) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/deleteProfile`, { empid });

            if (response.status === 200) {
                setData(prevData => prevData.filter(user => user.EmpID !== empid));
                setFilteredData(prevData => prevData.filter(user => user.EmpID !== empid));
                message.success("User deleted successfully.");
            } else {
                message.error("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user. Please try again.");
        }
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
            title: 'Employee ID',
            dataIndex: 'EmpID',
            key: 'EmpID',
            ...getColumnSearchProps('EmpID'),
        },
        {
            title: 'Employee Name',
            dataIndex: 'EmpName',
            key: 'EmpName',
            ...getColumnSearchProps('EmpName'),
        },
        {
            title: 'Mail ID',
            dataIndex: 'MailID',
            key: 'MailID',
            ...getColumnSearchProps('MailID'),
        },
        {
            title: 'Mobile Number',
            dataIndex: 'MobileNumber',
            key: 'MobileNumber',
            ...getColumnSearchProps('MobileNumber'),
        },
        {
            title: 'Department Name',
            dataIndex: 'DepartmentName',
            key: 'DepartmentName',
            ...getColumnSearchProps('DepartmentName'),
        },
        {
            title: 'Status',
            render: (text, record) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                        style={{ backgroundColor: 'blue' }}
                    >
                        Edit
                    </Button>

                    <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDelete(record.EmpID)}
                        style={{ marginLeft: "10px", backgroundColor: 'red' }}
                    >
                        Delete
                    </Button>
                </>
            ),
        },

    ];

    // Handle the modal opening for adding a new user
    const openAddUserModal = () => {
        setModalType('add'); // Set modal type to 'add'
        setIsModalVisible(true);
    };

    return (
        <div>
            <Navbar />
            <Row justify="end" style={{ marginBottom: '16px', padding: '0 16px' }}>
                <Col>
                    <Button
                        type="primary"
                        style={{ marginBottom: '10px', marginTop: "25px" }}
                        onClick={openAddUserModal} 
                    >
                        Add User
                    </Button>
                </Col>
            </Row>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey={(record) => record.EmpID}
                pagination={{ pageSize: 100 }}
            />

            {/* Modal for adding or editing user */}
            <Modal
                title={modalType === 'add' ? "Add New User" : "Edit User"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null} 
                width={800} 
            >
                {modalType === 'add' ? (
                    <CreateUsers /> // Use CreateUsers component for adding a new user
                ) : (
                    <Form form={form}>
                        <Form.Item label="Mail ID" name="mailid">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Employee ID" name="empid">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Employee Name" name="empname">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Mobile Number" name="mobileNumber">
                            <Input />
                        </Form.Item>
                        <Button type="primary" onClick={handleUpdate}>Update</Button>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default UserProfileUpdate;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './CreateUsers.css'; // Import the CSS file for custom styles
import { API_BASE_URL } from '../../../Custom/config';

const { Option } = Select;

const CreateUsers = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const [loading, setLoading] = useState(false);
    const [departments, setDepartment] = useState([]);


    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/userRegister`, values);
            message.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message);
            } else {
                console.error("Error creating user:", error);
                message.error("Server error");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDepartmentNames = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getdepartmentname`);
                setDepartment(response.data);
            } catch (error) {
                console.error("Error fetching department details:", error);
                setDepartment([]); // Reset to empty array on error
            }
        };
        fetchDepartmentNames();
    }, []);

    return (
        <div >
           
            <Card title="Create User" style={{ maxWidth: 800, width: '100%', marginTop: '20px' }}  className="form-card responsive-container create-users-container">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: '100%', margin: 'auto' }}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Employee ID"
                                name="empid"
                                rules={[{ required: true, message: 'Please input the Employee ID!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Employee Name"
                                name="empname"
                                rules={[{ required: true, message: 'Please input the Employee Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Email ID"
                                name="mailid"
                                rules={[
                                    { required: true, message: 'Please input the Email ID!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Role"
                                name="role"
                                rules={[{ required: true, message: 'Please select a role!' }]}
                            >
                                <Select placeholder="Select a role">
                                    <Option value="Admin">Admin</Option>
                                    <Option value="Users">Users</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Mobile Number"
                                name="mobilenumber"
                                rules={[
                                    { required: true, message: 'Please input the Mobile Number!' },
                                    { pattern: /^\d{10}$/, message: 'Mobile number must be exactly 10 digits.' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input the Password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="DepartmentName"
                                name="departmentname"
                                rules={[{ required: true, message: 'Please input the Department Name!' }]}
                            >

                                <Select wrapperCol={{ offset: 1 }} onChange={value => {
                                    const selectedDepartment = departments.find(department => department.DepartmentName === value);
                                    setDepartment(selectedDepartment.DepartmentName);
                                }}>
                                    {Array.isArray(departments) && departments.map(department => (
                                        <Select.Option key={department.DepartmentID} value={department.DepartmentName}>
                                            {department.DepartmentName}
                                        </Select.Option>
                                    ))}
                                </Select>

                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '30%' }}>
                                    Create User
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default CreateUsers;

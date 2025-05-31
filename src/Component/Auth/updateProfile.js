import React, { useEffect, useState } from 'react';
import Navbar from '../SideBar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Input, Row, message } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../Custom/config';

const UpdateProfile = () => {
    const [EmpID, setEmpID] = useState('');
    const [password, setPassword] = useState('');
    const [mailID, setMailID] = useState('');
    const [empName, setEmpName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

        setEmpID(sessionStorage.getItem('empid') || '');
        setMailID(sessionStorage.getItem('mailid') || '');
        setEmpName(sessionStorage.getItem('empname') || '');
        setPassword(sessionStorage.getItem('password') || '');
    }, [navigate]);

    const handleUpdate = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/updateuser`, {
                mailid: mailID,
                empid: EmpID,
                empname: empName,
                password: password
            });

            message.success(response.data.message);

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to update user.");
        }
    };


    return (
        <div>
            <Navbar />
            <Card title="UserProfile" style={{ maxWidth: 1200, width: '1100px', margin: 'auto', marginTop: "100px", backgroundColor: "#f0f2f5" }}>
                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal">
                    <Row gutter={16}>
                        <Col span={7}>
                            <Form.Item label="EmpID">
                                <Input value={EmpID} onChange={(e) => setEmpID(e.target.value)} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item label="UserName">
                                <Input value={empName} onChange={(e) => setEmpName(e.target.value)} />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="EmailID" >
                                <Input value={mailID} onChange={(e) => setMailID(e.target.value)} disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={7}>
                            <Form.Item label="Password">
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 1 }}>
                        <Button type="primary" onClick={handleUpdate}>Update Profile</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default UpdateProfile;

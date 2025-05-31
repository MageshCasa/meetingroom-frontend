import React from 'react';
import { Button, Checkbox, Form, Input, Card, message } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../Custom/config';
import { useNavigate } from 'react-router-dom';
import logo from '../../asset/CG_-New-web-banner-sizes_-Aug-24_5-scaled.jpg';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                mailid: values.username,
                password: values.password,
            });

            const { token, empid, mailid, role, empname, password } = response.data;
            const roleValue = Number(role);

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('empid', empid);
            sessionStorage.setItem('empname', empname);
            sessionStorage.setItem('mailid', mailid);
            sessionStorage.setItem('role', roleValue);
            sessionStorage.setItem('password', password);


            message.success('Login successful!');

            if (roleValue === 2) {
                navigate("/roombook");
            } else if (roleValue === 1) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Login failed. Please check your credentials.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please complete the form!');
    };

    return (
        <>
            <div style={styles.containerLogin}>
                <Card title="Login" style={styles.loginCard}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="EmailID"
                            name="username"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!'
                                },
                                {
                                    pattern: /^[a-zA-Z0-9._%+-]+@casagrand\.co\.in$/,
                                    message: 'Only @casagrand.co.in emails are allowed!'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 8, span: 10 }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                            <div style={styles.buttonContainer}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

const styles = {
    containerLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${logo})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    loginCard: {
        width: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 10,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
};

export default Login;

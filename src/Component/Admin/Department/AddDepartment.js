import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../../../Custom/config';
import { Button, Input, notification, Card, Form as AntForm, Form, Col,Row } from 'antd';

const AddDepartment = () => {
    const [department, setDepartment] = useState('');

    const AddDepartmentDetail = async (values) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/bookdepartment`, { DepartmentName: department });
            notification.success({
                message: 'Success',
                description: response.data.message,
            });
            setDepartment('');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response ? error.response.data.error : 'An unexpected error occurred.',
            });
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 16, marginTop: '20px' }}>
                <Card title="Add Department" style={{ maxWidth: 1000, margin: 'auto', backgroundColor: "#f0f2f5" }}>
                <Row gutter={24}>
                <Col span={7}>
                    <AntForm
                        layout="vertical"
                        onFinish={AddDepartmentDetail}
                    >
                        <AntForm.Item
                            label="Department Name"
                            name="department"
                            style={{ width: "300px" }}
                            rules={[{ required: true, message: 'Please input the department name!' }]}
                        >
                            <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
                        </AntForm.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                Book Department
                            </Button>
                        </Form.Item>
                    </AntForm>
                    </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default AddDepartment;

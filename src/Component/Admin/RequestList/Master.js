import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Card, notification, Row, Col } from 'antd';
import { API_BASE_URL } from '../../../Custom/config';
import Navbar from '../../SideBar/Navbar';
import AddDepartment from '../Department/AddDepartment';

const { Option } = Select;

const BookOffice = () => {
    const [zones, setZones] = useState([]);
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [zoneForm] = Form.useForm();
    const [officeForm] = Form.useForm();
    const [roomForm] = Form.useForm();

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getZoneDropdown`);
                setZones(response.data);
            } catch (error) {
                console.error("Error fetching zones:", error);
                message.error("Failed to load zones.");
            }
        };
        fetchZones();
    }, []);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getBookoffice`);
                setOffices(response.data);
            } catch (error) {
                console.error("Error fetching offices:", error);
                message.error("Failed to load offices.");
            }
        };
        fetchOffices();
    }, []);

    const OnPostZone = async (values) => {
        setLoading(true); // set loading to true before sending request
        try {
            const response = await axios.post(`${API_BASE_URL}/bookzone`, { ZoneName: values.zoneName });
            notification.success({
                message: 'Success',
                description: response.data.message,
            });
            zoneForm.resetFields();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response ? error.response.data.error : 'An unexpected error occurred.',
            });
        } finally {
            setLoading(false); // set loading to false after the request completes
        }
    };

    const onFinishOffice = async (values) => {
        setLoading(true); // set loading to true before sending request
        try {
            const response = await axios.post(`${API_BASE_URL}/bookoffice`, values);
            message.success(response.data.message);
            officeForm.resetFields();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            message.error(error.response ? error.response.data.error : "Failed to book office.");
        } finally {
            setLoading(false); // set loading to false after the request completes
        }
    };

    const OnPostRoom = async (values) => {
        setLoading(true); // set loading to true before sending request
        try {
            const response = await axios.post(`${API_BASE_URL}/bookRoom`, values);
            message.success(response.data.message);
            roomForm.resetFields();
        } catch (error) {
            message.error(error.response ? error.response.data.error : "Failed to book room.");
        } finally {
            setLoading(false); // set loading to false after the request completes
        }
    };

    return (
        <>
            <Navbar />
            <div className="book-office-container" style={{ marginBottom: 16, marginTop: '20px' }}>
                <Card title="Book Conference Room" style={{ maxWidth: 1000, margin: 'auto', backgroundColor: "#f0f2f5" }}>
                    <Row gutter={24}>
                        <Col span={7}>
                            <Form
                                form={zoneForm}
                                layout="vertical"
                                onFinish={OnPostZone}
                            >
                                <Form.Item
                                    label="Zone Name"
                                    name="zoneName"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                        Book Zone
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={7}>
                            <Form
                                form={officeForm}
                                layout="vertical"
                                onFinish={onFinishOffice}
                            >
                                <Form.Item
                                    label="Zone Name"
                                    name="zoneName"
                                >
                                    <Select placeholder="Select a zone" loading={zones.length === 0}>
                                        {zones.map((zone) => (
                                            <Option key={zone.ZoneId} value={zone.ZoneName}>
                                                {zone.ZoneName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Office Name"
                                    name="officeName"
                                >
                                    <Input placeholder="Enter office name" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                        Book Office
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={7}>
                            <Form
                                form={roomForm}
                                layout="vertical"
                                onFinish={OnPostRoom}
                            >
                                <Form.Item
                                    label="Office Name"
                                    name="OfficeName"
                                >
                                    <Select placeholder="Select an office" loading={offices.length === 0}>
                                        {offices.map((office) => (
                                            <Option key={office.OfficeID} value={office.OfficeName}>
                                                {office.OfficeName}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Room Detail"
                                    name="RoomName"
                                >
                                    <Input placeholder="Enter room name" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block loading={loading}>
                                        Book Room
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
                <AddDepartment />
            </div>
        </>
    );
};

export default BookOffice;


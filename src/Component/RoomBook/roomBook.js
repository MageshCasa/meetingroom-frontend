// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, DatePicker, Form, Input, Select, Card, message, Row, Col, Tooltip } from 'antd';
// import { API_BASE_URL } from '../../Custom/config';
// import Navbar from '../SideBar/Navbar';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

// const RoomBook = () => {
//     const [zones, setZones] = useState([]);
//     const [departments, setDepartment] = useState([]);
//     const [office, setOffice] = useState([]);
//     const [room, setRoom] = useState([]);
//     const [empID, setEmpID] = useState('');
//     const [zoneID, setZoneID] = useState('');
//     const [zoneName, setZoneName] = useState('');
//     const [officeID, setOfficeID] = useState('');
//     const [officeName, setOfficeName] = useState('');
//     const [roomName, setRoomName] = useState('');
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//             navigate("/");
//         }

//         const storedEmpID = sessionStorage.getItem('empid');
//         if (storedEmpID) {
//             setEmpID(storedEmpID);
//         }
//     }, [navigate]);

//     useEffect(() => {
//         const fetchZones = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/getZoneDropdown`);
//                 setZones(response.data);
//             } catch (error) {
//                 console.error("Error fetching zone details:", error);
//             }
//         };
//         fetchZones();
//     }, []);

//     useEffect(() => {
//         const fetchDepartmentNames = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/getdepartmentname`);
//                 setDepartment(response.data);
//             } catch (error) {
//                 console.error("Error fetching department details:", error);
//                 setDepartment([]);
//             }
//         };
//         fetchDepartmentNames();
//     }, []);


//     useEffect(() => {
//         if (zoneID) {
//             const fetchOffice = async () => {
//                 try {
//                     const response = await axios.post(`${API_BASE_URL}/getZoneOffice`, { ZoneID: zoneID });
//                     setOffice(response.data);
//                 } catch (error) {
//                     console.error("Error fetching office details:", error);
//                 }
//             };
//             fetchOffice();
//         }
//     }, [zoneID]);

// useEffect(() => {
//     const fetchTiming = async () => {
//         try {
//             const response = await axios.post(`${API_BASE_URL}/GetBookedTimeSlots`);
//             const adjustedTimeSlots = response.data.map(slot => {
//                 const adjustedFromDate = moment(slot.FromDate).subtract(5, 'hours').subtract(30, 'minutes');
//                 const adjustedToDate = moment(slot.ToDate).subtract(5, 'hours').subtract(30, 'minutes');

//                 return {
//                     ...slot,
//                     FromDate: adjustedFromDate.format('YYYY-MM-DD HH:mm:ss'),
//                     ToDate: adjustedToDate.format('YYYY-MM-DD HH:mm:ss')
//                 };
//             });

//             setBookedTimeSlots(adjustedTimeSlots);

//         } catch (error) {
//             console.error("Error fetching booked time slots:", error);
//         }
//     };
//     fetchTiming();
// }, []);

//     useEffect(() => {
//         if (officeID) {
//             const fetchRoom = async () => {
//                 try {
//                     const response = await axios.post(`${API_BASE_URL}/getzoneroom`, { OfficeID: officeID });
//                     setRoom(response.data);
//                 } catch (error) {
//                     console.error("Error fetching room details:", error);
//                 }
//             };
//             fetchRoom();
//         }
//     }, [officeID]);

//     // const isTimeSlotDisabled = (date) => {
//     //     const momentDate = moment(date);
//     //     return bookedTimeSlots?.some(slot => {
//     //         const from = moment(slot.FromDate);
//     //         const to = moment(slot.ToDate);

//     //         const matchesCriteria = slot.ZoneName === zoneName &&
//     //             slot.OfficeName === officeName &&
//     //             slot.RoomName === roomName;

//     //         // Check if the date is within the booked time range
//     //         return matchesCriteria && momentDate.isBetween(from, to, null, '[]');
//     //     });
//     // };

//     // const getDisabledTime = (date) => {
//     //     const disabledHours = [];

//     //     bookedTimeSlots.forEach(slot => {
//     //         const from = moment(slot.FromDate);
//     //         const to = moment(slot.ToDate);

//     //         const matchesCriteria = slot.ZoneName === zoneName &&
//     //             slot.OfficeName === officeName &&
//     //             slot.RoomName === roomName;

//     //         // If the booking matches the selected room, check the date range
//     //         if (matchesCriteria) {
//     //             // Case 1: Disable hours for the start day
//     //             if (date.isSame(from, 'day')) {
//     //                 for (let hour = from.hour(); hour < 24; hour++) {
//     //                     disabledHours.push(hour);
//     //                 }
//     //             }

//     //             // Case 2: Disable all hours for full days in between
//     //             if (date.isAfter(from, 'day') && date.isBefore(to, 'day')) {
//     //                 for (let hour = 0; hour < 24; hour++) {
//     //                     disabledHours.push(hour);
//     //                 }
//     //             }

//     //             // Case 3: Disable hours for the end day
//     //             if (date.isSame(to, 'day')) {
//     //                 for (let hour = 0; hour <= to.hour(); hour++) {
//     //                     disabledHours.push(hour);
//     //                 }
//     //             }
//     //         }
//     //     });

//     //     return {
//     //         disabledHours: () => disabledHours,
//     //         disabledMinutes: () => [],
//     //     };
//     // };

//     const isTimeSlotDisabled = (date) => {
//         const momentDate = moment(date);
//         return bookedTimeSlots?.some(slot => {
//             const from = moment(slot.FromDate);
//             const to = moment(slot.ToDate);

//             const matchesCriteria = slot.ZoneName === zoneName &&
//                 slot.OfficeName === officeName &&
//                 slot.RoomName === roomName;

//             // Disable the date if it is within the booked range for the selected room
//             return matchesCriteria && momentDate.isBetween(from, to, null, '[]');
//         });
//     };

// const getDisabledTime = (date) => {
//     const disabledHours = [];

//     bookedTimeSlots.forEach(slot => {
//         const from = moment(slot.FromDate);
//         const to = moment(slot.ToDate);

//         const matchesCriteria = slot.ZoneName === zoneName &&
//             slot.OfficeName === officeName &&
//             slot.RoomName === roomName;

//         // If the booking matches the selected room, check the date range
//         if (matchesCriteria) {
//             // Case 1: Disable hours for the start day
//             if (date.isSame(from, 'day')) {
//                 for (let hour = from.hour(); hour < 24; hour++) {
//                     disabledHours.push(hour);
//                 }
//             }

//             // Case 2: Disable all hours for full days in between
//             if (date.isAfter(from, 'day') && date.isBefore(to, 'day')) {
//                 for (let hour = 0; hour < 24; hour++) {
//                     disabledHours.push(hour);
//                 }
//             }

//             // Case 3: Disable hours for the end day
//             if (date.isSame(to, 'day')) {
//                 for (let hour = 0; hour <= to.hour(); hour++) {
//                     disabledHours.push(hour);
//                 }
//             }
//         }
//     });

//     return {
//         disabledHours: () => disabledHours,
//         disabledMinutes: () => [],
//     };
// };




//     const handleSubmit = async () => {
//         if (!empID || !zoneName || !officeName || !roomName || !fromDate || !toDate || !departments) {
//             message.error("Please fill in all fields.");
//             return;
//         }

//         const bookingData = {
//             EmpID: empID,
//             ZoneName: zoneName,
//             OfficeName: officeName,
//             RoomName: roomName,
//             FromDate: fromDate.format('YYYY-MM-DD HH:mm:ss'),
//             ToDate: toDate.format('YYYY-MM-DD HH:mm:ss'),
//             DepartmentName: departments
//         };

//         try {
//             const response = await axios.post(`${API_BASE_URL}/postroomdata`, bookingData);
//             message.success(response.data.message);
//             setTimeout(() => {
//                 window.location.reload();
//             }, 1000);
//         } catch (error) {
//             if (error.response) {
//                 message.error(error.response.data.error);
//             } else {
//                 message.error("An error occurred while booking the room.");
//             }
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div style={styles.containers}>
//                 <Card title="Room Booking" style={{ maxWidth: 1200, width: '1100px', backgroundColor: '#f0f2f5', margin: 'auto', marginTop: "100px" }}>
//                     <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal">
//                         <Row gutter={16}>
//                             <Col span={8}>
//                                 <Form.Item label="EmpID">
//                                     <Input value={empID} disabled />
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="ZoneName">
//                                     <Select onChange={value => {
//                                         const selectedZone = zones.find(zone => zone.ZoneName === value);
//                                         setZoneName(selectedZone.ZoneName);
//                                         setZoneID(selectedZone.ZoneID);
//                                     }}>
//                                         {zones.map(zone => (
//                                             <Select.Option key={zone.ZoneID} value={zone.ZoneName}>
//                                                 {zone.ZoneName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="OfficeName">
//                                     <Select onChange={value => {
//                                         const selectedOffice = office.find(office => office.OfficeName === value);
//                                         setOfficeName(selectedOffice.OfficeName);
//                                         setOfficeID(selectedOffice.OfficeID);
//                                     }}>
//                                         {office.map(office => (
//                                             <Select.Option key={office.OfficeID} value={office.OfficeName}>
//                                                 {office.OfficeName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                         <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
//                             <Col span={8}>
//                                 <Form.Item label="RoomDetail">
//                                     {/* <Select onChange={value => setRoomName(value)}>
//                                         {room.map(room => (
//                                             <Select.Option key={room.RoomID} value={room.RoomName}>
//                                                 {room.RoomName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select> */}
//                                     <Select onChange={value => setRoomName(value)} style={{ width: 200 }}>
//                                         {room.map(room => (
//                                             <Select.Option key={room.RoomID} value={room.RoomName}>
//                                                 <Tooltip title={room.RoomName}>
//                                                     <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                                                         {room.RoomName}
//                                                     </span>
//                                                 </Tooltip>
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="From Time">
//                                 <DatePicker
//     showTime
//     onChange={date => setFromDate(date)}
//     disabledDate={current => isTimeSlotDisabled(current)}
//     disabledTime={current => getDisabledTime(current)}
// />
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="To Time">
//                                 <DatePicker
//     showTime
//     onChange={date => setToDate(date)}
//     disabledDate={current => isTimeSlotDisabled(current)}
//     disabledTime={current => getDisabledTime(current)}
// />
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
//                             <Col span={9}>
//                                 <Form.Item label="Department Name" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
//                                     <Select onChange={value => {
//                                         const selectedDepartment = departments.find(department => department.DepartmentName === value);
//                                         setDepartment(selectedDepartment.DepartmentName);
//                                     }}>
//                                         {Array.isArray(departments) && departments.map(department => (
//                                             <Select.Option key={department.DepartmentID} value={department.DepartmentName}>
//                                                 {department.DepartmentName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Form.Item wrapperCol={{ offset: 1 }}>
//                             <Button type="primary" onClick={handleSubmit}>Book Room</Button>
//                         </Form.Item>
//                     </Form>
//                 </Card>
//             </div>
//         </>
//     );
// };

// const styles = {
//     containers: {
//         display: 'flex',
//         justifyContent: 'center',
//         height: '90vh',
//     }
// };

// export default RoomBook;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, Select, Card, message, Row, Col } from 'antd';
import { API_BASE_URL } from '../../Custom/config';
import Navbar from '../SideBar/Navbar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const RoomBook = () => {
    const [zones, setZones] = useState([]);
    const [departments, setDepartment] = useState([]);
    const [office, setOffice] = useState([]);
    const [room, setRoom] = useState([]);
    const [empID, setEmpID] = useState('');
    const [zoneID, setZoneID] = useState('');
    const [zoneName, setZoneName] = useState('');
    const [officeID, setOfficeID] = useState('');
    const [officeName, setOfficeName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

        const storedEmpID = sessionStorage.getItem('empid');
        if (storedEmpID) {
            setEmpID(storedEmpID);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getZoneDropdown`);
                setZones(response.data);
            } catch (error) {
                console.error("Error fetching zone details:", error);
            }
        };
        fetchZones();
    }, []);

    useEffect(() => {
        const fetchDepartmentNames = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/getdepartmentname`);
                setDepartment(response.data);
            } catch (error) {
                console.error("Error fetching department details:", error);
                setDepartment([]);
            }
        };
        fetchDepartmentNames();
    }, []);


    useEffect(() => {
        if (zoneID) {
            const fetchOffice = async () => {
                try {
                    const response = await axios.post(`${API_BASE_URL}/getZoneOffice`, { ZoneID: zoneID });
                    setOffice(response.data);
                } catch (error) {
                    console.error("Error fetching office details:", error);
                }
            };
            fetchOffice();
        }
    }, [zoneID]);

    useEffect(() => {
        const fetchTiming = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/GetBookedTimeSlots`);
                const adjustedTimeSlots = response.data.map(slot => {
                    const adjustedFromDate = moment(slot.FromDate).subtract(5, 'hours').subtract(30, 'minutes');
                    const adjustedToDate = moment(slot.ToDate).subtract(5, 'hours').subtract(30, 'minutes');
    
                    return {
                        ...slot,
                        FromDate: adjustedFromDate.format('YYYY-MM-DD HH:mm:ss'),
                        ToDate: adjustedToDate.format('YYYY-MM-DD HH:mm:ss')
                    };
                });
    
                setBookedTimeSlots(adjustedTimeSlots);
    
            } catch (error) {
                console.error("Error fetching booked time slots:", error);
            }
        };
        fetchTiming();
    }, []);



    useEffect(() => {
        if (officeID) {
            const fetchRoom = async () => {
                try {
                    const response = await axios.post(`${API_BASE_URL}/getzoneroom`, { OfficeID: officeID });
                    setRoom(response.data);
                } catch (error) {
                    console.error("Error fetching room details:", error);
                }
            };
            fetchRoom();
        }
    }, [officeID]);

// Function to check if the time slot is disabled
// Function to check if the time slot is disabled
// const isTimeSlotDisabled = (date) => {
//     const momentDate = moment(date).startOf('day'); // Normalize to the start of the day to compare only dates
//     return bookedTimeSlots.some(slot => {
//         const from = moment(slot.FromDate).startOf('day'); // Normalize to the start of the day
//         const to = moment(slot.ToDate).startOf('day'); // Normalize to the start of the day

//         const matchesCriteria = slot.ZoneName === zoneName &&
//             slot.OfficeName === officeName &&
//             slot.RoomName === roomName;

//         // Disable the date if it is the same day as the booked date
//         return matchesCriteria && (momentDate.isSame(from, 'day') || momentDate.isSame(to, 'day'));
//     });
// };

// // Disable hours based on booked time slots (From and To date handling)
// const getDisabledTime = (date) => {
//     const disabledHours = [];

//     bookedTimeSlots.forEach(slot => {
//         const from = moment(slot.FromDate);
//         const to = moment(slot.ToDate);

//         const matchesCriteria = slot.ZoneName === zoneName &&
//             slot.OfficeName === officeName &&
//             slot.RoomName === roomName;

//         // Disable the hours within the booked slot for both FromDate and ToDate
//         if (matchesCriteria) {
//             // Disable hours for the "From" date
//             if (date.isSame(from, 'day')) {
//                 const startHour = from.hour();
//                 const endHour = to.hour();

//                 // Disable the hours from the start hour to the end hour
//                 for (let hour = startHour; hour <= endHour; hour++) {
//                     disabledHours.push(hour);
//                 }
//             }
//             // Disable hours for the "To" date
//             if (date.isSame(to, 'day')) {
//                 const startHour = from.hour();
//                 const endHour = to.hour();

//                 // Disable the hours from the start hour to the end hour
//                 for (let hour = startHour; hour <= endHour; hour++) {
//                     disabledHours.push(hour);
//                 }
//             }
//         }
//     });

//     return {
//         disabledHours: () => disabledHours,
//         disabledMinutes: () => [], // Optionally disable specific minutes if needed
//     };
// };

//if suppose error means check with this below working code
const isTimeSlotDisabled = (date) => {
    const momentDate = moment(date);
    return bookedTimeSlots.some(slot => {
        const from = moment(slot.FromDate);
        const to = moment(slot.ToDate);

        const matchesCriteria = slot.ZoneName === zoneName &&
            slot.OfficeName === officeName &&
            slot.RoomName === roomName;

        return matchesCriteria && momentDate.isBetween(from, to, null, '[]');
    });
};


const getDisabledTime = (date) => {
    const disabledHours = [];

    bookedTimeSlots.forEach(slot => {
        const from = moment(slot.FromDate);
        const to = moment(slot.ToDate);

        const matchesCriteria = slot.ZoneName === zoneName &&
            slot.OfficeName === officeName &&
            slot.RoomName === roomName;

        if (matchesCriteria && date.isSame(from, 'day')) {
            for (let hour = from.hour(); hour <= to.hour(); hour++) {
                disabledHours.push(hour);
            }
        }
    });

    return {
        disabledHours: () => disabledHours,
        disabledMinutes: () => [],
    };
};

    const handleSubmit = async () => {
        if (!empID || !zoneName || !officeName || !roomName || !fromDate || !toDate || !departments) {
            message.error("Please fill in all fields.");
            return;
        }

        const bookingData = {
            EmpID: empID,
            ZoneName: zoneName,
            OfficeName: officeName,
            RoomName: roomName,
            FromDate: fromDate.format('YYYY-MM-DD HH:mm:ss'),
            ToDate: toDate.format('YYYY-MM-DD HH:mm:ss'),
            DepartmentName: departments
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/postroomdata`, bookingData);
            message.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.error);
            } else {
                message.error("An error occurred while booking the room.");
            }
        }
    };
 
    return (
        <>
            <Navbar />
            <div style={styles.containers}>
                <Card title="Room Booking" style={{ maxWidth: 1200, width: '1100px', backgroundColor: '#f0f2f5', margin: 'auto', marginTop: "100px" }}>
                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label="EmpID">
                                    <Input value={empID} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="ZoneName">
                                    <Select onChange={value => {
                                        const selectedZone = zones.find(zone => zone.ZoneName === value);
                                        setZoneName(selectedZone.ZoneName);
                                        setZoneID(selectedZone.ZoneID);
                                    }}>
                                        {zones.map(zone => (
                                            <Select.Option key={zone.ZoneID} value={zone.ZoneName}>
                                                {zone.ZoneName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="OfficeName">
                                    <Select onChange={value => {
                                        const selectedOffice = office.find(office => office.OfficeName === value);
                                        setOfficeName(selectedOffice.OfficeName);
                                        setOfficeID(selectedOffice.OfficeID);
                                    }}>
                                        {office.map(office => (
                                            <Select.Option key={office.OfficeID} value={office.OfficeName}>
                                                {office.OfficeName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                            <Col span={8}>
                                <Form.Item label="RoomName">
                                    <Select onChange={value => setRoomName(value)}>
                                        {room.map(room => (
                                            <Select.Option key={room.RoomID} value={room.RoomName}>
                                                {room.RoomName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="From Time">
                                    <DatePicker
                                        showTime
                                        onChange={date => setFromDate(date)}
                                        disabledDate={current => isTimeSlotDisabled(current)}
                                        disabledTime={current => getDisabledTime(current)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="To Time">
                                    <DatePicker
                                        showTime
                                        onChange={date => setToDate(date)}
                                        disabledDate={current => isTimeSlotDisabled(current)}
                                        disabledTime={current => getDisabledTime(current)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                            <Col span={9}>
                                <Form.Item label="Department Name" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                    <Select onChange={value => {
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

                        <Form.Item wrapperCol={{ offset: 1 }}>
                            <Button type="primary" onClick={handleSubmit}>Book Room</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
};

const styles = {
    containers: {
        display: 'flex',
        justifyContent: 'center',
        height: '90vh',
    }
};

export default RoomBook;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, DatePicker, Form, Input, Select, Card, message, Row, Col } from 'antd';
// import { API_BASE_URL } from '../../Custom/config';
// import Navbar from '../SideBar/Navbar';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

// const RoomBook = () => {
//     const [zones, setZones] = useState([]);
//     const [departments, setDepartment] = useState([]);
//     const [office, setOffice] = useState([]);
//     const [room, setRoom] = useState([]);
//     const [empID, setEmpID] = useState('');
//     const [zoneID, setZoneID] = useState('');
//     const [zoneName, setZoneName] = useState('');
//     const [officeID, setOfficeID] = useState('');
//     const [officeName, setOfficeName] = useState('');
//     const [roomName, setRoomName] = useState('');
//     const [fromDate, setFromDate] = useState(null);
//     const [toDate, setToDate] = useState(null);
//     const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//             navigate("/");
//         }

//         const storedEmpID = sessionStorage.getItem('empid');
//         if (storedEmpID) {
//             setEmpID(storedEmpID);
//         }
//     }, [navigate]);

//     useEffect(() => {
//         const fetchZones = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/getZoneDropdown`);
//                 setZones(response.data);
//             } catch (error) {
//                 console.error("Error fetching zone details:", error);
//             }
//         };
//         fetchZones();
//     }, []);

//     useEffect(() => {
//         const fetchDepartmentNames = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/getdepartmentname`);
//                 setDepartment(response.data);
//             } catch (error) {
//                 console.error("Error fetching department details:", error);
//                 setDepartment([]);
//             }
//         };
//         fetchDepartmentNames();
//     }, []);


//     useEffect(() => {
//         if (zoneID) {
//             const fetchOffice = async () => {
//                 try {
//                     const response = await axios.post(`${API_BASE_URL}/getZoneOffice`, { ZoneID: zoneID });
//                     setOffice(response.data);
//                 } catch (error) {
//                     console.error("Error fetching office details:", error);
//                 }
//             };
//             fetchOffice();
//         }
//     }, [zoneID]);

//     useEffect(() => {
//         const fetchTiming = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/GetBookedTimeSlots`);
//                 const adjustedTimeSlots = response.data.map(slot => {
//                     const adjustedFromDate = moment(slot.FromDate).subtract(5, 'hours').subtract(30, 'minutes');
//                     const adjustedToDate = moment(slot.ToDate).subtract(5, 'hours').subtract(30, 'minutes');
    
//                     return {
//                         ...slot,
//                         FromDate: adjustedFromDate.format('YYYY-MM-DD HH:mm:ss'),
//                         ToDate: adjustedToDate.format('YYYY-MM-DD HH:mm:ss')
//                     };
//                 });
    
//                 setBookedTimeSlots(adjustedTimeSlots);
    
//             } catch (error) {
//                 console.error("Error fetching booked time slots:", error);
//             }
//         };
//         fetchTiming();
//     }, []);



//     useEffect(() => {
//         if (officeID) {
//             const fetchRoom = async () => {
//                 try {
//                     const response = await axios.post(`${API_BASE_URL}/getzoneroom`, { OfficeID: officeID });
//                     setRoom(response.data);
//                 } catch (error) {
//                     console.error("Error fetching room details:", error);
//                 }
//             };
//             fetchRoom();
//         }
//     }, [officeID]);

//     const isTimeSlotDisabled = (date) => {
//         const momentDate = moment(date);
//         return bookedTimeSlots.some(slot => {
//             const from = moment(slot.FromDate);
//             const to = moment(slot.ToDate);

//             const matchesCriteria = slot.ZoneName === zoneName &&
//                 slot.OfficeName === officeName &&
//                 slot.RoomName === roomName;

//             return matchesCriteria && momentDate.isBetween(from, to, null, '[]');
//         });
//     };


//     const getDisabledTime = (date) => {
//         const disabledHours = [];

//         bookedTimeSlots.forEach(slot => {
//             const from = moment(slot.FromDate);
//             const to = moment(slot.ToDate);

//             const matchesCriteria = slot.ZoneName === zoneName &&
//                 slot.OfficeName === officeName &&
//                 slot.RoomName === roomName;

//             if (matchesCriteria && date.isSame(from, 'day')) {
//                 for (let hour = from.hour(); hour <= to.hour(); hour++) {
//                     disabledHours.push(hour);
//                 }
//             }
//         });

//         return {
//             disabledHours: () => disabledHours,
//             disabledMinutes: () => [],
//         };
//     };

//     const handleSubmit = async () => {
//         if (!empID || !zoneName || !officeName || !roomName || !fromDate || !toDate || !departments) {
//             message.error("Please fill in all fields.");
//             return;
//         }

//         const bookingData = {
//             EmpID: empID,
//             ZoneName: zoneName,
//             OfficeName: officeName,
//             RoomName: roomName,
//             FromDate: fromDate.format('YYYY-MM-DD HH:mm:ss'),
//             ToDate: toDate.format('YYYY-MM-DD HH:mm:ss'),
//             DepartmentName: departments
//         };

//         try {
//             const response = await axios.post(`${API_BASE_URL}/postroomdata`, bookingData);
//             message.success(response.data.message);
//             setTimeout(() => {
//                 window.location.reload();
//             }, 1000);
//         } catch (error) {
//             if (error.response) {
//                 message.error(error.response.data.error);
//             } else {
//                 message.error("An error occurred while booking the room.");
//             }
//         }
//     };



//     return (
//         <>
//             <Navbar />
//             <div style={styles.containers}>
//                 <Card title="Room Booking" style={{ maxWidth: 1200, width: '1100px', backgroundColor: '#f0f2f5', margin: 'auto', marginTop: "100px" }}>
//                     <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} layout="horizontal">
//                         <Row gutter={16}>
//                             <Col span={8}>
//                                 <Form.Item label="EmpID">
//                                     <Input value={empID} disabled />
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="ZoneName">
//                                     <Select onChange={value => {
//                                         const selectedZone = zones.find(zone => zone.ZoneName === value);
//                                         setZoneName(selectedZone.ZoneName);
//                                         setZoneID(selectedZone.ZoneID);
//                                     }}>
//                                         {zones.map(zone => (
//                                             <Select.Option key={zone.ZoneID} value={zone.ZoneName}>
//                                                 {zone.ZoneName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="OfficeName">
//                                     <Select onChange={value => {
//                                         const selectedOffice = office.find(office => office.OfficeName === value);
//                                         setOfficeName(selectedOffice.OfficeName);
//                                         setOfficeID(selectedOffice.OfficeID);
//                                     }}>
//                                         {office.map(office => (
//                                             <Select.Option key={office.OfficeID} value={office.OfficeName}>
//                                                 {office.OfficeName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                         <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
//                             <Col span={8}>
//                                 <Form.Item label="RoomName">
//                                     <Select onChange={value => setRoomName(value)}>
//                                         {room.map(room => (
//                                             <Select.Option key={room.RoomID} value={room.RoomName}>
//                                                 {room.RoomName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="From Time">
//                                     <DatePicker
//                                         showTime
//                                         onChange={date => setFromDate(date)}
//                                         disabledDate={current => isTimeSlotDisabled(current)}
//                                         disabledTime={current => getDisabledTime(current)}
//                                     />
//                                 </Form.Item>
//                             </Col>
//                             <Col span={8}>
//                                 <Form.Item label="To Time">
//                                     <DatePicker
//                                         showTime
//                                         onChange={date => setToDate(date)}
//                                         disabledDate={current => isTimeSlotDisabled(current)}
//                                         disabledTime={current => getDisabledTime(current)}
//                                     />
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
//                             <Col span={9}>
//                                 <Form.Item label="Department Name" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
//                                     <Select onChange={value => {
//                                         const selectedDepartment = departments.find(department => department.DepartmentName === value);
//                                         setDepartment(selectedDepartment.DepartmentName);
//                                     }}>
//                                         {Array.isArray(departments) && departments.map(department => (
//                                             <Select.Option key={department.DepartmentID} value={department.DepartmentName}>
//                                                 {department.DepartmentName}
//                                             </Select.Option>
//                                         ))}
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                         </Row>

//                         <Form.Item wrapperCol={{ offset: 1 }}>
//                             <Button type="primary" onClick={handleSubmit}>Book Room</Button>
//                         </Form.Item>
//                     </Form>
//                 </Card>
//             </div>
//         </>
//     );
// };

// const styles = {
//     containers: {
//         display: 'flex',
//         justifyContent: 'center',
//         height: '90vh',
//     }
// };

// export default RoomBook;














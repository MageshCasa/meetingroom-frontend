// import React, { useEffect, useState } from 'react';
// import Navbar from '../SideBar/Navbar';
// import { API_BASE_URL } from '../../Custom/config';
// import axios from 'axios';
// import { Col, Row, Input, Button, Card } from 'antd';
// import { Chart } from 'react-google-charts';
// import ApexCharts from 'react-apexcharts';
// import './dashboard.css';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [chartData, setChartData] = useState([]);
//     const [todayCount, setTodayCount] = useState([]);
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [barChartData, setBarChartData] = useState({
//         series: [{ name: 'Room Count', data: [] }],
//         options: {
//             chart: { type: 'bar', height: 350 },
//             plotOptions: {
//                 bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
//             },
//             dataLabels: { enabled: false },
//             stroke: { show: true, width: 2, colors: ['transparent'] },
//             xaxis: { categories: [] },
//             yaxis: { title: { text: 'Room Count' } },
//             fill: { opacity: 1 },
//             tooltip: {
//                 y: { formatter: (val) => `${val} rooms` }
//             }
//         }
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = sessionStorage.getItem("token");
//         if (!token) {
//             navigate("/");
//         }
//     }, [navigate]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/dashboard`);
//                 const data = response.data;
//                 const pieChartData = [['ZoneName', 'RoomCount'], ...data.map(item => [item.ZoneName, item.RoomCount])];
//                 setChartData(pieChartData);
//             } catch (error) {
//                 console.error("Error fetching chart data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         const fetchTodayCount = async () => {
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/todaycount`);
//                 const todayPieChartData = [['ZoneName', 'RoomCount'], ...response.data.todayBookingCount.map(item => [item.ZoneName, item.RoomCount || 0])];
//                 setTodayCount(todayPieChartData);
//             } catch (error) {
//                 console.error("Today there is no count:", error);
//             }
//         };
//         fetchTodayCount();
//     }, []);

//     const handleDateSubmit = async () => {
//         try {
//             const response = await axios.post(`${API_BASE_URL}/departmentcount`, { fromDate, toDate });
//             const labels = response.data.map(item => `${item.Week} - ${item.ZoneName} - ${item.DepartmentName}`);
//             const counts = response.data.map(item => item.RoomCount);
//             setBarChartData({
//                 series: [{ name: 'Room Count', data: counts }],
//                 options: { ...barChartData.options, xaxis: { categories: labels } }
//             });
//         } catch (error) {
//             console.error("Error fetching bar chart data:", error);
//         }
//     };
//     console.log(todayCount.length);


//     return (<>
//         <Navbar />
//         <div className="dashboard-container">
//             <div className="chart-section">
//                 <Row gutter={16} style={{ marginTop: "20px" }}>
//                     <Col span={12}>
//                         <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
//                             <h2>Room Count by Zone</h2>
//                             <Chart
//                                 chartType="PieChart"
//                                 data={chartData}
//                                 options={{ is3D: true, width: 570, height: 400 }}
//                             />
//                         </Card>
//                     </Col>
//                     <Col span={12}>
//                         <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
//                             <h2>Room Count by Zone And Today Count</h2>
//                             {todayCount.length <= 1 ? (
//                                 <div style={{ textAlign: 'center', padding: '50px 0' }}>
//                                     <h3>Today no room has been booked.</h3>
//                                 </div>
//                             ) : (
//                                 <Chart
//                                     chartType="PieChart"
//                                     data={todayCount}
//                                     options={{ is3D: true, width: 570, height: 400 }}
//                                 />
//                             )}
//                         </Card>
//                     </Col>
//                 </Row>
//                 <Row gutter={16} justify="end" style={{ marginTop: '30px' }}>
//                     <Col span={8}>
//                         <Input
//                             type="date"
//                             value={fromDate}
//                             onChange={(e) => setFromDate(e.target.value)}
//                             placeholder="From Date"
//                             style={{ width: '100%' }}
//                         />
//                     </Col>
//                     <Col span={8}>
//                         <Input
//                             type="date"
//                             value={toDate}
//                             onChange={(e) => setToDate(e.target.value)}
//                             placeholder="To Date"
//                             style={{ width: '100%' }}
//                         />
//                     </Col>
//                     <Col span={8}>
//                         <Button type="primary" onClick={handleDateSubmit} style={{ width: '60%' }}>
//                             Get Data
//                         </Button>
//                     </Col>
//                 </Row>

//                 <Row gutter={16} justify="center" style={{ marginTop: '50px' }}>
//                     <Col span={24}>
//                         <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
//                             <h2 style={{ textAlign: 'center' }}>Room Count by Week and Zone</h2>
//                             <div className="bar-chart-container" style={{ marginLeft: '60px' }}>
//                                 <ApexCharts options={barChartData.options} series={barChartData.series} type="bar" height={450} width={1000} />
//                             </div>
//                         </Card>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     </>

//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import Navbar from '../SideBar/Navbar';
import { API_BASE_URL } from '../../Custom/config';
import axios from 'axios';
import { Col, Row, Input, Button, Card } from 'antd';
import { Chart } from 'react-google-charts';
import ApexCharts from 'react-apexcharts';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [todayCount, setTodayCount] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [barChartData, setBarChartData] = useState({
        series: [{ name: 'Room Count', data: [] }],
        options: {
            chart: { type: 'bar', height: 350 },
            plotOptions: {
                bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }
            },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: { categories: [] },
            yaxis: { title: { text: 'Room Count' } },
            fill: { opacity: 1 },
            tooltip: {
                y: { formatter: (val) => `${val} rooms` }
            }
        }
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/dashboard`);
                const data = response.data;
                const pieChartData = [['ZoneName', 'RoomCount'], ...data.map(item => [item.ZoneName, item.RoomCount])];
                setChartData(pieChartData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchTodayCount = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/todaycount`);
                const todayPieChartData = [['ZoneName', 'RoomCount'], ...response.data.todayBookingCount.map(item => [item.ZoneName, item.RoomCount || 0])];
                setTodayCount(todayPieChartData);
            } catch (error) {
                console.error("Today there is no count:", error);
            }
        };
        fetchTodayCount();
    }, []);

    const handleDateSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/departmentcount`, { fromDate, toDate });
            const labels = response.data.map(item => `${item.Week} - ${item.ZoneName} - ${item.DepartmentName}`);
            const counts = response.data.map(item => item.RoomCount);
            setBarChartData({
                series: [{ name: 'Room Count', data: counts }],
                options: { ...barChartData.options, xaxis: { categories: labels } }
            });
        } catch (error) {
            console.error("Error fetching bar chart data:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="chart-section">
                    <Row gutter={16} style={{ marginTop: "20px" }} justify="space-between">
                        {/* First Column: Pie Chart - Room Count by Zone */}
                        <Col xs={24} sm={12} md={8} lg={8}>
                            <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
                                <h2>Total Booking</h2>
                                <Chart
                                    chartType="PieChart"
                                    data={chartData}
                                    options={{ is3D: true, width: '100%', height: '312px' }}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={8} lg={8}>
                            <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
                                <h2>Today Booking</h2>
                                <div style={{ height: '313px' }}> {/* Fixed height for the chart container */}
                                    {todayCount.length <= 1 ? (
                                        <div style={{ textAlign: 'center', padding: '50px 0', width: '100%', height: '100%' }}>
                                            <h3>Today no room has been booked.</h3>
                                        </div>
                                    ) : (
                                        <Chart
                                            chartType="PieChart"
                                            data={todayCount}
                                            options={{ is3D: true, width: '100%', height: '100%' }} // Ensure chart takes full container height
                                        />
                                    )}
                                </div>
                            </Card>
                        </Col>


                        <Col xs={24} sm={12} md={8} lg={8}>
                            <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
                                <h2 style={{ textAlign: 'center' }}>Overall Booking</h2>
                                <div className="bar-chart-container" style={{ margin: '0 auto', maxWidth: '100%' }}>
                                    <ApexCharts options={barChartData.options} series={barChartData.series} type="bar" height={300} />
                                </div>
                            </Card>
                            <Row gutter={16} justify="center" style={{ marginTop: '30px' }}>
                                <Col xs={24} sm={8} md={6} lg={6}>
                                    <h3 style={{marginTop: "-10px"}}>From Date</h3>
                                    <Input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        placeholder="From Date"
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col xs={24} sm={8} md={6} lg={6}>
                                    <h3 style={{marginTop: "-10px"}}>To Date</h3>
                                    <Input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        placeholder="To Date"
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col xs={24} sm={8} md={6} lg={6}>
                                    <Button
                                        type="primary"
                                        onClick={handleDateSubmit}
                                        style={{ width: '100%',marginTop: "29px" }}
                                    >
                                        Get Data
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default Dashboard;







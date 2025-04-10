// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Grid, 
//   Typography, 
//   Card, 
//   CardContent, 
//   CircularProgress,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Chip,
//   IconButton,
//   Tooltip,
//   useMediaQuery
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';
// import { useTheme } from '@mui/material/styles';
// import {
//   ArrowUpward,
//   ArrowDownward,
//   InfoOutlined,
//   Visibility,
//   TrendingUp,
//   Assessment,
//   Star,
//   GppGood,
  
//   GppBad
// } from '@mui/icons-material';



// const Dashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('quarterly');
//   const [vendorData, setVendorData] = useState(null);
//   const [csrMetrics, setCsrMetrics] = useState([]);
//   const [complianceStatus, setComplianceStatus] = useState([]);
//   const [topVendors, setTopVendors] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Simulate API call with skeleton loading
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         // Enhanced mock data with more realistic values
//         const mockVendorData = {
//           totalVendors: 142,
//           compliantVendors: 98,
//           nonCompliantVendors: 12,
//           underReview: 32,
//           averageScore: 82.5,
//           improvement: 4.2,
//           previousScore: 79.1
//         };

//         const mockCsrMetrics = [
//           { name: 'Environmental', value: 78, trend: 2.1 },
//           { name: 'Social', value: 85, trend: 1.4 },
//           { name: 'Governance', value: 76, trend: -0.8 },
//           { name: 'Ethical Sourcing', value: 89, trend: 3.2 },
//           { name: 'Community Impact', value: 81, trend: 1.7 }
//         ];

//         const mockComplianceStatus = [
//           { status: 'Fully Compliant', value: 98, color: theme.palette.success.main },
//           { status: 'Partially Compliant', value: 32, color: theme.palette.warning.main },
//           { status: 'Non-Compliant', value: 12, color: theme.palette.error.main }
//         ];

//         const mockTopVendors = [
//           { id: 1, name: 'GreenTech Solutions', score: 95, category: 'Environmental', trend: 'up' },
//           { id: 2, name: 'FairSource Inc.', score: 93, category: 'Ethical Sourcing', trend: 'up' },
//           { id: 3, name: 'Community First', score: 91, category: 'Community Impact', trend: 'steady' },
//           { id: 4, name: 'EqualWork Co.', score: 89, category: 'Social', trend: 'up' },
//           { id: 5, name: 'Transparent Ltd.', score: 87, category: 'Governance', trend: 'down' }
//         ];

//         setVendorData(mockVendorData);
//         setCsrMetrics(mockCsrMetrics);
//         setComplianceStatus(mockComplianceStatus);
//         setTopVendors(mockTopVendors);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [timeRange, theme]);

//   const COLORS = [
//     theme.palette.primary.main,
//     theme.palette.success.main,
//     theme.palette.warning.main,
//     theme.palette.error.main,
//     theme.palette.info.main
//   ];

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress size={60} thickness={4} />
//       </Box>
//     );
//   }

//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
//     const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

//     return (
//       <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <Paper elevation={3} sx={{ p: 2, backgroundColor: 'background.paper' }}>
//           <Typography variant="subtitle2" gutterBottom>
//             {payload[0].payload.name}
//           </Typography>
//           <Typography>
//             Score: <strong>{payload[0].value}</strong>
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Trend: {payload[0].payload.trend > 0 ? '+' : ''}{payload[0].payload.trend}%
//           </Typography>
//         </Paper>
//       );
//     }
//     return null;
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: isMobile ? 1 : 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" component="h1">
//           CSR Vendor Dashboard
//         </Typography>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Tooltip title="Select time period for data">
//             <FormControl sx={{ minWidth: 120 }} size="small">
//               <InputLabel>Time Range</InputLabel>
//               <Select
//                 value={timeRange}
//                 label="Time Range"
//                 onChange={(e) => setTimeRange(e.target.value)}
//               >
//                 <MenuItem value="monthly">Monthly</MenuItem>
//                 <MenuItem value="quarterly">Quarterly</MenuItem>
//                 <MenuItem value="yearly">Yearly</MenuItem>
//               </Select>
//             </FormControl>
//           </Tooltip>
          
//           <Tooltip title="View dashboard documentation">
//             <IconButton color="primary">
//               <InfoOutlined />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
      
//       {/* Summary Cards */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ 
//             borderLeft: `4px solid ${theme.palette.primary.main}`,
//             height: '100%'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <Assessment color="primary" sx={{ mr: 1 }} />
//                 <Typography color="textSecondary" variant="subtitle2">
//                   Total Vendors
//                 </Typography>
//               </Box>
//               <Typography variant="h4" sx={{ mb: 1 }}>
//                 {vendorData.totalVendors}
//               </Typography>
//               <Chip 
//                 label={`${vendorData.underReview} under review`} 
//                 size="small" 
//                 variant="outlined" 
//                 color="info"
//               />
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ 
//             borderLeft: `4px solid ${theme.palette.success.main}`,
//             height: '100%'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <GppGood color="success" sx={{ mr: 1 }} />
//                 <Typography color="textSecondary" variant="subtitle2">
//                   Compliant Vendors
//                 </Typography>
//               </Box>
//               <Typography variant="h4" color="success.main" sx={{ mb: 1 }}>
//                 {vendorData.compliantVendors}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {Math.round((vendorData.compliantVendors / vendorData.totalVendors) * 100)}% of total
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ 
//             borderLeft: `4px solid ${theme.palette.error.main}`,
//             height: '100%'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <GppBad color="error" sx={{ mr: 1 }} />
//                 <Typography color="textSecondary" variant="subtitle2">
//                   Non-Compliant
//                 </Typography>
//               </Box>
//               <Typography variant="h4" color="error.main" sx={{ mb: 1 }}>
//                 {vendorData.nonCompliantVendors}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {Math.round((vendorData.nonCompliantVendors / vendorData.totalVendors) * 100)}% of total
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={3}>
//           <Card elevation={3} sx={{ 
//             borderLeft: `4px solid ${theme.palette.warning.main}`,
//             height: '100%'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <TrendingUp color="warning" sx={{ mr: 1 }} />
//                 <Typography color="textSecondary" variant="subtitle2">
//                   Avg. CSR Score
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Typography variant="h4" sx={{ mr: 1 }}>
//                   {vendorData.averageScore}
//                 </Typography>
//                 {vendorData.improvement >= 0 ? (
//                   <ArrowUpward color="success" fontSize="small" />
//                 ) : (
//                   <ArrowDownward color="error" fontSize="small" />
//                 )}
//                 <Typography 
//                   variant="subtitle2" 
//                   color={vendorData.improvement >= 0 ? "success.main" : "error.main"}
//                 >
//                   {Math.abs(vendorData.improvement)}%
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="textSecondary">
//                 Previous: {vendorData.previousScore}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       {/* Charts Row 1 */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={7}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Assessment color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6">
//                   CSR Performance by Category
//                 </Typography>
//               </Box>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={csrMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                   <XAxis 
//                     dataKey="name" 
//                     tick={{ fill: theme.palette.text.primary }}
//                   />
//                   <YAxis 
//                     domain={[0, 100]} 
//                     tick={{ fill: theme.palette.text.primary }}
//                   />
//                   <RechartsTooltip 
//                     content={<CustomTooltip />} 
//                     cursor={{ fill: theme.palette.action.hover }}
//                   />
//                   <Legend />
//                   <Bar 
//                     dataKey="value" 
//                     name="CSR Score" 
//                     radius={[4, 4, 0, 0]}
//                   >
//                     {csrMetrics.map((entry, index) => (
//                       <Cell 
//                         key={`cell-${index}`} 
//                         fill={COLORS[index % COLORS.length]} 
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} md={5}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <GppGood color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6">
//                   Compliance Status
//                 </Typography>
//               </Box>
//               <ResponsiveContainer width="100%" height={350}>
//                 <PieChart>
//                   <Pie
//                     data={complianceStatus}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={120}
//                     innerRadius={60}
//                     fill="#8884d8"
//                     dataKey="value"
//                     nameKey="status"
//                   >
//                     {complianceStatus.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <RechartsTooltip 
//                     formatter={(value, name, props) => [
//                       value, 
//                       `${name} (${Math.round((value / vendorData.totalVendors) * 100)}%)`
//                     ]}
//                   />
//                   <Legend 
//                     layout={isMobile ? 'horizontal' : 'vertical'} 
//                     verticalAlign={isMobile ? 'bottom' : 'middle'} 
//                     align="right"
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
      
//       {/* Top Vendors Table */}
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Star color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="h6">
//                   Top Performing Vendors
//                 </Typography>
//               </Box>
//               <TableContainer component={Paper} elevation={0}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Vendor</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }} align="center">CSR Score</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Category Strength</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }} align="center">Trend</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {topVendors.map((vendor) => (
//                       <TableRow 
//                         key={vendor.id}
//                         hover
//                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                       >
//                         <TableCell component="th" scope="row">
//                           <Typography fontWeight="medium">{vendor.name}</Typography>
//                         </TableCell>
//                         <TableCell align="center">
//                           <Box 
//                             sx={{
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               width: 40,
//                               height: 40,
//                               borderRadius: '50%',
//                               bgcolor: vendor.score >= 90 
//                                 ? theme.palette.success.light 
//                                 : vendor.score >= 75 
//                                   ? theme.palette.warning.light 
//                                   : theme.palette.error.light,
//                               color: theme.palette.getContrastText(
//                                 vendor.score >= 90 
//                                   ? theme.palette.success.light 
//                                   : vendor.score >= 75 
//                                     ? theme.palette.warning.light 
//                                     : theme.palette.error.light
//                               ),
//                               fontWeight: 'bold'
//                             }}
//                           >
//                             {vendor.score}
//                           </Box>
//                         </TableCell>
//                         <TableCell>
//                           <Chip 
//                             label={vendor.category} 
//                             size="small" 
//                             sx={{ 
//                               backgroundColor: theme.palette.grey[200],
//                               fontWeight: 'medium'
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell align="center">
//                           {vendor.trend === 'up' ? (
//                             <ArrowUpward color="success" />
//                           ) : vendor.trend === 'down' ? (
//                             <ArrowDownward color="error" />
//                           ) : (
//                             <Typography color="textSecondary">—</Typography>
//                           )}
//                         </TableCell>
//                         <TableCell align="right">
//                           <Tooltip title="View details">
//                             <IconButton color="primary" size="small">
//                               <Visibility />
//                             </IconButton>
//                           </Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;



































import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('quarterly');
  const [vendorData, setVendorData] = useState(null);
  const [csrMetrics, setCsrMetrics] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState([]);
  const [topVendors, setTopVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with skeleton loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Enhanced mock data with more realistic values
        const mockVendorData = {
          totalVendors: 142,
          compliantVendors: 98,
          nonCompliantVendors: 12,
          underReview: 32,
          averageScore: 82.5,
          improvement: 4.2,
          previousScore: 79.1
        };

        const mockCsrMetrics = [
          { name: 'Environmental', value: 78, trend: 2.1 },
          { name: 'Social', value: 85, trend: 1.4 },
          { name: 'Governance', value: 76, trend: -0.8 },
          { name: 'Ethical Sourcing', value: 89, trend: 3.2 },
          { name: 'Community Impact', value: 81, trend: 1.7 }
        ];

        const mockComplianceStatus = [
          { status: 'Fully Compliant', value: 98, color: '#10b981' },
          { status: 'Partially Compliant', value: 32, color: '#f59e0b' },
          { status: 'Non-Compliant', value: 12, color: '#ef4444' }
        ];

        const mockTopVendors = [
          { id: 1, name: 'GreenTech Solutions', score: 95, category: 'Environmental', trend: 'up' },
          { id: 2, name: 'FairSource Inc.', score: 93, category: 'Ethical Sourcing', trend: 'up' },
          { id: 3, name: 'Community First', score: 91, category: 'Community Impact', trend: 'steady' },
          { id: 4, name: 'EqualWork Co.', score: 89, category: 'Social', trend: 'up' },
          { id: 5, name: 'Transparent Ltd.', score: 87, category: 'Governance', trend: 'down' }
        ];

        setVendorData(mockVendorData);
        setCsrMetrics(mockCsrMetrics);
        setComplianceStatus(mockComplianceStatus);
        setTopVendors(mockTopVendors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getColorByScore = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            CSR Vendor Dashboard
          </h1>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Vendors */}
          <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-blue-500">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="text-sm text-gray-500 font-medium">Total Vendors</span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{vendorData.totalVendors}</div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {vendorData.underReview} under review
              </span>
            </div>
          </div>
          
          {/* Compliant Vendors */}
          <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-green-500">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500 font-medium">Compliant Vendors</span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{vendorData.compliantVendors}</div>
              <span className="text-sm text-gray-500">
                {Math.round((vendorData.compliantVendors / vendorData.totalVendors) * 100)}% of total
              </span>
            </div>
          </div>
          
          {/* Non-Compliant */}
          <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-red-500">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500 font-medium">Non-Compliant</span>
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">{vendorData.nonCompliantVendors}</div>
              <span className="text-sm text-gray-500">
                {Math.round((vendorData.nonCompliantVendors / vendorData.totalVendors) * 100)}% of total
              </span>
            </div>
          </div>
          
          {/* Avg. CSR Score */}
          <div className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-yellow-500">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-500 font-medium">Avg. CSR Score</span>
              </div>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gray-800 mr-2">{vendorData.averageScore}</div>
                {vendorData.improvement >= 0 ? (
                  <div className="flex items-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{Math.abs(vendorData.improvement)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{Math.abs(vendorData.improvement)}%</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500">Previous: {vendorData.previousScore}</span>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
          {/* CSR Performance Chart */}
          <div className="lg:col-span-4 bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">CSR Performance by Category</h2>
              </div>
              <div className="relative h-80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full flex flex-col">
                    {csrMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <div className="w-24 md:w-32 text-sm text-gray-600">{metric.name}</div>
                        <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full flex items-center justify-end px-3 text-xs text-white font-medium"
                            style={{ 
                              width: `${metric.value}%`, 
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          >
                            {metric.value}
                          </div>
                        </div>
                        <div className="ml-3 flex items-center">
                          {metric.trend > 0 ? (
                            <span className="text-xs text-green-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                              </svg>
                              {metric.trend}%
                            </span>
                          ) : (
                            <span className="text-xs text-red-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                              </svg>
                              {Math.abs(metric.trend)}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Compliance Status Chart */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">Compliance Status</h2>
              </div>
              <div className="relative h-80">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* Donut chart */}
                  <div className="relative h-48 w-48">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <circle 
                        cx="18" cy="18" r="15.91549430918954" 
                        fill="none" 
                        stroke="#f3f4f6" 
                        strokeWidth="3"
                      ></circle>
                      
                      {complianceStatus.map((status, index) => {
                        const prevOffsets = complianceStatus
                          .slice(0, index)
                          .reduce((acc, curr) => acc + curr.value, 0);
                        
                        const offset = (prevOffsets / vendorData.totalVendors) * 100;
                        const percent = (status.value / vendorData.totalVendors) * 100;
                        
                        return (
                          <circle 
                            key={index}
                            cx="18" cy="18" r="15.91549430918954" 
                            fill="none" 
                            stroke={status.color}
                            strokeWidth="3"
                            strokeDasharray={`${percent} ${100 - percent}`}
                            strokeDashoffset={`${100 - offset}`}
                            strokeLinecap="round"
                          ></circle>
                        );
                      })}
                      
                      <text x="18" y="17" textAnchor="middle" fontSize="0.5em" fill="#6B7280">Total</text>
                      <text x="18" y="21" textAnchor="middle" fontSize="0.7em" fontWeight="bold" fill="#1F2937">{vendorData.totalVendors}</text>
                    </svg>
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-1 gap-2 mt-6">
                    {complianceStatus.map((status, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: status.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{status.status}</span>
                        <span className="text-sm font-medium text-gray-800 ml-auto">
                          {status.value} ({Math.round((status.value / vendorData.totalVendors) * 100)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Vendors Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Top Performing Vendors</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CSR Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category Strength
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{vendor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-medium ${getColorByScore(vendor.score)}`}>
                          {vendor.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                        {vendor.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {vendor.trend === 'up' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                      ) : vendor.trend === 'down' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-gray-400 mx-auto">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Risk Alerts Section */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Risk Alerts</h2>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                      <svg className="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Compliance Issue: EqualWork Co.</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Labor policy documentation expired 3 days ago. Vendor has been notified but no response has been received.</p>
                    </div>
                    <div className="mt-3 flex">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none">
                        Follow up
                      </button>
                      <button className="ml-3 inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100">
                      <svg className="h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Warning: Transparent Ltd.</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <p>Governance score has dropped by 5.2% in the last month. Audit might be required.</p>
                    </div>
                    <div className="mt-3 flex">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none">
                        Schedule audit
                      </button>
                      <button className="ml-3 inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance Section */}
        <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">Historical CSR Performance</h2>
              </div>
              <div>
                <select
                  className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="average"
                >
                  <option value="average">Average Score</option>
                  <option value="environmental">Environmental</option>
                  <option value="social">Social</option>
                  <option value="governance">Governance</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="relative h-72">
              {/* Simple SVG chart representation */}
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <g transform="translate(40,20)">
                  {/* X-axis */}
                  <line x1="0" y1="250" x2="700" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                  {/* Y-axis */}
                  <line x1="0" y1="0" x2="0" y2="250" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Chart labels */}
                  <text x="-30" y="10" className="text-xs" fill="#6b7280">100</text>
                  <text x="-30" y="70" className="text-xs" fill="#6b7280">80</text>
                  <text x="-30" y="130" className="text-xs" fill="#6b7280">60</text>
                  <text x="-30" y="190" className="text-xs" fill="#6b7280">40</text>
                  <text x="-30" y="250" className="text-xs" fill="#6b7280">20</text>
                  
                  <text x="0" y="270" className="text-xs" fill="#6b7280">Q1 2024</text>
                  <text x="120" y="270" className="text-xs" fill="#6b7280">Q2 2024</text>
                  <text x="240" y="270" className="text-xs" fill="#6b7280">Q3 2024</text>
                  <text x="360" y="270" className="text-xs" fill="#6b7280">Q4 2024</text>
                  <text x="480" y="270" className="text-xs" fill="#6b7280">Q1 2025</text>
                  <text x="600" y="270" className="text-xs" fill="#6b7280">Q2 2025</text>
                  
                  {/* Line chart */}
                  <path 
                    d="M0,100 L120,120 L240,90 L360,70 L480,50 L600,60" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="3"
                  />
                  
                  {/* Data points */}
                  <circle cx="0" cy="100" r="4" fill="#3b82f6" />
                  <circle cx="120" cy="120" r="4" fill="#3b82f6" />
                  <circle cx="240" cy="90" r="4" fill="#3b82f6" />
                  <circle cx="360" cy="70" r="4" fill="#3b82f6" />
                  <circle cx="480" cy="50" r="4" fill="#3b82f6" />
                  <circle cx="600" cy="60" r="4" fill="#3b82f6" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Action Items and Recommendations */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action Items */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">Pending Actions</h2>
              </div>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Review updated environmental policy from GreenTech Solutions</p>
                      <p className="text-xs text-gray-500 mt-1">Due: Apr 15, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        High Priority
                      </span>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Schedule quarterly review with FairSource Inc.</p>
                      <p className="text-xs text-gray-500 mt-1">Due: Apr 20, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Medium Priority
                      </span>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Follow up on missing labor documentation from EqualWork Co.</p>
                      <p className="text-xs text-gray-500 mt-1">Due: Apr 12, 2025</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Urgent
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-lg font-semibold text-gray-800">Recommendations</h2>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Enhance Environmental Reporting</h3>
                  <p className="mt-1 text-sm text-gray-500">Consider implementing enhanced carbon footprint reporting with the top 10 vendors. Current environmental metrics show room for improvement.</p>
                  <div className="mt-3">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none">
                      Create Initiative
                    </button>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Vendor ESG Workshop</h3>
                  <p className="mt-1 text-sm text-gray-500">Schedule a workshop for vendors with scores below 80 to improve their understanding of ESG requirements and reporting.</p>
                  <div className="mt-3">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none">
                      Plan Workshop
                    </button>
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">Recognition Program</h3>
                  <p className="mt-1 text-sm text-gray-500">Implement a quarterly recognition program for vendors showing exceptional CSR performance to incentivize improvement.</p>
                  <div className="mt-3">
                    <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none">
                      Design Program
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with Export & Settings */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Report
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Dashboard Settings
            </button>
          </div>
          <div>
            <span className="text-xs text-gray-500">Last updated: April 11, 2025, 09:23 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
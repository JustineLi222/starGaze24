import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

const binData = {
  occupiedSpace: 70,
  totalCapacity: '100L',
  currentWeight: '45kg',
  wasteTypes: [
    { type: 'Plastic', value: 45, color: '#2196f3', id: 0 },
    { type: 'Paper', value: 25, color: '#4caf50', id: 1 },
    { type: 'Metal', value: 15, color: '#ff9800', id: 2 },
    { type: 'Other', value: 15, color: '#9e9e9e', id: 3 },
  ],
  weeklyData: [
    { day: 'Mon', weight: 30 },
    { day: 'Tue', weight: 45 },
    { day: 'Wed', weight: 35 },
    { day: 'Thu', weight: 50 },
    { day: 'Fri', weight: 40 },
    { day: 'Sat', weight: 25 },
    { day: 'Sun', weight: 20 },
  ]
};

const BinVisual = ({ percentage }) => {
  const fillHeight = `${percentage}%`;

  return (
    <Box sx={{ position: 'relative', width: '200px', height: '300px', margin: 'auto' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          border: '4px solid #333',
          borderRadius: '10px 10px 4px 4px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: fillHeight,
            backgroundColor: '#2196f3',
            transition: 'height 1s ease-in-out',
          }}
        />

        <Typography
          variant="h3"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: percentage > 50 ? 'white' : '#333',
            zIndex: 1,
            fontWeight: 'bold',
          }}
        >
          {percentage}%
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: -10,
          width: 'calc(100% + 20px)',
          height: '30px',
          backgroundColor: '#333',
          borderRadius: '6px 6px 0 0',
          transform: 'rotate(-2deg)',
        }}
      />
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
      <Box sx={{
        width: '100%',
        mb: 4  // Add margin bottom for spacing
      }}>
        <Typography
          variant="h2"  // Changed from h1 to h2 for better proportions
          sx={{
            fontWeight: 'bold',
            color: '#1a237e',  // Added a color that matches the theme
            pb: 2  // Add padding bottom
          }}
        >
          Dashboard
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Rest of your code remains the same */}
        {/* Left Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Bin Status
            </Typography>
            <BinVisual percentage={binData.occupiedSpace} />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="h6">
                Current Weight: {binData.currentWeight}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Middle Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Waste Types
            </Typography>
            <PieChart
              series={[{
                data: binData.wasteTypes,
                innerRadius: 30,
                paddingAngle: 2,
                cornerRadius: 5,
              }]}
              height={300}
            />
          </Card>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Weekly Trend
            </Typography>
            <BarChart
              xAxis={[{
                scaleType: 'band',
                data: binData.weeklyData.map(item => item.day),
              }]}
              series={[{
                data: binData.weeklyData.map(item => item.weight),
                color: '#2196f3',
              }]}
              height={300}
            />
          </Card>
        </Grid>

        {/* Bottom Stats */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="h6" color="text.secondary">
                  Daily Average
                </Typography>
                <Typography variant="h4">35kg</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="text.secondary">
                  Peak Day
                </Typography>
                <Typography variant="h4">Thu</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="text.secondary">
                  Collection Due
                </Typography>
                <Typography variant="h4">2 Days</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" color="text.secondary">
                  Monthly Total
                </Typography>
                <Typography variant="h4">245kg</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
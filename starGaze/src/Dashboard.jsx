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
  bins: [
    {
      id: 1,
      name: 'Plastic Waste Bin',
      occupiedSpace: 70,
      totalCapacity: 100,
      currentWeight: 45,
    },
    {
      id: 2,
      name: 'Metal Waste Bin',
      occupiedSpace: 50,
      totalCapacity: 100,
      currentWeight: 35,
    },
    {
      id: 3,
      name: 'General Waste Bin',
      occupiedSpace: 60,
      totalCapacity: 100,
      currentWeight: 40,
    }
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
const totalWeight = binData.bins.reduce((acc, bin) => acc + bin.currentWeight, 0)

const wasteTypesData = [
  { type: 'Plastic', value: binData.bins[0].currentWeight / totalWeight * 100 },
  { type: 'Metal', value: binData.bins[1].currentWeight / totalWeight * 100 },
  { type: 'General', value: binData.bins[2].currentWeight / totalWeight * 100 },
]

const BinVisual = ({ percentage, name }) => {
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
            backgroundColor: percentage > 70 ? '#f44336' : '#2196f3',
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

      <Typography
        variant="subtitle1"
        sx={{
          textAlign: 'center',
          mt: 3,
          fontWeight: 'bold'
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
      <Box sx={{
        width: '100%',
        mb: 4
      }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#1a237e',
            pb: 2
          }}
        >
          Waste Management Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Bin Visualizations */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Bin Occupancy
            </Typography>
            <Grid container spacing={3}>
              {binData.bins.map((bin) => (
                <Grid item xs={12} md={4} key={bin.id}>
                  <BinVisual
                    percentage={bin.occupiedSpace}
                    name={bin.name}
                  />
                  <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="subtitle1">
                      Current Weight: {bin.currentWeight}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Waste Types Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3}}>
            <Typography variant="h5" gutterBottom>
              Waste Types Breakdown
            </Typography>
            <Grid container spacing={3} justifyContent="center" style={{ flexGrow: 1 }}>
              <Grid item>
                <PieChart
                  series={[{
                    data: wasteTypesData,
                    innerRadius: 30,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    arcLabel: (item) => `${item.type} (${Math.round(item.value)}%)`,
                    arcLabelMinAngle: 20,
                  }]}
                  height={300}
                  width={300}  // Ensure the width is set for better centering
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>



        {/* Weekly Trend Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '400px' }}>
            <Typography variant="h5" gutterBottom>
              Weekly Waste Collection Trend
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
import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  LinearProgress,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

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
  ],
  predictedData: [
  { day: 'Mon', plastic: 20, metal: 15, general: 10 },
  { day: 'Tue', plastic: 25, metal: 20, general: 15 },
  { day: 'Wed', plastic: 30, metal: 25, general: 20 },
  { day: 'Thu', plastic: 35, metal: 30, general: 25 },
  { day: 'Fri', plastic: 40, metal: 35, general: 30 },
  { day: 'Sat', plastic: 45, metal: 40, general: 35 },
  { day: 'Sun', plastic: 50, metal: 45, general: 40 },
  ]
  };
  
  const totalWeight = binData.bins.reduce((acc, bin) => acc + bin.currentWeight, 0);
  
  const wasteTypesData = [
  { type: 'Plastic', value: (binData.bins[0].currentWeight / totalWeight) * 100 },
  { type: 'Metal', value: (binData.bins[1].currentWeight / totalWeight) * 100 },
  { type: 'General', value: (binData.bins[2].currentWeight / totalWeight) * 100 },
  ];

const BinVisual = ({ percentage, name }) => {
  const fillHeight = `${percentage}%`;

  return (
    <Box sx={{ position: 'relative', width: { xs: '150px', sm: '200px' }, height: '300px', margin: 'auto' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%', border: '4px solid #333', borderRadius: '10px 10px 4px 4px', overflow: 'hidden', bgcolor: '#e0e0e0' }}>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%', height: fillHeight, backgroundColor: percentage > 70 ? '#f44336' : '#2196f3', transition: 'height 1s ease-in-out' }} />
        <Typography variant="h3" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: percentage > 50 ? 'white' : '#333', zIndex: 1, fontWeight: 'bold' }}>
          {percentage}%
        </Typography>
      </Box>

      <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 2, fontWeight: 'bold' }}>
        {name}
      </Typography>
    </Box>
  );
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
      <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1a237e', pb: 2, textAlign: 'center' }}>
        Inflight Waste Categorization and Monitoring System
      </Typography>

      <Grid container spacing={3}>
        {/* Bin Visualizations */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, bgcolor: '#ffffff', boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Bin Occupancy
            </Typography>
            <Grid container spacing={3}>
              {binData.bins.map((bin) => (
                <Grid item xs={12} md={4} key={bin.id}>
                  <BinVisual percentage={bin.occupiedSpace} name={bin.name} />
                  <Typography variant="subtitle1" sx={{ textAlign: 'center', mt: 1 }}>
                    Current Weight: {bin.currentWeight} kg
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Waste Types Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, bgcolor: '#ffffff', boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Waste Types Breakdown
            </Typography>
            <Grid container justifyContent="center">
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
                  width={300}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Waste Generation Prediction Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '400px', bgcolor: '#ffffff', boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom>
              Waste Generation Prediction
            </Typography>
            <LineChart
              xAxis={[{ scaleType: 'band', data: binData.predictedData.map(item => item.day) }]}
              series={[
                { label: 'Plastic', data: binData.predictedData.map(item => item.plastic), color: '#2196f3' },
                { label: 'Metal', data: binData.predictedData.map(item => item.metal), color: '#ff9800' },
                { label: 'General', data: binData.predictedData.map(item => item.general), color: '#4caf50' },
              ]}
              height={300}
            />
          </Card>
        </Grid>

        {/* Bottom Stats */}
        <Grid item xs={12}>
          <Card sx={{ p: 3, bgcolor: '#ffffff', boxShadow: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6" color="text.secondary">
                  Flight Number
                </Typography>
                <Typography variant="h4">FL1234</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" color="text.secondary">
                  Flight Progress
                </Typography>
                <Box sx={{ width: '100%', mt: 1 }}>
                  <LinearProgress variant="determinate" value={75} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption">0h 0m</Typography>
                    <Typography variant="caption">2h 30m</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" color="text.secondary">
                  Current Flight Duration
                </Typography>
                <Typography variant="h4">1h 30m</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
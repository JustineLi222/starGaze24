import React, {useEffect, useState} from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';




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
  const [compressingAlert, setCompressingAlert] = useState([false, null]);
  const [compressingFailAlert, setCompressingFailAlert] = useState([false, null]);
  const [bins, setBins] = useState([
    {
      id: 1,
      name: 'Plastic Waste Bin',
      occupiedSpace: 70,
      currentWeight: 45,
      },
      {
      id: 2,
      name: 'Metal Waste Bin',
      occupiedSpace: 30,
      currentWeight: 35,
      },
      {
      id: 3,
      name: 'General Waste Bin',
      occupiedSpace: 60,
      currentWeight: 40,
      }
  ]);
  
  const [predictedData, setPredictedData] = useState([
    { day: "Mon", plastic: 28, metal: 35, general: 14 },
    { day: "Tue", plastic: 49, metal: 16, general: 27 },
    { day: "Wed", plastic: 13, metal: 42, general: 30 },
    { day: "Thu", plastic: 34, metal: 20, general: 39 },
    { day: "Fri", plastic: 41, metal: 10, general: 45 },
    { day: "Sat", plastic: 23, metal: 31, general: 20 },
    { day: "Sun", plastic: 50, metal: 28, general: 19 }
  ]
  )
  
  const [totalWeight, setTotalWeight] = useState(bins.reduce((acc, bin) => acc + bin.currentWeight, 0))
  
  const [wasteTypesData, setWasteTypesData] = useState([
    { type: 'Plastic', value: (bins[0].currentWeight / totalWeight) * 100 },
    { type: 'Metal', value: (bins[1].currentWeight / totalWeight) * 100 },
    { type: 'General', value: (bins[2].currentWeight / totalWeight) * 100 },
    ]);

  const checkOccupancy = () => {
    console.log("checking occupancy")
    bins.forEach(bin => {
      if (bin.occupiedSpace >= 70) {
        setCompressingAlert([true, bin.name]);
        console.log(`The ${bin.name} is almost full. Starting compressing...`)
        setTimeout(() => {  }, 1000)
        const compressionSuccess = true;
        if (compressionSuccess) {
        setBins(bins.map(b => b.id === bin.id ? { ...b, occupiedSpace: b.occupiedSpace - 30 } : b))
        } else {
        console.log("Compression failed")
        setCompressingFailAlert([true, bin.name]);
        }
      } 
  })};
  
  
    useEffect(() => {
      setWasteTypesData([
        { type: 'Plastic', value: (bins[0].currentWeight / totalWeight) * 100 },
        { type: 'Metal', value: (bins[1].currentWeight / totalWeight) * 100 },
        { type: 'General', value: (bins[2].currentWeight / totalWeight) * 100 },
        ])
      checkOccupancy();
    }, [ ,bins])
  
  return (
    <Box sx={{ p: 3, bgcolor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
      {compressingAlert[0] && <Alert severity="warning" onClose={() => setCompressingAlert([false, null])}>The {compressingAlert[1]} is almost full. Starting compressing...</Alert>}
      {compressingFailAlert[0] && <Alert severity="error" onClose={() => setCompressingFailAlert([false, null])}>The {compressingFailAlert[1]} cannot be further compressed. Please change the bin before its full.</Alert>}
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
              {bins.map((bin) => (
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
              xAxis={[{ scaleType: 'band', data: predictedData.map(item => item.day) }]}
              series={[
                { label: 'Plastic', data: predictedData.map(item => item.plastic), color: '#2196f3' },
                { label: 'Metal', data: predictedData.map(item => item.metal), color: '#ff9800' },
                { label: 'General', data: predictedData.map(item => item.general), color: '#4caf50' },
              ]}
              yAxis={[ { min: 0,  }, ]}
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
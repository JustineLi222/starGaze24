import React, { useRef, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/cloud-platform',
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleLogin = async () => {
    const auth = gapi.auth2.getAuthInstance();
    await auth.signIn();
    const token = auth.currentUser.get().getAuthResponse().access_token;
    setAccessToken(token);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    sendImageToEndpoint(imageData);
  };

  const sendImageToEndpoint = async (imageData) => {
    const jsonData = {
      instances: [{
        content: imageData.split(',')[1], // Base64 part
      }],
      parameters: {
        confidenceThreshold: 0.5,
        maxPredictions: 5,
      },
    };

    try {
      const response = await axios.post(
        `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_ENDPOINT_ID:predict`,
        jsonData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Prediction Response:', response.data);
    } catch (error) {
      console.error('Error sending image to endpoint:', error);
    }
  };

  return (
    <div>
      <h1>Capture Image</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <div>
        <video ref={videoRef} autoPlay style={{ width: '100%' }} />
        <button onClick={captureImage}>Capture Image</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
};

export default Webcam;
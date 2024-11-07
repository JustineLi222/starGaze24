import React, { useRef, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import WebcamCapture from './WebcamCapture';

const Webcam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [accessToken, setAccessToken] = useState('');
  const [array, setArray] = useState([]);

 

  const fetchAPI = async (imgData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/webcam', {
        // Include any data you need to send in the body here
        data: {
          imageData: imgData,
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      setArray(response.data[0].displayNames);
      console.log(response.data[0].displayNames);
    } catch (error) {
      console.error('Error making the API request:', error);
    }
  };
  const handleCapture = (imageData) => {
    fetchAPI(imageData);
  };


  useEffect(() => {

    
  })

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: '580115535219-g6di49u4nh73pf6pq9s60o96dj5riler.apps.googleusercontent.com',
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
    // fetchAPI();
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
        `https://us-central1-aiplatform.googleapis.com/v1/projects/580115535219/locations/us-central1/endpoints/1722821471027331072:predict`,
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
      <h1>Image Classification</h1>
      <WebcamCapture onCapture={handleCapture} />
        <div>
          <h2>Predictions:</h2>
          <h2>{array[0]}</h2>
        </div>
    </div>
  );
};

export default Webcam;
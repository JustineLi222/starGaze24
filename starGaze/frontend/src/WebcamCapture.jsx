// src/WebcamCapture.js
import { useRef, useState } from 'react';

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageDataUrl);
    onCapture(imageDataUrl); // Pass the captured image back to the parent
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {capturedImage && <img src={capturedImage} alt="Captured" />}
    </div>
  );
};

export default WebcamCapture;
from flask import Flask, request, jsonify
from flask_cors import CORS
from calling_endpoint import predict_image_classification_sample
import base64
import os

app = Flask(__name__)
CORS = CORS(app, origins='*')

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER): os.makedirs(UPLOAD_FOLDER)


# # [END aiplatform_predict_image_classification_sample]
# predict_image_classification_sample(
#     project="580115535219",
#     endpoint_id="1722821471027331072",
#     location="us-central1",
#     filename="captured_image.jpg"
# )

@app.route('/api/webcam', methods=['POST'])
def webcam_api(): 
    request_data = request.get_json()
    print(request_data)
    image_data = request_data['data']['imageData']
    image_data = image_data.split(",")[1] # Remove the data URL prefix
    image_bytes = base64.b64decode(image_data)
    file_path = os.path.join(UPLOAD_FOLDER, 'captured_image.jpg')
    with open(file_path, 'wb') as f:
        f.write(image_bytes)
    print("file saved")
    print("webcam_api")
    data = predict_image_classification_sample(
            project="580115535219",
            endpoint_id="1722821471027331072",
            location="us-central1",
            filename="./uploads/captured_image.jpg"
        )
    # Retrieve JSON data from request 
    # Process the data 
    print("model response")
    predictions = data['predictions']  # Access the predictions key
    print(type(predictions))
    print(predictions)
    # response = {'message': 'Data received', 'data': data} 
    return jsonify(predictions)

    
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)
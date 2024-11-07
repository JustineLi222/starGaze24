import cv2
from flask import jsonify
from google.protobuf.json_format import MessageToDict
# cap = cv2.VideoCapture(0)

# if not cap.isOpened():
#     print("Error: Could not open webcam.")
#     exit()

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         print("Error: Could not read frame.")
#         break

#     cv2.imshow('Webcam Feed', frame)

#     # Wait for the user to press the 'c' key to capture an image or 'q' to quit
#     key = cv2.waitKey(1)
#     if key == ord('c'):
#         cv2.imwrite('captured_image.jpg', frame)
#         print("Image captured and saved as 'captured_image.jpg'")
#     elif key == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START aiplatform_predict_image_classification_sample]
import base64

from google.cloud import aiplatform
from google.cloud.aiplatform.gapic.schema import predict


def predict_image_classification_sample(
    project: str,
    endpoint_id: str,
    filename: str,
    location: str = "us-central1",
    api_endpoint: str = "us-central1-aiplatform.googleapis.com",
):
    print("starting predict image classification sample...")
    # The AI Platform services require regional API endpoints.
    client_options = {"api_endpoint": api_endpoint}
    # Initialize client that will be used to create and send requests.
    # This client only needs to be created once, and can be reused for multiple requests.
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    with open(filename, "rb") as f:
        file_content = f.read()

    # The format of each instance should conform to the deployed model's prediction input schema.
    encoded_content = base64.b64encode(file_content).decode("utf-8")
    instance = predict.instance.ImageClassificationPredictionInstance(
        content=encoded_content,
    ).to_value()
    instances = [instance]
    # See gs://google-cloud-aiplatform/schema/predict/params/image_classification_1.0.0.yaml for the format of the parameters.
    parameters = predict.params.ImageClassificationPredictionParams(
        confidence_threshold=0.5,
        max_predictions=5,
    ).to_value()
    endpoint = client.endpoint_path(
        project=project, location=location, endpoint=endpoint_id
    )
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )
    response = MessageToDict(response._pb)
    print("messagetodict response",response)
    print("type of response",type(response))
    # See gs://google-cloud-aiplatform/schema/predict/prediction/image_classification_1.0.0.yaml for the format of the predictions.
    # predictions = response.predictions
    # print("predictions",predictions)
    # json_predictions = MessageToDict(response)
    # print("json_predictions_type",type(json_predictions))
    # print("json_predictions",json_predictions)
    # print("json_predictions.predictions",json_predictions.predictions)

    # return {"predictions": json_predictions}
     # Process the predictions using json_format

    
    return response
    # Return a serializable dictionary



# # [END aiplatform_predict_image_classification_sample]
# predict_image_classification_sample(
#     project="580115535219",
#     endpoint_id="1722821471027331072",
#     location="us-central1",
#     filename="captured_image.jpg"
# )
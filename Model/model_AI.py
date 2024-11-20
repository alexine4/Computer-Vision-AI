import cv2
import numpy as np

progPath = 'C:/Users/andro/Documents/GitHub/Computer-Vision-AI'

# image pick
img = cv2.imread(progPath+'/Model/training_data/doctors/1.jpg')
img = cv2.resize(img, (500, 500))
cv2.imshow('Result', img)
kernel = np.ones()
print(img.shape)
cv2.waitKey(0)

#video pick

## resourses

#file
#cap = cv2.VideoCapture(progPath + '/Model/training_data/police/policer.mp4')

#webcamera
#cap = cv2.VideoCapture(0)

# while True:
#     success, video =  cap.read()
#     cv2.imshow('Result', video)
    
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break
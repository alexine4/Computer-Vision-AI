import cv2

progPath = 'C:/Users/andro/Documents/GitHub/Computer-Vision-AI'
img = cv2.imread(progPath+'/Model/training_data/doctors/1.jpg')

cv2.imshow('Result', img)
cv2.waitKey(0)
import cv2
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

image = cv2.imread(r"C:\img\beautiful-face-young-woman-clean-260nw-149962697.webp")
if image is None:
    print("Error: Image not loaded.check the file path")
else:
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


faces  = face_cascade.detectMultiScale(gray_image,scaleFactor=1.1, minNeighbors=5, minSize=(30,30))


if len(faces) == 0:
    print("no faces found.")
    
for (x,y,w,h) in faces:
    cv2.rectangle(image,(x, y), (x+w, y+h), (255,0, 0),2)
    
new_width = 800  # Specify the desired width
new_height = 600  # Specify the desired height
resized_image = cv2.resize(image, (new_width, new_height))    

    
cv2.imshow('detected faces', image)
cv2.waitKey(0)
cv2.destroyALLWindows()    
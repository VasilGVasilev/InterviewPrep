import cv2
import numpy as np
# TOTO does not work at all
def is_image_too_dim_or_bright(image_path, dim_threshold=60, bright_threshold=190):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    average_brightness = np.mean(gray)
    
    if average_brightness < dim_threshold:
        return True, 'Too Dim'
    elif average_brightness > bright_threshold:
        return True, 'Too Bright'
    else:
        return False, 'Brightness OK'

def is_image_blurry(image_path, blur_threshold=-1100000):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Adjusted Gaussian Blur
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)  # Increased kernel size
    
    # Apply Laplacian operator with a larger kernel size
    laplacian = cv2.Laplacian(blurred, cv2.CV_64F, ksize=5)
    variance_of_laplacian = laplacian.var()
    
    if variance_of_laplacian < blur_threshold:
        return True, 'Blurry'
    else:
        return False, 'Not Blurry'

def filter_low_quality_images(image_path):
    dim_or_bright, brightness_status = is_image_too_dim_or_bright(image_path)
    blurry, blur_status = is_image_blurry(image_path)
    
    if dim_or_bright or blurry:
        print(f"Image {image_path} is filtered out due to: {brightness_status}, {blur_status}")
        return False
    else:
        print(f"Image {image_path} passed the quality check.")
        return True
    
# Main execution block
if __name__ == "__main__":
    image_path = "red-flower-blurred.png"  # Specify the path to your image
    filter_low_quality_images(image_path)
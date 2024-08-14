### Why use base64? 

Usually, necessary for images that need to be transferred. It increases the size of the image by 33% but if you are to transfer the image over the internet, better use base64 **(The official spec (RFC4648) says that base64 "is used to store or transfer data in environments that, perhaps for legacy reasons, are restricted to ASCII data".)**

### Formatting for RN <Image>

Without the **data:image/png;base64**, prefix, the Image component in React Native will not be able to interpret the Base64-encoded string as an image. This prefix is essential because it tells the Image component the type of data it is dealing with and how to decode it.
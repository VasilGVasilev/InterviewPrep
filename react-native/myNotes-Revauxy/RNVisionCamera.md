### Preview of photo
There is a special mode [link](https://react-native-vision-camera.com/docs/guides/preview)

Disabling isActive

The isActive prop in the Camera component controls whether the camera feed is active or not, and this, in turn, indirectly controls whether the camera preview or the photo review UI is shown.

### Orientation is tricky

```js
const photo = await cameraRef.current.takePhoto(photoOptions);

```

sometimes ios may return dubious data as to the orientation, viewing landscape-right as default instead of portrait which shift the logic of Orientation EXIF tag, which can have values like:
1: Normal (Up)
3: 180° rotated (Down)
6: 90° rotated (Right)
8: 270° rotated (Left)


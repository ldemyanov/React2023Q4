export const defaultImage = "https://fakeimg.pl/250x250/?text=Photo&font=lobster";

export const convertImageToBase64 = (blobImage: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      resolve(fileReader.result);
    }

    fileReader.onerror = (error) => {
      reject(error);
    };

    fileReader.readAsDataURL(blobImage);
  })
}
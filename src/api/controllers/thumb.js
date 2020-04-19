import Jimp from 'jimp';

/**
   * resizeImage
   * @param  {string} imageUrl image location
   */

export default function resizeImage (imageUrl) {
    Jimp.read(imageUrl)
        .then(image => {
            imageUrl = imageUrl.replace('.jpg', '');
            return image
                    .resize(50, 50) // resize 50x50p
                    .write(`${imageUrl}-50x50p.jpg`);
        
        })
        .catch(err => {
        
        });
}

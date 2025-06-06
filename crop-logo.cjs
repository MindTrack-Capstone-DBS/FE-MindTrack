const fs = require('fs');
const { PNG } = require('pngjs');
const sharp = require('sharp');

const inputPath = './src/assets/images/Logo.png';
const outputPath = './src/assets/images/Logo-cropped.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function () {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        if (this.data[idx + 3] > 0) { // alpha > 0
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }
    }
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    sharp(inputPath)
      .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
      .toFile(outputPath)
      .then(() => {
        console.log('Logo berhasil di-crop dan disimpan sebagai Logo-cropped.png');
      })
      .catch(err => {
        console.error('Gagal crop:', err);
      });
  }); 
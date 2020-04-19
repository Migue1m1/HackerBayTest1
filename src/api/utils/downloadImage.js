import fs from 'fs';
import request from 'request';

/**
   * downloadImage
   * @param  {string} uri image url
   * @param  {string} filename Image name
   * @param  {callback} callback Function Called when finish download
   */

function downloadImage (uri, filename, callback){
    request.head(uri, function(err, res, body){    
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };

export default downloadImage;
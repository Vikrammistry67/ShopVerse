import Imagekit from 'imagekit';
import _config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';

export const client = new Imagekit({
    privateKey: _config.IMAGEKIT_PRIVATE_KEY,
    publicKey: _config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: _config.IMAGEKIT_URL_ENDPOINTS
});


export const uplaodImage = async ({ buffer, filename, folder = '/shopVerseProductImages' }) => {
    try {
        const res = await client.upload({
            file: buffer.toString('base64'),
            fileName: uuidv4(),
            folder,
        });
        return {
            url: res.url,
            thumbnail: res.thumbnailUrl || res.url,
            id: res.fileId,
        };

    } catch (error) {
        new Error(`failed to upload Images : ${error}`);
    };
};
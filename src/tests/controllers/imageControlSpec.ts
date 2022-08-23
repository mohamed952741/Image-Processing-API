import path from 'path';
import imageControl from '../../controllers/imageControl';

const filePathOriginalImage = path.resolve(__dirname, '../../../images/original/santamonica.jpg');
const filePathThumbnailImage = path.resolve(__dirname, '../../../images/thumbnail/santamonica.jpg');

describe('The imageResizer function', (): void => {
    it('returns a buffer after sucessfully resizing an image', async () => {
        const imageBuffer: Buffer = await imageControl.resizeImage({
            height: 200,
            width: 250,
            filePathOriginalImage,
            filePathThumbnailImage,
        });
        expect(imageBuffer).toBeInstanceOf(Buffer);
    });

    it('rejects promise if something went wrong', async (): Promise<void> => {
        await expectAsync(
          imageControl.resizeImage({
                height: 200,
                width: 250,
                filePathOriginalImage: '',
                filePathThumbnailImage,
            }),
        ).toBeRejected();
    });
});

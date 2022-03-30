
import request from 'supertest';
import App from '@/app';
import FileRoute from '@routes/file.route';
import FileService from '../services/file.service';

afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing File', () => {
    describe('[GET] /presignedUrl', () => {
        const spiedGetPresignedUrl = jest.spyOn(FileService.prototype, 'getPresignedUrl');
        beforeEach(() => {
            spiedGetPresignedUrl.mockClear();
        });
        it('should_return_presigned_url_response_using_spy', () => {
            const testingData = {
                fileKey: 'fileKey',
                uploadUrl: 'https://presigned.test.com/fileKey',
                url: 'https://result.test.com/fileKey'
            };
            spiedGetPresignedUrl.mockResolvedValue(testingData);
            const fileRoute = new FileRoute();

            const app = new App([fileRoute]);
            const path = `${fileRoute.path}/presigned-url?contentType=application%2Fjson%3B%20charset%3Dutf-8`;
            return request(app.getServer()).get(path).expect(testingData).expect(200);
        });

        it('should_return_400_error_response_using_spy', () => {

            spiedGetPresignedUrl.mockResolvedValue({} as any);
            const fileRoute = new FileRoute();

            const app = new App([fileRoute]);
            const path = `${fileRoute.path}/presigned-url`;
            return request(app.getServer()).get(path).expect(400);
        });

        it('should_return_500_error_response_using_spy', () => {

            spiedGetPresignedUrl.mockRejectedValue(new Error('error thrown by fileService.getPresignedUrl'));
            const fileRoute = new FileRoute();

            const app = new App([fileRoute]);
            const path = `${fileRoute.path}/presigned-url?contentType=application%2Fjson%3B%20charset%3Dutf-8`;
            return request(app.getServer()).get(path).expect(500);
        });
    });


});

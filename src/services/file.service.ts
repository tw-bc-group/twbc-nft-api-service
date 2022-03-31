import { v4 as uuid } from "uuid";
import mime from "mime-types";
import S3 from "aws-sdk/clients/s3";
import { PresignedUrl } from '@/interfaces/file.interface';

const URL_EXPIRATION_SECONDS = 300;
const BUCKET_NAME = 'twbc-nft-images';
const DOMAIN_NAME = 'twbc-nft-images.s3.cn-northwest-1.amazonaws.com.cn';
const REGION = 'cn-northwest-1';

class FileService {

  public async getPresignedUrl(contentType: string): Promise<PresignedUrl> {

    const s3 = new S3({ region: REGION });
    const fileKey = `${uuid()}.${mime.extension(contentType)}`;

    const uploadUrl = await s3.getSignedUrlPromise("putObject", {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
      Expires: URL_EXPIRATION_SECONDS,
      ACL: "public-read",
    });
    const url = `https://${DOMAIN_NAME}/${fileKey}`;
    return {
      fileName: fileKey,
      uploadUrl,
      url,
    };
  };
}

export default FileService;

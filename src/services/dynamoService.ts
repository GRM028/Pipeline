import dynamodb from 'dynamodb';
import {AWS_REGION, AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_SESSION_TOKEN} from '../config';

dynamodb.AWS.config.update({
    accessKeyID:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_ACCESS_KEY,
    //unicamente al usar AWS Academy
    awsSessionToken:AWS_SESSION_TOKEN,
    awsRegion:AWS_REGION
});

export default dynamodb;
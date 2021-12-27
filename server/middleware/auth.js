import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedData = jwt.verify(token, Buffer.from(process.env.USERFRONT_JWT_PUBLIC_KEY, 'base64'), { algorithms: ["RS256"] });

        req.userId = decodedData?.userUuid;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;

import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token missing or invalid" });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth;

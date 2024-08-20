import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv"

dotenv.config()

const client = new OAuth2Client();

export const GoogleLogin = async (req, res) => {
    console.log(req.body)
    const token = req.body.credentials
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: `${process.env.CLIENT_ID}`,  // Specify the CLIENT_ID of the app that accesses the backend

        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        console.log(payload)

        if (payload.email_verified) {
            return res.status(200).send({
                status: 200,
                message: "Verified",
                verification_status: true
            })
        }
        return res.status(401).send("Authorization error")
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }

}
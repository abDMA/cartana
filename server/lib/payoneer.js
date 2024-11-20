import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
const PAYONEER_API_BASE_URL = process.env.PAYONEER_API_BASE_URL
const PAYONEER_CLIENT_ID = process.env.PAYONEER_CLIENT_ID
const PAYONEER_CLIENT_SECRET = process.env.CLIENT_SECRET
async function getPayoneerToken() {
    const response  = await axios.post(`${PAYONEER_API_BASE_URL}/v4/oauth2/token`,{
        grant_type: "client_credentials",
        client_id: PAYONEER_CLIENT_ID,
        client_secret: PAYONEER_CLIENT_SECRET
    })
    return response.data.access_token
}
export default getPayoneerToken
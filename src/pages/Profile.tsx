// import { useJwt } from "react-jwt";
import AuthService from "../services/auth.service"

export default function Profile() {

    const currentUser = AuthService.getCurrentUsername() as string;

    console.log("Profile");

        // const { decodedToken, isExpired } = useJwt(currentUser);

    return (
        <div>
            <h2>Profile {currentUser}</h2>


            </div>

    );
}

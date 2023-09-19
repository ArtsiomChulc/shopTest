import {useSelector} from "react-redux";
import {AppRootStateType} from "App/store";
import {userAuthType} from "App/user-reducer";

export const useAuth = () => {
    const {email, token, id} = useSelector<AppRootStateType>(state => state.user) as userAuthType

    return {
        isAuth: !!email,
        email,
        token,
        id
    }
}
import { postType } from "../../components/Card";

export const InitialStore = {
    auth: {
        user: {
            confirmPassword: '',
            email: '',
            name: '',
            password: '',
            username: '',
            _id: '',
            image: ''
        },
        posts: [] as postType[],
        loading: false
    },
}
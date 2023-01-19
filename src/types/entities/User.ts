
interface User {
    id?: number;
    username: string;
    password?: string;
    firstName: string;
    lastName: string;
    street: string;
    zip?: number;
    city: string;
    //roles as enum
    roles: string;
}

export default User;

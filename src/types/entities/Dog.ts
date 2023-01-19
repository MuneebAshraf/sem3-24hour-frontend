
//interface for dog Object
interface Dog {
    id?: number;
    name: string;
    breed: string;
    image: string;
    birthdate: string;
    gender: string;
    walks?: string[];
    owner_id?: number;
}

export default Dog;

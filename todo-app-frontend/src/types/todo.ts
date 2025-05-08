interface User {
    firstName: string;
}
export interface Todo  {
    id: number;
    header: string;
    content: string;
    isDone: boolean;
    user: User;
    userId: number;
}
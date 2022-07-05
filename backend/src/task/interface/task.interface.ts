export interface Task {
    _id: string;
    title: string;
    completed: boolean;
    user_id : string;
    start_time : Date;
}

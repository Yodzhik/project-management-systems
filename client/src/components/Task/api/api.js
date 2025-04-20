import {api} from "../../../services/api";

const urls = {
    users: '/users',
    updateTask: '/tasks/update/id',
    createTask: '/tasks/create',
    task: '/tasks/id',
}

export const getUsersApi = () => {
    return api.get(urls.users)
}

export const createTaskApi = (body) => {
    return api.post(urls.createTask, body);
}

export const updateTaskApi = (id, body) => {
    return api.put(urls.updateTask.replace('id', id), body);
}

export const getTaskApi = (id) => {
    return api.get(urls.task.replace('id', id));
}

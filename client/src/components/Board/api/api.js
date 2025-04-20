import {api} from "../../../services/api";

const urls = {
    board: '/boards/id',
    updateStatus: '/tasks/updateStatus/id',
}

export const getBoardApi = (id) => {
    return api.get(urls.board.replace('id', id))
}

export const updateTaskStatusApi = (id, body) => {
    return api.put(urls.updateStatus.replace('id', id), body)
}

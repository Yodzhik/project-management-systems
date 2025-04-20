import {api} from "../../../services/api";

const urls = {
    boards: '/boards',
}

export const getBoardsApi = () => {
    return api.get(urls.boards)
}

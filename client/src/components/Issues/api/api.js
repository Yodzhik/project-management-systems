import {api} from "../../../services/api";

const urls = {
    issues: '/tasks',
}

export const getIssuesApi = () => {
    return api.get(urls.issues)
}

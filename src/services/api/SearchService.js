import ApiService from "./ApiService";

export default class SearchService extends ApiService {
    search = (q) => {
        return this.requestWithAuth('/search?q=' + encodeURIComponent(q));
    };
}
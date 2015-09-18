/// <reference path="../../../references" />

class RemoteResource {
    requestUrl: string;
    sessionId: string;
    sessionHeaderName: string;
    urls = {
    }

    constructor(requestUrl: string, sessionHeaderName: string, sessionId?: string) {
        this.requestUrl = requestUrl;
        this.sessionHeaderName = sessionHeaderName;
        this.sessionId = sessionId;
    }

    private _getHeaders() {
        var headers = {};

        headers[this.sessionHeaderName] = this.sessionId;

        return headers;
    }

    get<T>(url: string, params?: {}): Promise<T> {
        return <Promise<T>>axios.get(this.requestUrl + url, {
            headers: this._getHeaders(),
            params: params
        }).then((response: axios.Response) => {
            return Promise.resolve(response.data);
        });
    }

    post<T>(url: string, data?: {}): Promise<T> {
        return <Promise<T>>axios.post(this.requestUrl + url, {
            headers: this._getHeaders(),
            data: data
        }).then((response: axios.Response) => {
            return Promise.resolve(response.data);
        });
    }
}

export {RemoteResource};
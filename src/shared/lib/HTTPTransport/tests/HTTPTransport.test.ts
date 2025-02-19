import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { HTTPTransport } from '../HTTPTransport';
import { METHODS } from '../methods';

interface ExtendedSinonXMLHttpRequest extends SinonFakeXMLHttpRequest {
    timeout: number;
}

describe('HTTPTransport', () => {
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    let requests: ExtendedSinonXMLHttpRequest[] = [];
    let http: HTTPTransport;

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = (request) => {
            requests.push(request as ExtendedSinonXMLHttpRequest);
        };
        http = new HTTPTransport('https://example.com');
    });

    afterEach(() => {
        xhr.restore();
    });

    it('should make GET request', (done) => {
        http.get('/test', { data: { foo: 'bar' } })
            .then(() => {
                const request = requests[0];
                expect(request.method).to.equal(METHODS.GET);
                expect(request.url).to.equal('https://example.com/test?foo=bar');
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });

    it('should make POST request with data', (done) => {
        const data = { foo: 'bar' };
        http.post('/test', { data })
            .then(() => {
                const request = requests[0];
                expect(request.method).to.equal(METHODS.POST);
                expect(request.url).to.equal('https://example.com/test');
                expect(request.requestBody).to.equal(JSON.stringify(data));
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });

    it('should make PUT request', (done) => {
        const data = { foo: 'bar' };
        http.put('/test', { data })
            .then(() => {
                const request = requests[0];
                expect(request.method).to.equal(METHODS.PUT);
                expect(request.url).to.equal('https://example.com/test');
                expect(request.requestBody).to.equal(JSON.stringify(data));
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });

    it('should make DELETE request', (done) => {
        http.delete('/test')
            .then(() => {
                const request = requests[0];
                expect(request.method).to.equal(METHODS.DELETE);
                expect(request.url).to.equal('https://example.com/test');
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });

    it('should handle network errors', (done) => {
        http.get('/test').catch((error) => {
            expect(error.message).to.equal('Network error');
            done();
        });

        requests[0].error();
    });

    it('should set timeout on request', () => {
        const timeout = 50;
        http.get('/test', { timeout });

        expect(requests[0].timeout).to.equal(timeout);
    });

    it('should handle different response types', (done) => {
        const responseData = { success: true };
        http.get('/test')
            .then((response) => {
                if (response.ok) {
                    expect(response.value).to.deep.equal(responseData);
                    done();
                }
            })
            .catch(done);

        requests[0].respond(
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify(responseData)
        );
    });

    it('should handle custom headers', (done) => {
        const headers = { 'X-Custom-Header': 'custom-value' };
        http.get('/test', { headers })
            .then(() => {
                const request = requests[0];
                expect(request.requestHeaders['X-Custom-Header']).to.equal(
                    'custom-value'
                );
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'application/json' }, '{}');
    });

    it('should handle non-JSON responses', (done) => {
        http.get('/test', { headers: { accept: 'text/plain' } })
            .then((response) => {
                if (response.ok) {
                    expect(response.value).to.equal('plain text response');
                }
                done();
            })
            .catch(done);

        requests[0].respond(200, { 'Content-Type': 'text/plain' }, 'plain text response');
    });
});

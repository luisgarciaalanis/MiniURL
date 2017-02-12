const testURL = process.env.MINIURL_TEST_URL;
const assert = require('assert');
const chakram = require('chakram');
const expect = chakram.expect;

class ApiHelpers {
    static TestSuccessfulPostWithNoAlias(url, expectRedirect) {
        if (typeof expectRedirect === 'undefined') {
            expectRedirect = url;
        }

        return chakram.post(`${testURL}/api/v1/shrink`, { url:url, alias:'' }).then(
            (response) => {
                let responseSchema = {
                    type: 'object',
                    properties: {
                        alias: {
                            type: 'string'
                        }
                    }
                };
                expect(response).to.have.status(200);
                expect(response).to.have.header('content-type', /json/);
                expect(response).to.have.schema(responseSchema);
                ApiHelpers.lastAlias = response.body.alias;
                return chakram.get(`${testURL}/${response.body.alias}`, { followRedirect:false }).then((response) => {
                    expect(response).to.have.status(302);
                    expect(response).to.have.header('location', expectRedirect);
                    return chakram.wait();
                });
            }
        );
    }

    static TestSuccessfulPostOfURLInStoreReturnsTheSameHashAndURL(url) {
        return ApiHelpers.TestSuccessfulPostWithNoAlias(url).then(
            () => {
                return chakram.post(`${testURL}/api/v1/shrink`, { url:url, alias:'' }).then(
                    (response) => {
                        let responseSchema = {
                            type: 'object',
                            properties: {
                                alias: {
                                    type: 'string'
                                }
                            }
                        };
                        expect(response).to.have.status(200);
                        expect(response).to.have.header('content-type', /json/);
                        expect(response).to.have.schema(responseSchema);
                        expect(response.body.alias).to.equal(ApiHelpers.lastAlias);
                        return chakram.get(`${testURL}/${response.body.alias}`, { followRedirect:false }).then((response) => {

                            expect(response).to.have.status(302);
                            expect(response).to.have.header('location', url);
                            return chakram.wait();
                        });
                    }
                );
            }
        );
    }

    static TestSuccessfulPostWithAlias(url, alias) {

        return chakram.post(`${testURL}/api/v1/shrink`, { url:url, alias:alias }).then(
            (response) => {
                let responseSchema = {
                    type: 'object',
                    properties: {
                        alias: {
                            type: 'string'
                        }
                    }
                };
                expect(response).to.have.status(200);
                expect(response).to.have.header('content-type', /json/);
                expect(response).to.have.schema(responseSchema);
                expect(response.body.alias).to.equal(alias);
                ApiHelpers.lastAlias = response.body.alias;
                return chakram.get(`${testURL}/${response.body.alias}`, { followRedirect:false }).then((response) => {
                    expect(response).to.have.status(302);
                    expect(response).to.have.header('location', url);
                    return chakram.wait();
                });
            }
        );
    }
}

ApiHelpers.lastAlias = '';

module.exports = ApiHelpers;
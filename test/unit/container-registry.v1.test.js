/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const ContainerRegistryV1 = require('../../dist/container-registry/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us.icr.io',
  account: 'testString',
};

const containerRegistryService = new ContainerRegistryV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(containerRegistryService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

// used for the service construction tests
let requiredGlobals;
beforeEach(() => {
  // these are changed when passed into the factory/constructor, so re-init
  requiredGlobals = {
    account: 'testString',
  };
});

describe('ContainerRegistryV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ContainerRegistryV1.newInstance(requiredGlobals);

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ContainerRegistryV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ContainerRegistryV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ContainerRegistryV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = ContainerRegistryV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ContainerRegistryV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ContainerRegistryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      let options = {
        authenticator: new NoAuthAuthenticator(),
      };

      options = Object.assign(options, requiredGlobals);

      const testInstance = new ContainerRegistryV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ContainerRegistryV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('service-level tests', () => {
    describe('positive tests', () => {
      test('construct service with global params', () => {
        const serviceObj = new ContainerRegistryV1(service);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.account).toEqual(service.account);
      });
    });
  });
  describe('getAuth', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAuth
        const params = {};

        const getAuthResult = containerRegistryService.getAuth(params);

        // all methods should return a Promise
        expectToBePromise(getAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/auth', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getAuth(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.getAuth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updateAuth', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateAuth
        const iamAuthz = true;
        const privateOnly = true;
        const params = {
          iamAuthz: iamAuthz,
          privateOnly: privateOnly,
        };

        const updateAuthResult = containerRegistryService.updateAuth(params);

        // all methods should return a Promise
        expectToBePromise(updateAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/auth', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['iam_authz']).toEqual(iamAuthz);
        expect(options.body['private_only']).toEqual(privateOnly);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateAuth(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.updateAuth({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listImages
        const namespace = 'testString';
        const includeIbm = true;
        const includePrivate = true;
        const includeManifestLists = true;
        const vulnerabilities = true;
        const repository = 'testString';
        const params = {
          namespace: namespace,
          includeIbm: includeIbm,
          includePrivate: includePrivate,
          includeManifestLists: includeManifestLists,
          vulnerabilities: vulnerabilities,
          repository: repository,
        };

        const listImagesResult = containerRegistryService.listImages(params);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.qs['namespace']).toEqual(namespace);
        expect(options.qs['includeIBM']).toEqual(includeIbm);
        expect(options.qs['includePrivate']).toEqual(includePrivate);
        expect(options.qs['includeManifestLists']).toEqual(includeManifestLists);
        expect(options.qs['vulnerabilities']).toEqual(vulnerabilities);
        expect(options.qs['repository']).toEqual(repository);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listImages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('bulkDeleteImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation bulkDeleteImages
        const bulkDelete = [
          'us.icr.io/birds/woodpecker@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4bbbb',
          'us.icr.io/birds/bird@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4dddd',
        ];
        const params = {
          bulkDelete: bulkDelete,
        };

        const bulkDeleteImagesResult = containerRegistryService.bulkDeleteImages(params);

        // all methods should return a Promise
        expectToBePromise(bulkDeleteImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/bulkdelete', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body).toEqual(bulkDelete);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bulkDelete = [
          'us.icr.io/birds/woodpecker@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4bbbb',
          'us.icr.io/birds/bird@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4dddd',
        ];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          bulkDelete,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.bulkDeleteImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.bulkDeleteImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const bulkDeleteImagesPromise = containerRegistryService.bulkDeleteImages();
        expectToBePromise(bulkDeleteImagesPromise);

        bulkDeleteImagesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listImageDigests', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listImageDigests
        const excludeTagged = false;
        const excludeVa = false;
        const includeIbm = false;
        const repositories = ['testString'];
        const params = {
          excludeTagged: excludeTagged,
          excludeVa: excludeVa,
          includeIbm: includeIbm,
          repositories: repositories,
        };

        const listImageDigestsResult = containerRegistryService.listImageDigests(params);

        // all methods should return a Promise
        expectToBePromise(listImageDigestsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/digests', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['exclude_tagged']).toEqual(excludeTagged);
        expect(options.body['exclude_va']).toEqual(excludeVa);
        expect(options.body['include_ibm']).toEqual(includeIbm);
        expect(options.body['repositories']).toEqual(repositories);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listImageDigests(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listImageDigests({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('tagImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation tagImage
        const fromimage = 'testString';
        const toimage = 'testString';
        const params = {
          fromimage: fromimage,
          toimage: toimage,
        };

        const tagImageResult = containerRegistryService.tagImage(params);

        // all methods should return a Promise
        expectToBePromise(tagImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/tags', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.qs['fromimage']).toEqual(fromimage);
        expect(options.qs['toimage']).toEqual(toimage);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const fromimage = 'testString';
        const toimage = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          fromimage,
          toimage,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.tagImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.tagImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const tagImagePromise = containerRegistryService.tagImage();
        expectToBePromise(tagImagePromise);

        tagImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteImage
        const image = 'testString';
        const params = {
          image: image,
        };

        const deleteImageResult = containerRegistryService.deleteImage(params);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/{image}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['image']).toEqual(image);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteImagePromise = containerRegistryService.deleteImage();
        expectToBePromise(deleteImagePromise);

        deleteImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('inspectImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation inspectImage
        const image = 'testString';
        const params = {
          image: image,
        };

        const inspectImageResult = containerRegistryService.inspectImage(params);

        // all methods should return a Promise
        expectToBePromise(inspectImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/{image}/json', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['image']).toEqual(image);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.inspectImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.inspectImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const inspectImagePromise = containerRegistryService.inspectImage();
        expectToBePromise(inspectImagePromise);

        inspectImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getImageManifest', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getImageManifest
        const image = 'testString';
        const params = {
          image: image,
        };

        const getImageManifestResult = containerRegistryService.getImageManifest(params);

        // all methods should return a Promise
        expectToBePromise(getImageManifestResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/images/{image}/manifest', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['image']).toEqual(image);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getImageManifest(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.getImageManifest({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getImageManifestPromise = containerRegistryService.getImageManifest();
        expectToBePromise(getImageManifestPromise);

        getImageManifestPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getMessages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMessages
        const params = {};

        const getMessagesResult = containerRegistryService.getMessages(params);

        // all methods should return a Promise
        expectToBePromise(getMessagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/messages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getMessages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.getMessages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listNamespaces', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNamespaces
        const params = {};

        const listNamespacesResult = containerRegistryService.listNamespaces(params);

        // all methods should return a Promise
        expectToBePromise(listNamespacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/namespaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listNamespaces(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listNamespaces({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listNamespaceDetails', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listNamespaceDetails
        const params = {};

        const listNamespaceDetailsResult = containerRegistryService.listNamespaceDetails(params);

        // all methods should return a Promise
        expectToBePromise(listNamespaceDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/namespaces/details', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listNamespaceDetails(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listNamespaceDetails({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createNamespace', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createNamespace
        const name = 'testString';
        const xAuthResourceGroup = 'testString';
        const params = {
          name: name,
          xAuthResourceGroup: xAuthResourceGroup,
        };

        const createNamespaceResult = containerRegistryService.createNamespace(params);

        // all methods should return a Promise
        expectToBePromise(createNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/namespaces/{name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        checkUserHeader(createRequestMock, 'X-Auth-Resource-Group', xAuthResourceGroup);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.createNamespace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.createNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createNamespacePromise = containerRegistryService.createNamespace();
        expectToBePromise(createNamespacePromise);

        createNamespacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('assignNamespace', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation assignNamespace
        const xAuthResourceGroup = 'testString';
        const name = 'testString';
        const params = {
          xAuthResourceGroup: xAuthResourceGroup,
          name: name,
        };

        const assignNamespaceResult = containerRegistryService.assignNamespace(params);

        // all methods should return a Promise
        expectToBePromise(assignNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/namespaces/{name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        checkUserHeader(createRequestMock, 'X-Auth-Resource-Group', xAuthResourceGroup);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthResourceGroup = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthResourceGroup,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.assignNamespace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.assignNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const assignNamespacePromise = containerRegistryService.assignNamespace();
        expectToBePromise(assignNamespacePromise);

        assignNamespacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteNamespace', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteNamespace
        const name = 'testString';
        const params = {
          name: name,
        };

        const deleteNamespaceResult = containerRegistryService.deleteNamespace(params);

        // all methods should return a Promise
        expectToBePromise(deleteNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/namespaces/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['name']).toEqual(name);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteNamespace(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.deleteNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteNamespacePromise = containerRegistryService.deleteNamespace();
        expectToBePromise(deleteNamespacePromise);

        deleteNamespacePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPlans', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPlans
        const params = {};

        const getPlansResult = containerRegistryService.getPlans(params);

        // all methods should return a Promise
        expectToBePromise(getPlansResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/plans', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getPlans(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.getPlans({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updatePlans', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePlans
        const plan = 'Standard';
        const params = {
          plan: plan,
        };

        const updatePlansResult = containerRegistryService.updatePlans(params);

        // all methods should return a Promise
        expectToBePromise(updatePlansResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/plans', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['plan']).toEqual(plan);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updatePlans(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.updatePlans({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getQuota
        const params = {};

        const getQuotaResult = containerRegistryService.getQuota(params);

        // all methods should return a Promise
        expectToBePromise(getQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/quotas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.getQuota({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updateQuota', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateQuota
        const storageMegabytes = 26;
        const trafficMegabytes = 480;
        const params = {
          storageMegabytes: storageMegabytes,
          trafficMegabytes: trafficMegabytes,
        };

        const updateQuotaResult = containerRegistryService.updateQuota(params);

        // all methods should return a Promise
        expectToBePromise(updateQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/quotas', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['storage_megabytes']).toEqual(storageMegabytes);
        expect(options.body['traffic_megabytes']).toEqual(trafficMegabytes);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateQuota(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.updateQuota({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listRetentionPolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listRetentionPolicies
        const params = {};

        const listRetentionPoliciesResult = containerRegistryService.listRetentionPolicies(params);

        // all methods should return a Promise
        expectToBePromise(listRetentionPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/retentions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listRetentionPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listRetentionPolicies({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('setRetentionPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation setRetentionPolicy
        const namespace = 'birds';
        const imagesPerRepo = 10;
        const retainUntagged = false;
        const params = {
          namespace: namespace,
          imagesPerRepo: imagesPerRepo,
          retainUntagged: retainUntagged,
        };

        const setRetentionPolicyResult = containerRegistryService.setRetentionPolicy(params);

        // all methods should return a Promise
        expectToBePromise(setRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/retentions', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['namespace']).toEqual(namespace);
        expect(options.body['images_per_repo']).toEqual(imagesPerRepo);
        expect(options.body['retain_untagged']).toEqual(retainUntagged);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'birds';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.setRetentionPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.setRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const setRetentionPolicyPromise = containerRegistryService.setRetentionPolicy();
        expectToBePromise(setRetentionPolicyPromise);

        setRetentionPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('analyzeRetentionPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation analyzeRetentionPolicy
        const namespace = 'birds';
        const imagesPerRepo = 10;
        const retainUntagged = false;
        const params = {
          namespace: namespace,
          imagesPerRepo: imagesPerRepo,
          retainUntagged: retainUntagged,
        };

        const analyzeRetentionPolicyResult = containerRegistryService.analyzeRetentionPolicy(
          params
        );

        // all methods should return a Promise
        expectToBePromise(analyzeRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/retentions/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['namespace']).toEqual(namespace);
        expect(options.body['images_per_repo']).toEqual(imagesPerRepo);
        expect(options.body['retain_untagged']).toEqual(retainUntagged);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'birds';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.analyzeRetentionPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.analyzeRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const analyzeRetentionPolicyPromise = containerRegistryService.analyzeRetentionPolicy();
        expectToBePromise(analyzeRetentionPolicyPromise);

        analyzeRetentionPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getRetentionPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getRetentionPolicy
        const namespace = 'testString';
        const params = {
          namespace: namespace,
        };

        const getRetentionPolicyResult = containerRegistryService.getRetentionPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/retentions/{namespace}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['namespace']).toEqual(namespace);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getRetentionPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.getRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getRetentionPolicyPromise = containerRegistryService.getRetentionPolicy();
        expectToBePromise(getRetentionPolicyPromise);

        getRetentionPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSettings
        const params = {};

        const getSettingsResult = containerRegistryService.getSettings(params);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.getSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updateSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSettings
        const platformMetrics = true;
        const params = {
          platformMetrics: platformMetrics,
        };

        const updateSettingsResult = containerRegistryService.updateSettings(params);

        // all methods should return a Promise
        expectToBePromise(updateSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/settings', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.body['platform_metrics']).toEqual(platformMetrics);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.updateSettings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteImageTag', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteImageTag
        const image = 'testString';
        const params = {
          image: image,
        };

        const deleteImageTagResult = containerRegistryService.deleteImageTag(params);

        // all methods should return a Promise
        expectToBePromise(deleteImageTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/tags/{image}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['image']).toEqual(image);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteImageTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.deleteImageTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteImageTagPromise = containerRegistryService.deleteImageTag();
        expectToBePromise(deleteImageTagPromise);

        deleteImageTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDeletedImages', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDeletedImages
        const namespace = 'testString';
        const params = {
          namespace: namespace,
        };

        const listDeletedImagesResult = containerRegistryService.listDeletedImages(params);

        // all methods should return a Promise
        expectToBePromise(listDeletedImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/trash', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.qs['namespace']).toEqual(namespace);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listDeletedImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        containerRegistryService.listDeletedImages({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('restoreTags', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation restoreTags
        const digest = 'testString';
        const params = {
          digest: digest,
        };

        const restoreTagsResult = containerRegistryService.restoreTags(params);

        // all methods should return a Promise
        expectToBePromise(restoreTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/trash/{digest}/restoretags', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['digest']).toEqual(digest);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const digest = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          digest,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.restoreTags(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.restoreTags({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const restoreTagsPromise = containerRegistryService.restoreTags();
        expectToBePromise(restoreTagsPromise);

        restoreTagsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('restoreImage', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation restoreImage
        const image = 'testString';
        const params = {
          image: image,
        };

        const restoreImageResult = containerRegistryService.restoreImage(params);

        // all methods should return a Promise
        expectToBePromise(restoreImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/trash/{image}/restore', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', service.account);
        expect(options.path['image']).toEqual(image);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.restoreImage(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await containerRegistryService.restoreImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const restoreImagePromise = containerRegistryService.restoreImage();
        expectToBePromise(restoreImagePromise);

        restoreImagePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});

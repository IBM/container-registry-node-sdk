/**
 * (C) Copyright IBM Corp. 2024.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const ContainerRegistryV1 = require('../../dist/container-registry/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const containerRegistryServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://icr.io',
  account: 'testString',
};

const containerRegistryService = new ContainerRegistryV1(containerRegistryServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(containerRegistryService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

// used for the service construction tests
let requiredGlobals;

describe('ContainerRegistryV1', () => {
  beforeEach(() => {
    mock_createRequest();
    // these are changed when passed into the factory/constructor, so re-init
    requiredGlobals = {
      account: 'testString',
    };
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

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
        const serviceObj = new ContainerRegistryV1(containerRegistryServiceOptions);
        expect(serviceObj).not.toBeNull();
        expect(serviceObj.account).toEqual(containerRegistryServiceOptions.account);
      });
    });
  });

  describe('getServiceUrlForRegion', () => {
    test('should return undefined for invalid region', () => {
      expect(ContainerRegistryV1.getServiceUrlForRegion('INVALID_REGION')).toBeFalsy();
    });
    test('should return valid service url', () => {
      expect(ContainerRegistryV1.getServiceUrlForRegion('global')).toBe('https://icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('us-south')).toBe('https://us.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('uk-south')).toBe('https://uk.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('eu-gb')).toBe('https://uk.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('eu-central')).toBe('https://de.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('eu-de')).toBe('https://de.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('ap-north')).toBe('https://jp.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('jp-tok')).toBe('https://jp.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('ap-south')).toBe('https://au.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('au-syd')).toBe('https://au.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('jp-osa')).toBe('https://jp2.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('ca-tor')).toBe('https://ca.icr.io');      
      expect(ContainerRegistryV1.getServiceUrlForRegion('br-sao')).toBe('https://br.icr.io');      
    });
  });

  describe('getAuth', () => {
    describe('positive tests', () => {
      function __getAuthTest() {
        // Construct the params object for operation getAuth
        const getAuthParams = {};

        const getAuthResult = containerRegistryService.getAuth(getAuthParams);

        // all methods should return a Promise
        expectToBePromise(getAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/auth', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAuthTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getAuthTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getAuthTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAuthParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getAuth(getAuthParams);
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
      function __updateAuthTest() {
        // Construct the params object for operation updateAuth
        const iamAuthz = true;
        const privateOnly = true;
        const updateAuthParams = {
          iamAuthz,
          privateOnly,
        };

        const updateAuthResult = containerRegistryService.updateAuth(updateAuthParams);

        // all methods should return a Promise
        expectToBePromise(updateAuthResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/auth', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.iam_authz).toEqual(iamAuthz);
        expect(mockRequestOptions.body.private_only).toEqual(privateOnly);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAuthTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __updateAuthTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __updateAuthTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAuthParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateAuth(updateAuthParams);
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
      function __listImagesTest() {
        // Construct the params object for operation listImages
        const namespace = 'testString';
        const includeIbm = true;
        const includePrivate = true;
        const includeManifestLists = true;
        const vulnerabilities = true;
        const repository = 'testString';
        const listImagesParams = {
          namespace,
          includeIbm,
          includePrivate,
          includeManifestLists,
          vulnerabilities,
          repository,
        };

        const listImagesResult = containerRegistryService.listImages(listImagesParams);

        // all methods should return a Promise
        expectToBePromise(listImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.qs.namespace).toEqual(namespace);
        expect(mockRequestOptions.qs.includeIBM).toEqual(includeIbm);
        expect(mockRequestOptions.qs.includePrivate).toEqual(includePrivate);
        expect(mockRequestOptions.qs.includeManifestLists).toEqual(includeManifestLists);
        expect(mockRequestOptions.qs.vulnerabilities).toEqual(vulnerabilities);
        expect(mockRequestOptions.qs.repository).toEqual(repository);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listImagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listImagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listImagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listImagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listImages(listImagesParams);
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
      function __bulkDeleteImagesTest() {
        // Construct the params object for operation bulkDeleteImages
        const bulkDelete = ['us.icr.io/birds/woodpecker@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4bbbb', 'us.icr.io/birds/bird@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4dddd'];
        const bulkDeleteImagesParams = {
          bulkDelete,
        };

        const bulkDeleteImagesResult = containerRegistryService.bulkDeleteImages(bulkDeleteImagesParams);

        // all methods should return a Promise
        expectToBePromise(bulkDeleteImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/bulkdelete', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body).toEqual(bulkDelete);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __bulkDeleteImagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __bulkDeleteImagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __bulkDeleteImagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const bulkDelete = ['us.icr.io/birds/woodpecker@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4bbbb', 'us.icr.io/birds/bird@sha256:38f97dd92769b18ca82ad9ab6667af47306e66fea5b446937eea68b10ab4dddd'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const bulkDeleteImagesParams = {
          bulkDelete,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.bulkDeleteImages(bulkDeleteImagesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.bulkDeleteImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.bulkDeleteImages();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listImageDigests', () => {
    describe('positive tests', () => {
      function __listImageDigestsTest() {
        // Construct the params object for operation listImageDigests
        const excludeTagged = false;
        const excludeVa = false;
        const includeIbm = false;
        const repositories = ['testString'];
        const listImageDigestsParams = {
          excludeTagged,
          excludeVa,
          includeIbm,
          repositories,
        };

        const listImageDigestsResult = containerRegistryService.listImageDigests(listImageDigestsParams);

        // all methods should return a Promise
        expectToBePromise(listImageDigestsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/digests', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.exclude_tagged).toEqual(excludeTagged);
        expect(mockRequestOptions.body.exclude_va).toEqual(excludeVa);
        expect(mockRequestOptions.body.include_ibm).toEqual(includeIbm);
        expect(mockRequestOptions.body.repositories).toEqual(repositories);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listImageDigestsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listImageDigestsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listImageDigestsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listImageDigestsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listImageDigests(listImageDigestsParams);
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
      function __tagImageTest() {
        // Construct the params object for operation tagImage
        const fromimage = 'testString';
        const toimage = 'testString';
        const tagImageParams = {
          fromimage,
          toimage,
        };

        const tagImageResult = containerRegistryService.tagImage(tagImageParams);

        // all methods should return a Promise
        expectToBePromise(tagImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/tags', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.qs.fromimage).toEqual(fromimage);
        expect(mockRequestOptions.qs.toimage).toEqual(toimage);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __tagImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __tagImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __tagImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const fromimage = 'testString';
        const toimage = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const tagImageParams = {
          fromimage,
          toimage,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.tagImage(tagImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.tagImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.tagImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteImage', () => {
    describe('positive tests', () => {
      function __deleteImageTest() {
        // Construct the params object for operation deleteImage
        const image = 'testString';
        const deleteImageParams = {
          image,
        };

        const deleteImageResult = containerRegistryService.deleteImage(deleteImageParams);

        // all methods should return a Promise
        expectToBePromise(deleteImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/{image}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.image).toEqual(image);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __deleteImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __deleteImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteImageParams = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteImage(deleteImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.deleteImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.deleteImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('inspectImage', () => {
    describe('positive tests', () => {
      function __inspectImageTest() {
        // Construct the params object for operation inspectImage
        const image = 'testString';
        const inspectImageParams = {
          image,
        };

        const inspectImageResult = containerRegistryService.inspectImage(inspectImageParams);

        // all methods should return a Promise
        expectToBePromise(inspectImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/{image}/json', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.image).toEqual(image);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __inspectImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __inspectImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __inspectImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const inspectImageParams = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.inspectImage(inspectImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.inspectImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.inspectImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getImageManifest', () => {
    describe('positive tests', () => {
      function __getImageManifestTest() {
        // Construct the params object for operation getImageManifest
        const image = 'testString';
        const getImageManifestParams = {
          image,
        };

        const getImageManifestResult = containerRegistryService.getImageManifest(getImageManifestParams);

        // all methods should return a Promise
        expectToBePromise(getImageManifestResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/images/{image}/manifest', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.image).toEqual(image);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getImageManifestTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getImageManifestTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getImageManifestTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getImageManifestParams = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getImageManifest(getImageManifestParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.getImageManifest({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.getImageManifest();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getMessages', () => {
    describe('positive tests', () => {
      function __getMessagesTest() {
        // Construct the params object for operation getMessages
        const getMessagesParams = {};

        const getMessagesResult = containerRegistryService.getMessages(getMessagesParams);

        // all methods should return a Promise
        expectToBePromise(getMessagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/messages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMessagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getMessagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getMessagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMessagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getMessages(getMessagesParams);
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
      function __listNamespacesTest() {
        // Construct the params object for operation listNamespaces
        const listNamespacesParams = {};

        const listNamespacesResult = containerRegistryService.listNamespaces(listNamespacesParams);

        // all methods should return a Promise
        expectToBePromise(listNamespacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/namespaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNamespacesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listNamespacesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listNamespacesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNamespacesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listNamespaces(listNamespacesParams);
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
      function __listNamespaceDetailsTest() {
        // Construct the params object for operation listNamespaceDetails
        const listNamespaceDetailsParams = {};

        const listNamespaceDetailsResult = containerRegistryService.listNamespaceDetails(listNamespaceDetailsParams);

        // all methods should return a Promise
        expectToBePromise(listNamespaceDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/namespaces/details', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNamespaceDetailsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listNamespaceDetailsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listNamespaceDetailsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNamespaceDetailsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listNamespaceDetails(listNamespaceDetailsParams);
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
      function __createNamespaceTest() {
        // Construct the params object for operation createNamespace
        const name = 'testString';
        const xAuthResourceGroup = 'testString';
        const createNamespaceParams = {
          name,
          xAuthResourceGroup,
        };

        const createNamespaceResult = containerRegistryService.createNamespace(createNamespaceParams);

        // all methods should return a Promise
        expectToBePromise(createNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/namespaces/{name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        checkUserHeader(createRequestMock, 'X-Auth-Resource-Group', xAuthResourceGroup);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createNamespaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __createNamespaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __createNamespaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createNamespaceParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.createNamespace(createNamespaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.createNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.createNamespace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('assignNamespace', () => {
    describe('positive tests', () => {
      function __assignNamespaceTest() {
        // Construct the params object for operation assignNamespace
        const xAuthResourceGroup = 'testString';
        const name = 'testString';
        const assignNamespaceParams = {
          xAuthResourceGroup,
          name,
        };

        const assignNamespaceResult = containerRegistryService.assignNamespace(assignNamespaceParams);

        // all methods should return a Promise
        expectToBePromise(assignNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/namespaces/{name}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        checkUserHeader(createRequestMock, 'X-Auth-Resource-Group', xAuthResourceGroup);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __assignNamespaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __assignNamespaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __assignNamespaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthResourceGroup = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const assignNamespaceParams = {
          xAuthResourceGroup,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.assignNamespace(assignNamespaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.assignNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.assignNamespace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteNamespace', () => {
    describe('positive tests', () => {
      function __deleteNamespaceTest() {
        // Construct the params object for operation deleteNamespace
        const name = 'testString';
        const deleteNamespaceParams = {
          name,
        };

        const deleteNamespaceResult = containerRegistryService.deleteNamespace(deleteNamespaceParams);

        // all methods should return a Promise
        expectToBePromise(deleteNamespaceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/namespaces/{name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.name).toEqual(name);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNamespaceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __deleteNamespaceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __deleteNamespaceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNamespaceParams = {
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteNamespace(deleteNamespaceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.deleteNamespace({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.deleteNamespace();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPlans', () => {
    describe('positive tests', () => {
      function __getPlansTest() {
        // Construct the params object for operation getPlans
        const getPlansParams = {};

        const getPlansResult = containerRegistryService.getPlans(getPlansParams);

        // all methods should return a Promise
        expectToBePromise(getPlansResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/plans', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPlansTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getPlansTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getPlansTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPlansParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getPlans(getPlansParams);
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
      function __updatePlansTest() {
        // Construct the params object for operation updatePlans
        const plan = 'Standard';
        const updatePlansParams = {
          plan,
        };

        const updatePlansResult = containerRegistryService.updatePlans(updatePlansParams);

        // all methods should return a Promise
        expectToBePromise(updatePlansResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/plans', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.plan).toEqual(plan);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePlansTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __updatePlansTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __updatePlansTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePlansParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updatePlans(updatePlansParams);
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
      function __getQuotaTest() {
        // Construct the params object for operation getQuota
        const getQuotaParams = {};

        const getQuotaResult = containerRegistryService.getQuota(getQuotaParams);

        // all methods should return a Promise
        expectToBePromise(getQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/quotas', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getQuotaParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getQuota(getQuotaParams);
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
      function __updateQuotaTest() {
        // Construct the params object for operation updateQuota
        const storageMegabytes = 26;
        const trafficMegabytes = 480;
        const updateQuotaParams = {
          storageMegabytes,
          trafficMegabytes,
        };

        const updateQuotaResult = containerRegistryService.updateQuota(updateQuotaParams);

        // all methods should return a Promise
        expectToBePromise(updateQuotaResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/quotas', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.storage_megabytes).toEqual(storageMegabytes);
        expect(mockRequestOptions.body.traffic_megabytes).toEqual(trafficMegabytes);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateQuotaTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __updateQuotaTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __updateQuotaTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateQuotaParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateQuota(updateQuotaParams);
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
      function __listRetentionPoliciesTest() {
        // Construct the params object for operation listRetentionPolicies
        const listRetentionPoliciesParams = {};

        const listRetentionPoliciesResult = containerRegistryService.listRetentionPolicies(listRetentionPoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listRetentionPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/retentions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRetentionPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listRetentionPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listRetentionPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRetentionPoliciesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listRetentionPolicies(listRetentionPoliciesParams);
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
      function __setRetentionPolicyTest() {
        // Construct the params object for operation setRetentionPolicy
        const namespace = 'birds';
        const imagesPerRepo = 10;
        const retainUntagged = false;
        const setRetentionPolicyParams = {
          namespace,
          imagesPerRepo,
          retainUntagged,
        };

        const setRetentionPolicyResult = containerRegistryService.setRetentionPolicy(setRetentionPolicyParams);

        // all methods should return a Promise
        expectToBePromise(setRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/retentions', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.namespace).toEqual(namespace);
        expect(mockRequestOptions.body.images_per_repo).toEqual(imagesPerRepo);
        expect(mockRequestOptions.body.retain_untagged).toEqual(retainUntagged);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setRetentionPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __setRetentionPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __setRetentionPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'birds';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setRetentionPolicyParams = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.setRetentionPolicy(setRetentionPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.setRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.setRetentionPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('analyzeRetentionPolicy', () => {
    describe('positive tests', () => {
      function __analyzeRetentionPolicyTest() {
        // Construct the params object for operation analyzeRetentionPolicy
        const namespace = 'birds';
        const imagesPerRepo = 10;
        const retainUntagged = false;
        const analyzeRetentionPolicyParams = {
          namespace,
          imagesPerRepo,
          retainUntagged,
        };

        const analyzeRetentionPolicyResult = containerRegistryService.analyzeRetentionPolicy(analyzeRetentionPolicyParams);

        // all methods should return a Promise
        expectToBePromise(analyzeRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/retentions/analyze', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.namespace).toEqual(namespace);
        expect(mockRequestOptions.body.images_per_repo).toEqual(imagesPerRepo);
        expect(mockRequestOptions.body.retain_untagged).toEqual(retainUntagged);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __analyzeRetentionPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __analyzeRetentionPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __analyzeRetentionPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'birds';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const analyzeRetentionPolicyParams = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.analyzeRetentionPolicy(analyzeRetentionPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.analyzeRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.analyzeRetentionPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRetentionPolicy', () => {
    describe('positive tests', () => {
      function __getRetentionPolicyTest() {
        // Construct the params object for operation getRetentionPolicy
        const namespace = 'testString';
        const getRetentionPolicyParams = {
          namespace,
        };

        const getRetentionPolicyResult = containerRegistryService.getRetentionPolicy(getRetentionPolicyParams);

        // all methods should return a Promise
        expectToBePromise(getRetentionPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/retentions/{namespace}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.namespace).toEqual(namespace);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRetentionPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getRetentionPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getRetentionPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const namespace = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRetentionPolicyParams = {
          namespace,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getRetentionPolicy(getRetentionPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.getRetentionPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.getRetentionPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSettings', () => {
    describe('positive tests', () => {
      function __getSettingsTest() {
        // Construct the params object for operation getSettings
        const getSettingsParams = {};

        const getSettingsResult = containerRegistryService.getSettings(getSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __getSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __getSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.getSettings(getSettingsParams);
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
      function __updateSettingsTest() {
        // Construct the params object for operation updateSettings
        const platformMetrics = true;
        const updateSettingsParams = {
          platformMetrics,
        };

        const updateSettingsResult = containerRegistryService.updateSettings(updateSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/settings', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.body.platform_metrics).toEqual(platformMetrics);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __updateSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __updateSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSettingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.updateSettings(updateSettingsParams);
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
      function __deleteImageTagTest() {
        // Construct the params object for operation deleteImageTag
        const image = 'testString';
        const deleteImageTagParams = {
          image,
        };

        const deleteImageTagResult = containerRegistryService.deleteImageTag(deleteImageTagParams);

        // all methods should return a Promise
        expectToBePromise(deleteImageTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/tags/{image}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.image).toEqual(image);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteImageTagTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __deleteImageTagTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __deleteImageTagTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteImageTagParams = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.deleteImageTag(deleteImageTagParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.deleteImageTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.deleteImageTag();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDeletedImages', () => {
    describe('positive tests', () => {
      function __listDeletedImagesTest() {
        // Construct the params object for operation listDeletedImages
        const namespace = 'testString';
        const listDeletedImagesParams = {
          namespace,
        };

        const listDeletedImagesResult = containerRegistryService.listDeletedImages(listDeletedImagesParams);

        // all methods should return a Promise
        expectToBePromise(listDeletedImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/trash', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.qs.namespace).toEqual(namespace);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDeletedImagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __listDeletedImagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __listDeletedImagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDeletedImagesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.listDeletedImages(listDeletedImagesParams);
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
      function __restoreTagsTest() {
        // Construct the params object for operation restoreTags
        const digest = 'testString';
        const restoreTagsParams = {
          digest,
        };

        const restoreTagsResult = containerRegistryService.restoreTags(restoreTagsParams);

        // all methods should return a Promise
        expectToBePromise(restoreTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/trash/{digest}/restoretags', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.digest).toEqual(digest);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restoreTagsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __restoreTagsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __restoreTagsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const digest = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restoreTagsParams = {
          digest,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.restoreTags(restoreTagsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.restoreTags({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.restoreTags();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('restoreImage', () => {
    describe('positive tests', () => {
      function __restoreImageTest() {
        // Construct the params object for operation restoreImage
        const image = 'testString';
        const restoreImageParams = {
          image,
        };

        const restoreImageResult = containerRegistryService.restoreImage(restoreImageParams);

        // all methods should return a Promise
        expectToBePromise(restoreImageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/trash/{image}/restore', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Account', containerRegistryServiceOptions.account);
        expect(mockRequestOptions.path.image).toEqual(image);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restoreImageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.enableRetries();
        __restoreImageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        containerRegistryService.disableRetries();
        __restoreImageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const image = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restoreImageParams = {
          image,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        containerRegistryService.restoreImage(restoreImageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await containerRegistryService.restoreImage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await containerRegistryService.restoreImage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});

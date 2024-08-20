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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.94.0-fa797aec-20240814-142622
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Management interface for IBM Cloud Container Registry
 *
 * API Version: 1.1
 */

class ContainerRegistryV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://icr.io';

  static DEFAULT_SERVICE_NAME: string = 'container_registry';

  private static _regionalEndpoints = new Map([
    ['global', 'https://icr.io'], // global
    ['us-south', 'https://us.icr.io'], // us-south
    ['uk-south', 'https://uk.icr.io'], // uk-south
    ['eu-gb', 'https://uk.icr.io'], // eu-gb
    ['eu-central', 'https://de.icr.io'], // eu-central
    ['eu-de', 'https://de.icr.io'], // eu-de
    ['ap-north', 'https://jp.icr.io'], // ap-north
    ['jp-tok', 'https://jp.icr.io'], // jp-tok
    ['ap-south', 'https://au.icr.io'], // ap-south
    ['au-syd', 'https://au.icr.io'], // au-syd
    ['jp-osa', 'https://jp2.icr.io'], // jp-osa
    ['ca-tor', 'https://ca.icr.io'], // ca-tor
    ['br-sao', 'https://br.icr.io'], // br-sao
  ]);

  /**
   * Returns the service URL associated with the specified region.
   * @param region a string representing the region
   * @returns the service URL associated with the specified region or undefined
   * if no mapping for the region exists
   */
  public static getServiceUrlForRegion(region: string): string {
    return this._regionalEndpoints.get(region)
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ContainerRegistryV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {ContainerRegistryV1}
   */

  public static newInstance(options: UserOptions): ContainerRegistryV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ContainerRegistryV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /** The unique ID for your IBM Cloud account. */
  account: string;

  /**
   * Construct a ContainerRegistryV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} options.account - The unique ID for your IBM Cloud account.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ContainerRegistryV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    const _requiredParams = ['account'];
    const _validationErrors = validateParams(options, _requiredParams, null);
    if (_validationErrors) {
      throw _validationErrors;
    }
    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ContainerRegistryV1.DEFAULT_SERVICE_URL);
    }
    this.account = options.account;
  }

  /*************************
   * authorization
   ************************/

  /**
   * Get authorization options.
   *
   * Get authorization options for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.AuthOptions>>}
   */
  public getAuth(
    params?: ContainerRegistryV1.GetAuthParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.AuthOptions>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getAuth');

    const parameters = {
      options: {
        url: '/api/v1/auth',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update authorization options.
   *
   * Update authorization options for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.iamAuthz] - Enable role based authorization when authenticating with IBM Cloud IAM.
   * @param {boolean} [params.privateOnly] - Restrict account to only be able to push and pull images over private
   * connections.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public updateAuth(
    params?: ContainerRegistryV1.UpdateAuthParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['iamAuthz', 'privateOnly', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'iam_authz': _params.iamAuthz,
      'private_only': _params.privateOnly,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAuth');

    const parameters = {
      options: {
        url: '/api/v1/auth',
        method: 'PATCH',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * images
   ************************/

  /**
   * List images.
   *
   * List all images in namespaces in a targeted IBM Cloud account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.namespace] - Lists images that are stored in the specified namespace only. Query multiple
   * namespaces by specifying this option for each namespace. If this option is not specified, images from all
   * namespaces in the specified IBM Cloud account are listed.
   * @param {boolean} [params.includeIbm] - Includes IBM-provided public images in the list of images. If this option is
   * not specified, private images are listed only. If this option is specified more than once, the last parsed setting
   * is the setting that is used.
   * @param {boolean} [params.includePrivate] - Includes private images in the list of images. If this option is not
   * specified, private images are listed. If this option is specified more than once, the last parsed setting is the
   * setting that is used.
   * @param {boolean} [params.includeManifestLists] - Includes tags that reference multi-architecture manifest lists in
   * the image list. If this option is not specified, tagged manifest lists are not shown in the list. If this option is
   * specified more than once, the last parsed setting is the setting that is used.
   * @param {boolean} [params.vulnerabilities] - Displays Vulnerability Advisor status for the listed images. If this
   * option is specified more than once, the last parsed setting is the setting that is used.
   * @param {string} [params.repository] - Lists images that are stored in the specified repository, under your
   * namespaces. Query multiple repositories by specifying this option for each repository. If this option is not
   * specified, images from all repos are listed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RemoteAPIImage[]>>}
   */
  public listImages(
    params?: ContainerRegistryV1.ListImagesParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RemoteAPIImage[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['namespace', 'includeIbm', 'includePrivate', 'includeManifestLists', 'vulnerabilities', 'repository', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'namespace': _params.namespace,
      'includeIBM': _params.includeIbm,
      'includePrivate': _params.includePrivate,
      'includeManifestLists': _params.includeManifestLists,
      'vulnerabilities': _params.vulnerabilities,
      'repository': _params.repository,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listImages');

    const parameters = {
      options: {
        url: '/api/v1/images',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Bulk delete images.
   *
   * Remove multiple container images from the registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.bulkDelete - The full IBM Cloud registry path to the images that you want to delete,
   * including its digest. All tags for the supplied digest are removed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageBulkDeleteResult>>}
   */
  public bulkDeleteImages(
    params: ContainerRegistryV1.BulkDeleteImagesParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageBulkDeleteResult>> {
    const _params = { ...params };
    const _requiredParams = ['bulkDelete'];
    const _validParams = ['bulkDelete', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.bulkDelete;
    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'bulkDeleteImages');

    const parameters = {
      options: {
        url: '/api/v1/images/bulkdelete',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List images by digest.
   *
   * List all images by digest in namespaces in a targeted IBM Cloud account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.excludeTagged] - ExcludeTagged returns only untagged digests.
   * @param {boolean} [params.excludeVa] - ExcludeVA returns the digest list with no VA scan results.
   * @param {boolean} [params.includeIbm] - When true, API will return the IBM public images if they exist in the
   * targeted region.
   * @param {string[]} [params.repositories] - Repositories in which to restrict the output. If left empty all images
   * for the account will be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDigest[]>>}
   */
  public listImageDigests(
    params?: ContainerRegistryV1.ListImageDigestsParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDigest[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['excludeTagged', 'excludeVa', 'includeIbm', 'repositories', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'exclude_tagged': _params.excludeTagged,
      'exclude_va': _params.excludeVa,
      'include_ibm': _params.includeIbm,
      'repositories': _params.repositories,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listImageDigests');

    const parameters = {
      options: {
        url: '/api/v1/images/digests',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create tag.
   *
   * Create a new tag in a private registry that refers to an existing image in the same region. If the fromimage has
   * Red Hat® signatures and the toimage is in a different repository, those signatures are copied to that repository.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.fromimage - The name of the image that you want to create a new tag for, in the format
   * &lt;REPOSITORY&gt;:&lt;TAG&gt;. Run `ibmcloud cr images` or call the `GET /images/json` endpoint to review images
   * that are in the registry.
   * @param {string} params.toimage - The new tag for the image, in the format &lt;REPOSITORY&gt;:&lt;TAG&gt;.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public tagImage(
    params: ContainerRegistryV1.TagImageParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['fromimage', 'toimage'];
    const _validParams = ['fromimage', 'toimage', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'fromimage': _params.fromimage,
      'toimage': _params.toimage,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'tagImage');

    const parameters = {
      options: {
        url: '/api/v1/images/tags',
        method: 'POST',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete image.
   *
   * Delete a container image from the registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.image - The full IBM Cloud registry path to the image that you want to delete, including its
   * tag. If you do not provide a specific tag, the version with the `latest` tag is removed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDeleteResult>>}
   */
  public deleteImage(
    params: ContainerRegistryV1.DeleteImageParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDeleteResult>> {
    const _params = { ...params };
    const _requiredParams = ['image'];
    const _validParams = ['image', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'image': _params.image,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteImage');

    const parameters = {
      options: {
        url: '/api/v1/images/{image}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Inspect an image.
   *
   * Inspect a container image in the private registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.image - The full IBM Cloud registry path to the image that you want to inspect. Run
   * `ibmcloud cr images` or call the `GET /images/json` endpoint to review images that are in the registry.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageInspection>>}
   */
  public inspectImage(
    params: ContainerRegistryV1.InspectImageParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageInspection>> {
    const _params = { ...params };
    const _requiredParams = ['image'];
    const _validParams = ['image', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'image': _params.image,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'inspectImage');

    const parameters = {
      options: {
        url: '/api/v1/images/{image}/json',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get image manifest.
   *
   * Get the manifest for a container image in the private registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.image - The full IBM Cloud registry path to the image that you want to inspect. Run
   * `ibmcloud cr images` or call the `GET /images/json` endpoint to review images that are in the registry.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>>}
   */
  public getImageManifest(
    params: ContainerRegistryV1.GetImageManifestParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>> {
    const _params = { ...params };
    const _requiredParams = ['image'];
    const _validParams = ['image', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'image': _params.image,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getImageManifest');

    const parameters = {
      options: {
        url: '/api/v1/images/{image}/manifest',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * messages
   ************************/

  /**
   * Get messages.
   *
   * Return any published system messages.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<string>>}
   */
  public getMessages(
    params?: ContainerRegistryV1.GetMessagesParams
  ): Promise<ContainerRegistryV1.Response<string>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getMessages');

    const parameters = {
      options: {
        url: '/api/v1/messages',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * namespaces
   ************************/

  /**
   * List namespaces.
   *
   * List authorized namespaces in the targeted IBM Cloud account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<string[]>>}
   */
  public listNamespaces(
    params?: ContainerRegistryV1.ListNamespacesParams
  ): Promise<ContainerRegistryV1.Response<string[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listNamespaces');

    const parameters = {
      options: {
        url: '/api/v1/namespaces',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Detailed namespace list.
   *
   * Retrieves details, such as resource group, for all your namespaces in the targeted registry.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.NamespaceDetails[]>>}
   */
  public listNamespaceDetails(
    params?: ContainerRegistryV1.ListNamespaceDetailsParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.NamespaceDetails[]>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listNamespaceDetails');

    const parameters = {
      options: {
        url: '/api/v1/namespaces/details',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create namespace.
   *
   * Add a namespace to the targeted IBM Cloud account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the namespace that you want to create.
   * @param {string} [params.xAuthResourceGroup] - The ID of the resource group to which you want to add the namespace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Namespace>>}
   */
  public createNamespace(
    params: ContainerRegistryV1.CreateNamespaceParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Namespace>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'xAuthResourceGroup', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'createNamespace');

    const parameters = {
      options: {
        url: '/api/v1/namespaces/{name}',
        method: 'PUT',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
            'X-Auth-Resource-Group': _params.xAuthResourceGroup,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Assign namespace.
   *
   * Assign a namespace to the specified resource group in the targeted IBM Cloud account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthResourceGroup - The ID of the resource group to which you want to add the namespace.
   * @param {string} params.name - The name of the namespace that you want to udpate.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Namespace>>}
   */
  public assignNamespace(
    params: ContainerRegistryV1.AssignNamespaceParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Namespace>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthResourceGroup', 'name'];
    const _validParams = ['xAuthResourceGroup', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'assignNamespace');

    const parameters = {
      options: {
        url: '/api/v1/namespaces/{name}',
        method: 'PATCH',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
            'X-Auth-Resource-Group': _params.xAuthResourceGroup,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete namespace.
   *
   * Delete the IBM Cloud Container Registry namespace from the targeted IBM Cloud account, and removes all images that
   * were in that namespace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the namespace that you want to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public deleteNamespace(
    params: ContainerRegistryV1.DeleteNamespaceParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteNamespace');

    const parameters = {
      options: {
        url: '/api/v1/namespaces/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * plans
   ************************/

  /**
   * Get plans.
   *
   * Get plans for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Plan>>}
   */
  public getPlans(
    params?: ContainerRegistryV1.GetPlansParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Plan>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getPlans');

    const parameters = {
      options: {
        url: '/api/v1/plans',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update plans.
   *
   * Update plans for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.plan] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public updatePlans(
    params?: ContainerRegistryV1.UpdatePlansParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['plan', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'plan': _params.plan,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePlans');

    const parameters = {
      options: {
        url: '/api/v1/plans',
        method: 'PATCH',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * quotas
   ************************/

  /**
   * Get quotas.
   *
   * Get quotas for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Quota>>}
   */
  public getQuota(
    params?: ContainerRegistryV1.GetQuotaParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.Quota>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getQuota');

    const parameters = {
      options: {
        url: '/api/v1/quotas',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update quotas.
   *
   * Update quotas for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.storageMegabytes] - Storage quota in megabytes. The value -1 denotes "Unlimited".
   * @param {number} [params.trafficMegabytes] - Traffic quota in megabytes. The value -1 denotes "Unlimited".
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public updateQuota(
    params?: ContainerRegistryV1.UpdateQuotaParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['storageMegabytes', 'trafficMegabytes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'storage_megabytes': _params.storageMegabytes,
      'traffic_megabytes': _params.trafficMegabytes,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateQuota');

    const parameters = {
      options: {
        url: '/api/v1/quotas',
        method: 'PATCH',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * retentions
   ************************/

  /**
   * List retention policies.
   *
   * List retention policies for all namespaces in the targeted IBM Cloud account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>>}
   */
  public listRetentionPolicies(
    params?: ContainerRegistryV1.ListRetentionPoliciesParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listRetentionPolicies');

    const parameters = {
      options: {
        url: '/api/v1/retentions',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Set retention policy.
   *
   * Set the retention policy for the specified namespace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.namespace - The namespace to which the retention policy is attached.
   * @param {number} [params.imagesPerRepo] - Determines how many images are retained in each repository when the
   * retention policy is processed. The value -1 denotes 'Unlimited' (all images are retained).
   * @param {boolean} [params.retainUntagged] - Determines whether untagged images are retained when the retention
   * policy is processed. The value is false by default, which means that  untagged images can be deleted when the
   * policy runs.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public setRetentionPolicy(
    params: ContainerRegistryV1.SetRetentionPolicyParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['namespace'];
    const _validParams = ['namespace', 'imagesPerRepo', 'retainUntagged', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'namespace': _params.namespace,
      'images_per_repo': _params.imagesPerRepo,
      'retain_untagged': _params.retainUntagged,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'setRetentionPolicy');

    const parameters = {
      options: {
        url: '/api/v1/retentions',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Analyze retention policy.
   *
   * Analyze a retention policy, and get a list of what would be deleted by it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.namespace - The namespace to which the retention policy is attached.
   * @param {number} [params.imagesPerRepo] - Determines how many images are retained in each repository when the
   * retention policy is processed. The value -1 denotes 'Unlimited' (all images are retained).
   * @param {boolean} [params.retainUntagged] - Determines whether untagged images are retained when the retention
   * policy is processed. The value is false by default, which means that  untagged images can be deleted when the
   * policy runs.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>>}
   */
  public analyzeRetentionPolicy(
    params: ContainerRegistryV1.AnalyzeRetentionPolicyParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>> {
    const _params = { ...params };
    const _requiredParams = ['namespace'];
    const _validParams = ['namespace', 'imagesPerRepo', 'retainUntagged', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'namespace': _params.namespace,
      'images_per_repo': _params.imagesPerRepo,
      'retain_untagged': _params.retainUntagged,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'analyzeRetentionPolicy');

    const parameters = {
      options: {
        url: '/api/v1/retentions/analyze',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get retention policy.
   *
   * Get the retention policy for the specified namespace.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.namespace - Gets the retention policy for the specified namespace.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RetentionPolicy>>}
   */
  public getRetentionPolicy(
    params: ContainerRegistryV1.GetRetentionPolicyParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RetentionPolicy>> {
    const _params = { ...params };
    const _requiredParams = ['namespace'];
    const _validParams = ['namespace', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'namespace': _params.namespace,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getRetentionPolicy');

    const parameters = {
      options: {
        url: '/api/v1/retentions/{namespace}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * settings
   ************************/

  /**
   * Get account settings.
   *
   * Get account settings for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.AccountSettings>>}
   */
  public getSettings(
    params?: ContainerRegistryV1.GetSettingsParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.AccountSettings>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'getSettings');

    const parameters = {
      options: {
        url: '/api/v1/settings',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update account settings.
   *
   * Update settings for the targeted account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.platformMetrics] - Opt in to IBM Cloud Container Registry publishing platform metrics.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public updateSettings(
    params?: ContainerRegistryV1.UpdateSettingsParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['platformMetrics', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'platform_metrics': _params.platformMetrics,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSettings');

    const parameters = {
      options: {
        url: '/api/v1/settings',
        method: 'PATCH',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * tags
   ************************/

  /**
   * Delete tag.
   *
   * Untag a container image in the registry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.image - The name of the image that you want to delete, in the format
   * &lt;REPOSITORY&gt;:&lt;TAG&gt;.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDeleteResult>>}
   */
  public deleteImageTag(
    params: ContainerRegistryV1.DeleteImageTagParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.ImageDeleteResult>> {
    const _params = { ...params };
    const _requiredParams = ['image'];
    const _validParams = ['image', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'image': _params.image,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteImageTag');

    const parameters = {
      options: {
        url: '/api/v1/tags/{image}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * trash
   ************************/

  /**
   * List deleted images.
   *
   * List all images that are in the trash can.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.namespace] - Limit results to trash can images in the given namespace only.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>>}
   */
  public listDeletedImages(
    params?: ContainerRegistryV1.ListDeletedImagesParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.JsonObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['namespace', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'namespace': _params.namespace,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'listDeletedImages');

    const parameters = {
      options: {
        url: '/api/v1/trash',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restore a digest and all associated tags.
   *
   * In the targeted region, restore a digest, and all of its tags in the same repository, from the trash.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.digest - The full IBM Cloud registry digest reference for the digest that you want to
   * restore such as `icr.io/namespace/repo@sha256:a9be...`. Call the `GET /trash/json` endpoint to review digests that
   * are in the trash and their tags in the same repository.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RestoreResult>>}
   */
  public restoreTags(
    params: ContainerRegistryV1.RestoreTagsParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.RestoreResult>> {
    const _params = { ...params };
    const _requiredParams = ['digest'];
    const _validParams = ['digest', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'digest': _params.digest,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'restoreTags');

    const parameters = {
      options: {
        url: '/api/v1/trash/{digest}/restoretags',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restore deleted image.
   *
   * Restore an image from the trash can.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.image - The name of the image that you want to restore, in the format
   * &lt;REPOSITORY&gt;:&lt;TAG&gt;. Run `ibmcloud cr trash-list` or call the `GET /trash/json` endpoint to review
   * images that are in the trash.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>>}
   */
  public restoreImage(
    params: ContainerRegistryV1.RestoreImageParams
  ): Promise<ContainerRegistryV1.Response<ContainerRegistryV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['image'];
    const _validParams = ['image', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'image': _params.image,
    };

    const sdkHeaders = getSdkHeaders(ContainerRegistryV1.DEFAULT_SERVICE_NAME, 'v1', 'restoreImage');

    const parameters = {
      options: {
        url: '/api/v1/trash/{image}/restore',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Account': this.account,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace ContainerRegistryV1 {
  /** Options for the `ContainerRegistryV1` constructor. */
  export interface Options extends UserOptions {
    /** The unique ID for your IBM Cloud account. */
    account: string;
  }

  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getAuth` operation. */
  export interface GetAuthParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAuth` operation. */
  export interface UpdateAuthParams {
    /** Enable role based authorization when authenticating with IBM Cloud IAM. */
    iamAuthz?: boolean;
    /** Restrict account to only be able to push and pull images over private connections. */
    privateOnly?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listImages` operation. */
  export interface ListImagesParams {
    /** Lists images that are stored in the specified namespace only. Query multiple namespaces by specifying this
     *  option for each namespace. If this option is not specified, images from all namespaces in the specified IBM
     *  Cloud account are listed.
     */
    namespace?: string;
    /** Includes IBM-provided public images in the list of images. If this option is not specified, private images
     *  are listed only. If this option is specified more than once, the last parsed setting is the setting that is
     *  used.
     */
    includeIbm?: boolean;
    /** Includes private images in the list of images. If this option is not specified, private images are listed.
     *  If this option is specified more than once, the last parsed setting is the setting that is used.
     */
    includePrivate?: boolean;
    /** Includes tags that reference multi-architecture manifest lists in the image list. If this option is not
     *  specified, tagged manifest lists are not shown in the list. If this option is specified more than once, the last
     *  parsed setting is the setting that is used.
     */
    includeManifestLists?: boolean;
    /** Displays Vulnerability Advisor status for the listed images. If this option is specified more than once, the
     *  last parsed setting is the setting that is used.
     */
    vulnerabilities?: boolean;
    /** Lists images that are stored in the specified repository, under your namespaces. Query multiple repositories
     *  by specifying this option for each repository. If this option is not specified, images from all repos are
     *  listed.
     */
    repository?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `bulkDeleteImages` operation. */
  export interface BulkDeleteImagesParams {
    /** The full IBM Cloud registry path to the images that you want to delete, including its digest. All tags for
     *  the supplied digest are removed.
     */
    bulkDelete: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listImageDigests` operation. */
  export interface ListImageDigestsParams {
    /** ExcludeTagged returns only untagged digests. */
    excludeTagged?: boolean;
    /** ExcludeVA returns the digest list with no VA scan results. */
    excludeVa?: boolean;
    /** When true, API will return the IBM public images if they exist in the targeted region. */
    includeIbm?: boolean;
    /** Repositories in which to restrict the output. If left empty all images for the account will be returned. */
    repositories?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `tagImage` operation. */
  export interface TagImageParams {
    /** The name of the image that you want to create a new tag for, in the format &lt;REPOSITORY&gt;:&lt;TAG&gt;.
     *  Run `ibmcloud cr images` or call the `GET /images/json` endpoint to review images that are in the registry.
     */
    fromimage: string;
    /** The new tag for the image, in the format &lt;REPOSITORY&gt;:&lt;TAG&gt;. */
    toimage: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteImage` operation. */
  export interface DeleteImageParams {
    /** The full IBM Cloud registry path to the image that you want to delete, including its tag. If you do not
     *  provide a specific tag, the version with the `latest` tag is removed.
     */
    image: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `inspectImage` operation. */
  export interface InspectImageParams {
    /** The full IBM Cloud registry path to the image that you want to inspect. Run `ibmcloud cr images` or call the
     *  `GET /images/json` endpoint to review images that are in the registry.
     */
    image: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getImageManifest` operation. */
  export interface GetImageManifestParams {
    /** The full IBM Cloud registry path to the image that you want to inspect. Run `ibmcloud cr images` or call the
     *  `GET /images/json` endpoint to review images that are in the registry.
     */
    image: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMessages` operation. */
  export interface GetMessagesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNamespaces` operation. */
  export interface ListNamespacesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listNamespaceDetails` operation. */
  export interface ListNamespaceDetailsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createNamespace` operation. */
  export interface CreateNamespaceParams {
    /** The name of the namespace that you want to create. */
    name: string;
    /** The ID of the resource group to which you want to add the namespace. */
    xAuthResourceGroup?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `assignNamespace` operation. */
  export interface AssignNamespaceParams {
    /** The ID of the resource group to which you want to add the namespace. */
    xAuthResourceGroup: string;
    /** The name of the namespace that you want to udpate. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNamespace` operation. */
  export interface DeleteNamespaceParams {
    /** The name of the namespace that you want to delete. */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPlans` operation. */
  export interface GetPlansParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePlans` operation. */
  export interface UpdatePlansParams {
    plan?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getQuota` operation. */
  export interface GetQuotaParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateQuota` operation. */
  export interface UpdateQuotaParams {
    /** Storage quota in megabytes. The value -1 denotes "Unlimited". */
    storageMegabytes?: number;
    /** Traffic quota in megabytes. The value -1 denotes "Unlimited". */
    trafficMegabytes?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listRetentionPolicies` operation. */
  export interface ListRetentionPoliciesParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setRetentionPolicy` operation. */
  export interface SetRetentionPolicyParams {
    /** The namespace to which the retention policy is attached. */
    namespace: string;
    /** Determines how many images are retained in each repository when the retention policy is processed. The value
     *  -1 denotes 'Unlimited' (all images are retained).
     */
    imagesPerRepo?: number;
    /** Determines whether untagged images are retained when the retention policy is processed. The value is false
     *  by default, which means that  untagged images can be deleted when the policy runs.
     */
    retainUntagged?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `analyzeRetentionPolicy` operation. */
  export interface AnalyzeRetentionPolicyParams {
    /** The namespace to which the retention policy is attached. */
    namespace: string;
    /** Determines how many images are retained in each repository when the retention policy is processed. The value
     *  -1 denotes 'Unlimited' (all images are retained).
     */
    imagesPerRepo?: number;
    /** Determines whether untagged images are retained when the retention policy is processed. The value is false
     *  by default, which means that  untagged images can be deleted when the policy runs.
     */
    retainUntagged?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRetentionPolicy` operation. */
  export interface GetRetentionPolicyParams {
    /** Gets the retention policy for the specified namespace. */
    namespace: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSettings` operation. */
  export interface GetSettingsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSettings` operation. */
  export interface UpdateSettingsParams {
    /** Opt in to IBM Cloud Container Registry publishing platform metrics. */
    platformMetrics?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteImageTag` operation. */
  export interface DeleteImageTagParams {
    /** The name of the image that you want to delete, in the format &lt;REPOSITORY&gt;:&lt;TAG&gt;. */
    image: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDeletedImages` operation. */
  export interface ListDeletedImagesParams {
    /** Limit results to trash can images in the given namespace only. */
    namespace?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `restoreTags` operation. */
  export interface RestoreTagsParams {
    /** The full IBM Cloud registry digest reference for the digest that you want to restore such as
     *  `icr.io/namespace/repo@sha256:a9be...`. Call the `GET /trash/json` endpoint to review digests that are in the
     *  trash and their tags in the same repository.
     */
    digest: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `restoreImage` operation. */
  export interface RestoreImageParams {
    /** The name of the image that you want to restore, in the format &lt;REPOSITORY&gt;:&lt;TAG&gt;. Run `ibmcloud
     *  cr trash-list` or call the `GET /trash/json` endpoint to review images that are in the trash.
     */
    image: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Account settings for the targeted IBM Cloud account.
   */
  export interface AccountSettings {
    /** Opt in to IBM Cloud Container Registry publishing platform metrics. */
    platform_metrics?: boolean;
  }

  /**
   * The authorization options for the targeted IBM Cloud account.
   */
  export interface AuthOptions {
    /** Enable role based authorization when authenticating with IBM Cloud IAM. */
    iam_authz?: boolean;
    /** Restrict account to only be able to push and pull images over private connections. */
    private_only?: boolean;
  }

  /**
   * The configuration data about a container.
   */
  export interface Config {
    /** True if command is already escaped (Windows specific). */
    ArgsEscaped?: boolean;
    /** If true, standard error is attached. */
    AttachStderr?: boolean;
    /** If true, standard input is attached, which makes possible user interaction. */
    AttachStdin?: boolean;
    /** If true, standard output is attached. */
    AttachStdout?: boolean;
    /** Command that is run when starting the container. */
    Cmd?: string[];
    /** The FQDN for the container. */
    Domainname?: string;
    /** Entrypoint to run when starting the container. */
    Entrypoint?: string[];
    /** List of environment variables to set in the container. */
    Env?: string[];
    /** A list of exposed ports in a format [123:{},456:{}]. */
    ExposedPorts?: JsonObject;
    Healthcheck?: HealthConfig;
    /** The host name of the container. */
    Hostname?: string;
    /** Name of the image as it was passed by the operator (eg. could be symbolic). */
    Image?: string;
    /** List of labels set to this container. */
    Labels?: JsonObject;
    /** The MAC Address of the container. */
    MacAddress?: string;
    /** If true, containers are not given network access. */
    NetworkDisabled?: boolean;
    /** ONBUILD metadata that were defined on the image Dockerfile
     *  https://docs.docker.com/engine/reference/builder/#onbuild.
     */
    OnBuild?: string[];
    /** Open stdin. */
    OpenStdin?: boolean;
    /** Shell for shell-form of RUN, CMD, ENTRYPOINT. */
    Shell?: string[];
    /** If true, close stdin after the 1 attached client disconnects. */
    StdinOnce?: boolean;
    /** Signal to stop a container. */
    StopSignal?: string;
    /** Timeout (in seconds) to stop a container. */
    StopTimeout?: number;
    /** Attach standard streams to a tty, including stdin if it is not closed. */
    Tty?: boolean;
    /** The user that will run the command(s) inside the container. */
    User?: string;
    /** List of volumes (mounts) used for the container. */
    Volumes?: JsonObject;
    /** Current working directory (PWD) in the command will be launched. */
    WorkingDir?: string;
  }

  /**
   * HealthConfig.
   */
  export interface HealthConfig {
    /** A Duration represents the elapsed time between two instants as an int64 nanosecond count. */
    Interval?: number;
    /** The number of consecutive failures needed to consider a container as unhealthy. Zero means inherit. */
    Retries?: number;
    /** The test to perform to check that the container is healthy. An empty slice means to inherit the default. The
     *  options are:
     *  {} : inherit healthcheck
     *  {"NONE"} : disable healthcheck
     *  {"CMD", args...} : exec arguments directly
     *  {"CMD-SHELL", command} : run command with system's default shell.
     */
    Test?: string[];
    /** A Duration represents the elapsed time between two instants as an int64 nanosecond count. */
    Timeout?: number;
  }

  /**
   * Information about a failure to delete an image as part of a bulk delete.
   */
  export interface ImageBulkDeleteError {
    /** An API error code. */
    code?: string;
    /** The English text message associated with the error code. */
    message?: string;
  }

  /**
   * The results of a bulk image delete request.
   */
  export interface ImageBulkDeleteResult {
    /** A map of digests to the error object that explains the failure. */
    error?: JsonObject;
    /** A list of digests which were deleted successfully. */
    success?: string[];
  }

  /**
   * ImageDeleteResult.
   */
  export interface ImageDeleteResult {
    Untagged?: string;
  }

  /**
   * Important information about an image.
   */
  export interface ImageDigest {
    /** The build date of the image. */
    created?: number;
    /** The image digest. */
    id?: string;
    /** The type of the image, such as 'Docker Image Manifest V2, Schema 2' or 'OCI Image Manifest v1'. */
    manifestType?: string;
    /** A map of image repositories to tags. */
    repoTags?: JsonObject;
    /** The size of the image in bytes. */
    size?: number;
  }

  /**
   * An image JSON output consistent with the Docker Remote API.
   */
  export interface ImageInspection {
    /** The processor architecture used to build this image, and required to run it. */
    Architecture?: string;
    /** The author of the image. */
    Author?: string;
    /** A plain text description of the image. */
    Comment?: string;
    /** The configuration data about a container. */
    Config?: Config;
    /** The ID of the container which created this image. */
    Container?: string;
    /** The configuration data about a container. */
    ContainerConfig?: Config;
    /** The unix timestamp for the date when the image was created. */
    Created?: string;
    /** The Docker version used to build this image. */
    DockerVersion?: string;
    /** The image ID. */
    Id?: string;
    /** Media type of the manifest for the image. */
    ManifestType?: string;
    /** The operating system family used to build this image, and required to run it. */
    Os?: string;
    /** The version of the operating system used to build this image. */
    OsVersion?: string;
    /** The ID of the base image for this image. */
    Parent?: string;
    /** RootFS contains information about the root filesystem of a container image. */
    RootFS?: RootFS;
    /** The size of the image in bytes. */
    Size?: number;
    /** The sum of the size of each layer in the image in bytes. */
    VirtualSize?: number;
  }

  /**
   * Namespace.
   */
  export interface Namespace {
    namespace?: string;
  }

  /**
   * Details of a namespace.
   */
  export interface NamespaceDetails {
    /** The IBM Cloud account that owns the namespace. */
    account?: string;
    /** The creation date of the namespace. */
    created_date?: string;
    /** If the namespace is assigned to a resource group, the IBM Cloud CRN representing the namespace. */
    crn?: string;
    name?: string;
    /** The date that the namespace was assigned to a resource group. */
    resource_created_date?: string;
    /** The ID of the resource group to which the namespace is assigned. */
    resource_group?: string;
    /** The date that the namespace was last updated. */
    updated_date?: string;
  }

  /**
   * The plan for the targeted IBM Cloud account.
   */
  export interface Plan {
    plan?: string;
  }

  /**
   * Current usage and limits for the targeted IBM Cloud account.
   */
  export interface Quota {
    limit?: QuotaDetails;
    usage?: QuotaDetails;
  }

  /**
   * QuotaDetails.
   */
  export interface QuotaDetails {
    /** Storage quota or usage in bytes. The value -1 denotes "Unlimited". */
    storage_bytes?: number;
    /** Traffic quota or usage in bytes. The value -1 denotes "Unlimited". */
    traffic_bytes?: number;
  }

  /**
   * Information about an image, in a format consistent with the Docker Remote API format.
   */
  export interface RemoteAPIImage {
    ConfigurationIssueCount?: number;
    Created?: number;
    DigestTags?: JsonObject;
    ExemptIssueCount?: number;
    Id?: string;
    IssueCount?: number;
    Labels?: JsonObject;
    ManifestType?: string;
    ParentId?: string;
    RepoDigests?: string[];
    RepoTags?: string[];
    Size?: number;
    VirtualSize?: number;
    VulnerabilityCount?: number;
    Vulnerable?: string;
  }

  /**
   * The result of restoring tags for a digest. In a successful request the digest is always restored, and zero or more
   * of its tags may be restored.
   */
  export interface RestoreResult {
    /** Successful is a list of tags that were restored. */
    successful?: string[];
    /** Unsuccessful is a list of tags that were not restored because of a conflict. */
    unsuccessful?: string[];
  }

  /**
   * A document that contains the image retention settings for a namespace.
   */
  export interface RetentionPolicy {
    /** Determines how many images are retained in each repository when the retention policy is processed. The value
     *  -1 denotes 'Unlimited' (all images are retained).
     */
    images_per_repo?: number;
    /** The namespace to which the retention policy is attached. */
    namespace: string;
    /** Determines whether untagged images are retained when the retention policy is processed. The value is false
     *  by default, which means that  untagged images can be deleted when the policy runs.
     */
    retain_untagged?: boolean;
  }

  /**
   * RootFS contains information about the root filesystem of a container image.
   */
  export interface RootFS {
    /** Descriptor for the base layer in the image. */
    BaseLayer?: string;
    /** Descriptors for each layer in the image. */
    Layers?: string[];
    /** The type of filesystem. */
    Type?: string;
  }

  /**
   * Details of the tags and days until expiry.
   */
  export interface Trash {
    daysUntilExpiry?: number;
    tags?: string[];
  }

  /**
   * The VA Report for a given image.
   */
  export interface VAReport {
    /** Number of configuration issues in the image. */
    configurationIssueCount?: number;
    /** Total number of issues in the image that were exempted by an exemption policy. */
    exemptIssueCount?: number;
    /** Total number of issues in the image. */
    issueCount?: number;
    /** Number of vulnerabilities in the image. */
    vulnerabilityCount?: number;
    /** Summary of vulnerability status. */
    vulnerable?: string;
  }
}

export = ContainerRegistryV1;

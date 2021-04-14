/* eslint-disable no-console */
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
const ContainerRegistryV1 = require('../../dist/container-registry/v1');
const authHelper = require('../resources/auth-helper.js');
const utilf = require('util');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'container_registry_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('ContainerRegistryV1_integration', () => {
  const regOptions = authHelper.loadConfig();
  const configNamespace = regOptions.CONTAINER_REGISTRY_NAMESPACE;
  const configAccount = regOptions.CONTAINER_REGISTRY_ACCOUNT_ID;
  const configResouceGroupID = regOptions.CONTAINER_REGISTRY_RESOURCE_GROUP_ID;
  const configSeedImage = regOptions.CONTAINER_REGISTRY_SEED_IMAGE;
  const configSeedDigest = regOptions.CONTAINER_REGISTRY_SEED_DIGEST;
  const configRegistryDNSName = regOptions.CONTAINER_REGISTRY_URL.replace('https://', '');

  const containerRegistryService = ContainerRegistryV1.newInstance({
    account: configAccount,
  });

  expect(containerRegistryService).not.toBeNull();

  jest.setTimeout(timeout);

  let gotNamespace;

  test('createNamespace()', async () => {
    const params = {
      name: configNamespace,
    };

    const res = await containerRegistryService.createNamespace(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    gotNamespace = res.result.namespace;
  });
  test('getAuth()', async () => {
    const res = await containerRegistryService.getAuth();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.iam_authz).toBe(true);
  });
  test('updateAuth()', async () => {
    const params = {
      iamAuthz: true,
    };

    const res = await containerRegistryService.updateAuth(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('tagImage()', async () => {
    const params = {
      fromimage: utilf.format('%s/%s', configRegistryDNSName, configSeedImage),
      toimage: utilf.format('%s/%s/sdktest:1', configRegistryDNSName, gotNamespace),
    };

    const res = await containerRegistryService.tagImage(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listImages()', async () => {
    const params = {
      namespace: configNamespace,
      includeIbm: false,
      includePrivate: true,
      includeManifestLists: true,
      vulnerabilities: true,
    };

    const res = await containerRegistryService.listImages(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result[0].RepoTags[0]).toBe(
      utilf.format('%s/%s/sdktest:1', configRegistryDNSName, gotNamespace)
    );
  });
  test('bulkDeleteImages()', async () => {
    const params = {
      bulkDelete: [utilf.format('%s/%s/notexist:1', configRegistryDNSName, gotNamespace)],
    };

    const res = await containerRegistryService.bulkDeleteImages(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listImageDigests()', async () => {
    const params = {
      excludeTagged: false,
      excludeVa: false,
      includeIbm: false,
    };

    const res = await containerRegistryService.listImageDigests(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    const repo = utilf.format('%s/%s/sdktest', configRegistryDNSName, gotNamespace);
    let found = false;
    for (const resultItem of res.result) {
      if (resultItem.repoTags[repo]) {
        found = true;
      }
    }
    expect(found).toBe(true);
  });
  test('inspectImage()', async () => {
    const params = {
      image: utilf.format('%s/%s/sdktest:1', configRegistryDNSName, gotNamespace),
    };

    const res = await containerRegistryService.inspectImage(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getImageManifest()', async () => {
    const params = {
      image: utilf.format('%s/%s/sdktest:1', configRegistryDNSName, gotNamespace),
    };

    const res = await containerRegistryService.getImageManifest(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.schemaVersion).toEqual(2);
  });
  test('getMessages()', async () => {
    const res = await containerRegistryService.getMessages();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listNamespaces()', async () => {
    const res = await containerRegistryService.listNamespaces();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result).toContain(gotNamespace);
  });
  test('listNamespaceDetails()', async () => {
    const res = await containerRegistryService.listNamespaceDetails();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result[0]).toBeDefined();
  });
  test('assignNamespace()', async () => {
    const params = {
      xAuthResourceGroup: configResouceGroupID,
      name: gotNamespace,
    };

    const res = await containerRegistryService.assignNamespace(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getPlans()', async () => {
    const res = await containerRegistryService.getPlans();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  // test('updatePlans()', async () => {
  //   const params = {
  //     plan: 'Standard',
  //   };

  //   const res = await containerRegistryService.updatePlans(params);
  //   expect(res).toBeDefined();
  //   expect(res.result).toBeDefined();
  // });

  test('updateQuota()', async () => {
    const params = {
      storageMegabytes: 500,
      trafficMegabytes: 4900,
    };
    const res = await containerRegistryService.updateQuota(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getQuota()', async () => {
    const res = await containerRegistryService.getQuota();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.limit.storage_bytes).toEqual(524288000);
  });
  test('listRetentionPolicies()', async () => {
    const res = await containerRegistryService.listRetentionPolicies();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('setRetentionPolicy()', async () => {
    const params = {
      imagesPerRepo: 10,
      namespace: gotNamespace,
      retainUntagged: false,
    };

    const res = await containerRegistryService.setRetentionPolicy(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('analyzeRetentionPolicy()', async () => {
    const params = {
      imagesPerRepo: 10,
      namespace: gotNamespace,
      retainUntagged: false,
    };

    const res = await containerRegistryService.analyzeRetentionPolicy(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('getRetentionPolicy()', async () => {
    const params = {
      namespace: gotNamespace,
    };

    const res = await containerRegistryService.getRetentionPolicy(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.images_per_repo).toEqual(10);
  });

  test('getSettings()', async () => {
    const res = await containerRegistryService.getSettings();
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateSettings()', async () => {
    const params = {
      platformMetrics: false,
    };

    const res = await containerRegistryService.updateSettings(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteImageTag()', async () => {
    const params = {
      image: utilf.format('%s/%s/sdktest:1', configRegistryDNSName, gotNamespace),
    };

    const res = await containerRegistryService.deleteImageTag(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('deleteImage()', async () => {
    const params = {
      image: utilf.format(
        '%s/%s/sdktest@%s',
        configRegistryDNSName,
        gotNamespace,
        configSeedDigest
      ),
    };

    const res = await containerRegistryService.deleteImage(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listDeletedImages()', async () => {
    const params = {
      namespace: gotNamespace,
    };

    const res = await containerRegistryService.listDeletedImages(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    const deletedIm = utilf.format(
      '%s/%s/sdktest@%s',
      configRegistryDNSName,
      gotNamespace,
      configSeedDigest
    );
    expect(res.result[deletedIm]).toBeDefined();
  });
  test('restoreTags()', async () => {
    const params = {
      digest: utilf.format(
        '%s/%s/sdktest@%s',
        configRegistryDNSName,
        gotNamespace,
        configSeedDigest
      ),
    };

    const res = await containerRegistryService.restoreTags(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('restoreImage()', done => {
    const params = {
      image: utilf.format('%s/%s/sdktest:nope', configRegistryDNSName, gotNamespace),
    };

    containerRegistryService
      .restoreImage(params)
      .then(res => {
        done(res);
      })
      .catch(err => {
        expect(err.status).toEqual(404);
        done();
      });
  });
  test('deleteNamespace()', async () => {
    const params = {
      name: gotNamespace,
    };

    const res = await containerRegistryService.deleteNamespace(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});

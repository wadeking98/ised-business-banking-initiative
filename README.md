[![img](https://img.shields.io/badge/Lifecycle-Maturing-007EC6)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

# ISED Business Banking Initiative

Proof-of-Concept showcasing how directors and other authorized personnel could be able to authenticate and perform business banking tasks on behalf of their Organization by using Digitally Verifiable Credentials.

This repository contains the build, deployment, and application configurations needed to pull a number of separate applications into a single environment and deploy them as a group of interrelated services.

## Managing the Configurations

This repository contains a set of [openshift-developer-tools](https://github.com/BCDevOps/openshift-developer-tools/tree/master/bin) compatible OpenShift configurations

For information on how to use these configurations with the `openshift-developer-tools scripts` please refer to the documentation; [README.md](https://github.com/BCDevOps/openshift-developer-tools/blob/master/bin/README.md).

### Managing Profiles

The application components are managed using a set of profiles.

To list the profile and their descriptions run:

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -p default -e null listProfiles

Loading settings ...
Loading settings from /c/ised-business-banking-initiative/openshift/settings.sh ...

bcreg-base - settings.bcreg-base.sh
  - BC Registries base profile
bcreg-registration - settings.bcreg-registration.sh
  - BC Registries Organization Registration credential issuer profile
bcreg-relations - settings.bcreg-relations.sh
  - BC Registries Verified Organization Relationship credential issuer profile
business-bank - settings.business-bank.sh
  - Business Bank verifier profile
bcgov-citz - settings.bcgov-citz.sh
  - BC Gov Verified Person credential issuer profile
default - settings.sh
```

To get the details of a specific profile run:

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -p bcreg-base -e null profileDetails

Loading settings ...
Loading settings from /c/ised-business-banking-initiative/openshift/settings.sh ...
Loading settings from /c/ised-business-banking-initiative/openshift/settings.bcreg-base.sh ...

bcreg-base - settings.bcreg-base.sh
  - Credential issuer profile
  - ../openshift/templates/agent/agent-build.yaml
  - ../openshift/templates/api/api-build.yaml
  - ../openshift/templates/db/db-build.yaml
  - ../openshift/templates/wallet/wallet-build.yaml
  - ../openshift/templates/agent/agent-deploy.yaml
  - ../openshift/templates/api/api-deploy.yaml
  - ../openshift/templates/db/db-deploy.yaml
  - ../openshift/templates/wallet/wallet-deploy.yaml
```

To publish or update the settings and configuration for all application profiles you can use the `deployAllProfiles` helper command in the `manage` script, for example;

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -p default -e test -u deployAllProfiles
```

- To update all profiles in the test environment.

To publish or update a given profile or a given component within a profile you would use the `genDepls.sh` script. for example;

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ genDepls.sh -p bcgov-citz -e test -u -c issuer-web
```

- To update the `issuer-web` component of the `bcgov-citz` profile.

### Generating New Profiles

For `Credential issuer` and `Visual verifier` there are helper commands that allow you to create the scaffolding for a new profile from an existing one; `createNewIssuerProfile` and `createNewVerifierProfile`. Examples of how to use these commands can be found in the help documentation for the `manage` script by running;

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -h
```

### Creating or Updating Proof Configurations

New or updated proof configurations need to be registered with the vc-authn-oidc-controller associated with the demo environment. The `manage` script includes a helper command to assist with this task, `configureProof`. Examples of how to use this command can be found in the help documentation for the `manage` script by running;

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -h
```

### Managing the Environments

The `manage` script includes a number of helper commands to help manage the environment. For a list of these commands and examples of how to use them run:

```shell
esune@workstation MINGW64 /c/ised-business-banking-initiative/openshift
$ ./manage -h
```

## Getting Help or Reporting an Issue

To report bugs/issues/feature requests, please file an [issue](../../issues).

## How to Contribute

If you would like to contribute, please see our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.

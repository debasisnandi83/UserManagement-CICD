1 - azure login
az login
2 - list of account in AKS
az account list

3 - list of azure kubernetes service
az aks list -o table 

4 - get all kubernetes cluser from local config 
kubectl config get-contexts

5 - sync between local config and aks cluster
az aks get-credentials --name kc-usermanagement-exp1 --resource-group rg-usermanagement-exp1  

6 - switch between different kubernetes cluster
kubectl config use-context kc-usermanagement

7 - Example-1 : CICD

1 - Task created in aks
-> create resourec group(rg-usermanagement-exp1)
-> create container registry(acrusermanagementexp1)
-> create kubernetes cluster(kc-usermanagement-exp1)

2 - Task created in devops
-> create project(usermanagement)
-> create service connection
    - github(github_debasisnandi83)
    - aks(aks-debasisnandi)
    - docker registry for acr(docker-registry-acr)
-> create environment and add to aks namespace(user-management)

3 - create pipelines in azure devops
-> Connect: GitHub
-> Select: Repository -> specific connection->github_debasisnandi83->debasisnandi83/UserManagement-CICD
-> Configure: Deploy to azure kubernetes service(This option is visible when there is no azure-pipeline.yaml file available)
              -> Select Subscription-> select cluser-> select namespacr-> image name
-> Review: azure-pipelines.yaml (Update variables based on manifests->deployment.yaml and service.yaml)
-> save & run

Note: Follow these article:
https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/kubernetes/aks-template?view=azure-devops
https://devblogs.microsoft.com/devops/announcing-kubernetes-integration-for-azure-pipelines/

Important Parametes in azure-pipelines.yaml:
- trigger: to set if the pipeline should be running when branches changed
- pr: to set if the pipeline should be running for pull requests
- schedules: to set if the pipeline should be running at fixed times
- pool: to define where the build agent should be running
- resources: to define what other resources your pipeline needs to consume
- variables: to define variables and their values
- parameters: to define input parameters for the pipeline template
- stages: to define the stages (consists of jobs)
- jobs: to define the different jobs (consists of steps)
- steps: to define what steps to take
- template: to allow referencing other (YAML) files





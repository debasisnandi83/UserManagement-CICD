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

ACR User:
acrusermanagementexp1.azurecr.io
Password:
vl03f+Sdt0UkGrWy/Q4nKeRXEY9Rh6w/

subcription Id:
bc868eaa-9652-4850-afe5-e9c8851426bf

https://blog.georgekosmidis.net/2020/06/14/troubleshooting-you-dont-appear-to-have-an-active-azure-subscription/

Example-1 : CICD

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

3 - create pipelines
-> Connect: GitHub
-> Select: Repository -> specific connection->github_debasisnandi83->debasisnandi83/UserManagement-CICD
-> Configure: Deploy to azure kubernetes service(This option is visible when there is no azure-pipeline.yaml file available)
              -> Select Subscription-> select cluser-> select namespacr-> image name
-> Review: azure-pipelines.yaml (Update variables based on manifests->deployment.yaml and service.yaml)
-> run








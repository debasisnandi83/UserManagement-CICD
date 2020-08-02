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
-> create environment and add to aks namespace(user-management)

3 - create pipelines
-> Connect: GitHub
-> Select: Repository(debasisnandi83/UserManagement-CICD)
-> Configure: 
-> Review: azure-pipelines.yaml
-> run







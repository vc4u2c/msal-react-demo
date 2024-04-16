# MSALCreateReactDemo

- [Using MSAL.js to integrate React SPA with Azure AD](https://www.youtube.com/watch?v=7oPSL5wWeS0)

## Initial Setup

```bash
cd .\Documents\Source\Repos\React\
git clone https://github.com/derisen/msal-react-demo.git
code . -r

# Install Dependencies
npm i

# Start the application
npm start
#CTRL + C to end

# Install MSAL
npm i --save @azure/msal-browser @azure/msal-react
```

## Azure Entra Id Setup

```bash

# Login to zure
az login

# Set active subscription
az account set --subscription "sub-vc4u2c-demo"

# Create Resource Group
az group create --name rg-msalreactdemo-dev --location eastus

# Create Microsoft Entra Id Tenant
$env:AZURE_SUBSCRIPTION=az account show --query "id" -o tsv
$env:AZURE_RESOURCE_GROUP="rg-msalreactdemo-dev"
$env:DOMAIN="b2cvc4u2cmsaldemodev"
$env:LOCATION="eastus"

az rest --method put --url https://management.azure.com/subscriptions/$env:AZURE_SUBSCRIPTION/resourceGroups/$env:AZURE_RESOURCE_GROUP/providers/Microsoft.AzureActiveDirectory/b2cDirectories/$env:DOMAIN.onmicrosoft.com?api-version=2021-04-01 --body "{'location': 'United States', 'sku': {'name': 'Standard', 'tier': 'A0'}, 'properties': {'createTenantProperties': {'displayName': 'b2c-vc4u2cmsaldemo-dev', 'countryCode': 'US'}}}" --verbose

# List the tenants
az account tenant list

# Delete
az rest --method delete --url https://management.azure.com/subscriptions/$env:AZURE_SUBSCRIPTION/resourceGroups/$env:AZURE_RESOURCE_GROUP/providers/Microsoft.AzureActiveDirectory/b2cDirectories/$env:DOMAIN.onmicrosoft.com?api-version=2021-04-01 --verbose

# Verify if B2C tenant was removed then remove the Resource Group
az group delete --name $env:AZURE_RESOURCE_GROUP

# Login using the newly created
az login --tenant b907d549-84e1-4733-b7be-d459594670c4

# Register a client application using CLI and REST API
# https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application-cli-rest
az --version
az extension add --name account
az extension add --name healthcareapis
az provider register --namespace 'Microsoft.HealthcareApis'
az provider show --namespace Microsoft.HealthcareApis --query "resourceTypes[?resourceType=='services'].locations"

# Create the App registration
az ad app create --display-name "appreg-msalreactdemo-dev" --reply-urls "http://localhost:3000" --available-to-other-tenants false --oauth2-allow-implicit-flow true

az account show --output table

#az ad app create --display-name myappregtest1
# TODO: Without this step, we need to follow manual steps below
# https://helloitsliam.com/2023/12/12/connecting-to-azure-using-azure-cli-with-an-app-registration-and-a-certificate/

az account show

# Switch to the tenant created
# Create manually in Az Portal. Switch to the tenant created.
# Add App Registration
# Name: appreg-msalreactdemo-dev
# Accounts in this organizational directory only (b2c-vc4u2cmsaldemo-dev only - Single tenant)
# SPA, http://localhost:3000
# Click Register
# API Plate Delegate User.Read Permission from Microsoft.Graph
```

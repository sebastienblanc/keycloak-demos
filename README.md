# Keycloak quickstart

This repo contains a frontend and a backend application that are both protected by Keycloak.

## Requirements
* Maven  

## Setup
### Keycloak server

There are different options to deploy and setup a Keycloak server, you can check [here](https://keycloak.gitbooks.io/server-installation-and-configuration/content/topics/installation.html) for the different options but in this quickstart we made it easy by providing a KeyCloak Server based on Wildfly-Swarm :

* Go to `KeycloakServer` folder.
* Run `mvn wildfly-swarm:run`
* Browse to `http://localhost:8081/auth/`
* You will need to create an admin user.
* Browse to the Administration Console : `http://localhost:8081/auth/admin/`

### Import demo realm

* In the [Add realm screen](http://localhost:8081/auth/admin/master/console/#/create/realm) select `sebidemo.json` available in the root of this repo.
* Click `create`

Your Keycloak server is setup and now we can run the applications !

## Backend application

The backend application consist of a simple Java EE Rest Application, running as a microservice with the help of Wildfly-Swarm :

* Go to `CustomerService` folder
* Run `mvn wildfly-swarm:run`
* Browse to `http://localhost:8082/rest/customers` , you should see a `Unauthorized`. That means that your backend is protected

## Frontend applications

The frontend application consist of standalone Web Application build with AngularJS. To make it easy, there is "ready-to-deploy" version (angular-client-embedded) :

* Go to `angular-client-embedded` folder
* Run `mvn wildfly-swarm:run`
* Browse to `http://localhost:9000/`
* You will be redirect to the Keycloak login screen, you use `sebi/password` as credentials
* If you click `Load customers` in the header menu, a list of customers will be retrieved from the microservice we deployed just before. 

__note__ : The folder `angular-client` contains the source of the angular app, you can also run it from there but you will need to have `npm` , `node` and `bower` installed.
To run it :
* npm install 
* bower install
* grunt serve

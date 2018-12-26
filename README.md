Projects:
- usersmanagement - microservice written with NodeJs and mongoDB for users management. 
  Currently has only GET/POST api/v1/users and GET/PUT/DELETE api/v1/users/:id methods. Users are NOT created with the service start, you to create them manually.
- ordersmanagement - microservice written in C# and PostgreSQL for orders management.
  Currently has only GET api/v1/orders and GET api/v1/orders/:id methods. Orders are created with service start, you might want to change userId field in the database
- shopfront - microservice orchestrator. 
  Currently has only GET api/values and GET api/values/:id methods. Makes calls to ordersmanagement and usersmanagement services, aggregates returned data and creates a response.

====================================================
To start everything locally you need to install:
- .net core 2.2 sdk (https://dotnet.microsoft.com/download/dotnet-core/2.2)
- Rider IDE (https://www.jetbrains.com/rider/download/) or Visual Studio
- NodeJs and nmp (https://nodejs.org/en/download/)
- WebStorm (https://www.jetbrains.com/webstorm/download) or Visual Code
- mongoDB (https://docs.mongodb.com/manual/administration/install-community/) and preferrably Robo3T (https://robomongo.org/download)
- PostgreSQL (https://www.postgresql.org/download/) and preferrably pgAdmin (https://www.pgadmin.org/download/)


usersmanagement should be run with environmental variable MONGO_CONNECTION_STRING. It can be set in WebStorm in configurations
Example: mongodb://user:password@host:port/databaseName
You can use mongodb instead of host:port

ordersmanagement should be run with environmental variable ConnectionStrings__PostgresqlConnection. It can be set by running the following command
dotnet user-secrets set "ConnectionStrings:PostgresqlConnection" "[ConnectionString]"
in the OrdersManagement project console
Example: Username=user;Password=password;Host=host;Port=5432;Database=database

To run shopfront you should set usersmanagement and ordersmanagements url in appsettings.Development.json
Example: 
"Services": {
	"OrdersManagement": "localhost:8020",
	"UsersManagement": "localhost:8030"
}

====================================================
Alternatively, you can run everything in Kubernetes. 
In order to do that you need to install (follow the instructions https://kubernetes.io/docs/tasks/tools/install-minikube/):
- VirtualBox
- kubectl
- Minikube

or just follow the instruction from here https://kubernetes.io/docs/setup/pick-right-solution/#local-machine-solutions

To build images you need to install Docker (https://docs.docker.com/install/#reporting-security-issues)

To run everything you need to start minikube by running "minikube start" and run "./apply-all.sh"
Run "minikube service list" to obtain the url of the Ambassador gateway. 
Now you can send requests like http://192.168.99.100:31333/shopfront/api/values
Note, that you need to you prefix /shopfront/ to get access to shopfront microservice, /ordersmanagement/ and /usersmanagement/ to get access to others microservices respectively.
Default databases params:
username=natalie
password=qwerty123
database=admin
These values can be set in [mongo,postgres]-configmap.yaml and [mongo,postgres]-secret.yaml (to create a secret you need to run "echo -n string_value | base64"). Please note, that if you change those values you need to run "minikube ssh", cd to /mnt/disks/mongo and delete all the files there (same for the postgres). After that you need to delete and apply again mongo.yaml and/or postgres.yaml

To rebuild docker image run "docker build -t mnemonike/test:ordersmanagement .". 
To push the built image run "docker push mnemonika/test:ordersmanagement"
Same for usersmanagement and shopfront.

Please note, that usersmanagement, ordersmanagement and shopfront can be accessed only through the gateway, however the databases are exposed directly. Use the ip:port from the results of the "minikube service list" command to attach to them via Robo3T/pgAdmin

That's all, folks!

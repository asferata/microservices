use admin;
db.createUser( { user: "natalie",
                 pwd: "qwerty123",
                 roles: [ { role: "userAdminAnyDatabase", db: "microservices" }, { w: "majority" , wtimeout: 5000 }
             } );

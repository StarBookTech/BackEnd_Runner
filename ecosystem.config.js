module.exports = {
    apps : [
        {
            name: 'RUNNER API',
            script: 'index.js',
            watch: true,
            instances: 1,
            autorestart: true,
            max_memory_restart: '1G',
            //ignore_watch : ["node_modules", "output"],
            env: {
                NODE_ENV: 'local',
                port: 4210,

                dbUserMS: 'app',
                dbPasswordMS: 'A3zhjmB"fsa\\6#80',
                dbServerMS: '35.202.224.172',
                dbPortMS: 1433,
                dbDatabaseNameMS: 'clinic_fer',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',

            },
            env_dev: {
                NODE_ENV: 'development',
                port: 8090,

                dbUserMS: '',
                dbPasswordMS: '',
                dbServerMS: '',
                dbPortMS: 3306,
                dbDatabaseNameMS: '',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',

            },
            env_testing: {
                NODE_ENV: 'testing',
                port: 8080,

                dbUserMS: '',
                dbPasswordMS: '',
                dbServerMS: '',
                dbPortMS: 3306,
                dbDatabaseNameMS: '',
                dbMongoStringConnection: 'mongodb://localhost/epss_session',
                NODE_TLS_REJECT_UNAUTHORIZED : "0"
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ]
}
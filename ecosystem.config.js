module.exports = {
    apps: [
        {
            name: 'Eurasia',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env_dev: {
                "PORT": 8000,
                "HOST": "localhost",
                "NODE_ENV": "development",
            },
            env_prod: {
                "PORT": 8000,
                "HOST": "localhost",
                "NODE_ENV": "production",
            }
        }
    ]
}
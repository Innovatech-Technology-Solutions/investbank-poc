pipeline{
    agent any
    tools {
        nodejs 'node-20.10.0'
    }
    stages{
        stage("Build"){
            steps{
                bat "npm install"
                bat "npm run build"
            }
        }

        stage("Deploy"){
            steps{
                bat """aws s3 rm s3://invest-bank-poc --recursive  --include="*.*" """
                bat """aws s3 cp dist/ s3://invest-bank-poc --recursive """
            }
        }
    }
}

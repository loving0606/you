pipeline {
    agent {
        docker {
            image 'node:14-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install -g cnpm '--registry=https://registry.npm.taobao.org'' 
                sh 'cnpm install' 
                sh 'npm run build' 
            }
        }
        stage('Deploy') { 
            steps {
                sh 'rm -rf /web/*' 
                sh 'cp -a dist/* /web' 
            }
        }
    }
}

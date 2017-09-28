pipeline {
  agent {
    docker {
      image 'node:latest'
    }
    
  }
  stages {
    stage('Init') {
      steps {
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        sh 'npm run eslint'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm run mocha'
      }
    }
  }
}
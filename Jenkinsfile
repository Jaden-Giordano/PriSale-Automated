pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }
    
  }
  stages {
    stage('Init') {
      steps {
        echo 'Installing dependencies'
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
    stage('Finish') {
      steps {
        echo 'Complete!'
      }
    }
  }
}
pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "${env.DOCKER_USER}/guess-the-number"
    IMAGE_TAG   = "${env.BUILD_NUMBER}"
    AWS_DEFAULT_REGION = 'eu-central-1'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Build & Push') {
      steps {
        dir('application') {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh '''
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker build -t $DOCKER_USER/guess-the-number:${BUILD_NUMBER} .
              docker tag $DOCKER_USER/guess-the-number:${BUILD_NUMBER} $DOCKER_USER/guess-the-number:latest
              docker push $DOCKER_USER/guess-the-number:${BUILD_NUMBER}
              docker push $DOCKER_USER/guess-the-number:latest
            '''
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        dir('kubernetes') {
          withCredentials([
            file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE'),
            usernamePassword(credentialsId: 'aws-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')
          ]) {
            sh '''
              export KUBECONFIG=$KUBECONFIG_FILE
              export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
              export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
              export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}
              envsubst < deployment.yaml | kubectl apply -f -
              kubectl apply -f .
              kubectl rollout status deployment/number-guesser --timeout=120s || true
            '''
          }
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}

pipeline {
  agent any

  parameters {
    string(name: 'BRANCH', defaultValue: 'develop', description: 'Choose branch')
  }

  stages {
    stage('Checkout') {
      steps {
          checkout scmGit(branches: [[name: "${params.BRANCH}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'bitbucket', url: "https://narongsak-ch@bitbucket.org/shopdit/${REPOSITORY}.git"]])
          discordSend description: "Started build #${BUILD_NUMBER}", footer: "Branch: ${params.BRANCH}\nCommit: ${GIT_COMMIT.substring(0, 6)}", link: env.BUILD_URL, result: 'UNSTABLE', title: JOB_NAME, webhookURL: DISCORD_URL
      }
    }

    stage('Prepare environment') {
      steps {
        configFileProvider([configFile(fileId: "${REPOSITORY}-${NODE_ENV}.env", targetLocation: '.env')]){}
        sh "echo GIT_COMMIT=${GIT_COMMIT} >> .env"
      }
    }

    // stage('Build') {
    //   steps {
    //     nodejs('v14.18.0') {
    //       sh "yarn install --production=false"
    //       sh "yarn build"
    //     }
    //   }
    // }

    stage('Deploy') {
      steps {
        script {
          try {
            sh(label: 'ECR login and docker push', script:
              '''
              #!/bin/bash
                pwd
                aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin 430168626364.dkr.ecr.ap-southeast-1.amazonaws.com
                eval $(aws ecr get-login --region "$AWS_REGION" --no-include-email)
                # Enable Debug and Exit immediately
                set -xe
                docker build  -t ${REGISTRY}:${GIT_COMMIT} .
                echo "Build image"
                #two push one for master tag other is git commit ID
                docker tag ${REGISTRY}:${GIT_COMMIT} ${REGISTRY}:latest
                docker push ${REGISTRY}:latest
                aws ecs update-service --cluster ${REPOSITORY}-${NODE_ENV} --service ${REPOSITORY}-${NODE_ENV} --force-new-deployment
                docker system prune -a -f
              '''.stripIndent())
          } finally {
            echo "Finished push image"
          }
        }
      }
    }
  }

  post {
    success {
      discordSend description: "Finished build #${BUILD_NUMBER}", footer: "Branch: ${params.BRANCH}\nCommit: ${GIT_COMMIT.substring(0, 6)}", link: env.BUILD_URL, result: 'SUCCESS', title: JOB_NAME, webhookURL: DISCORD_URL
    }
    failure {
      discordSend description: "Failed build #${BUILD_NUMBER}", footer: "Branch: ${params.BRANCH}\nCommit: ${GIT_COMMIT.substring(0, 6)}", link: env.BUILD_URL, result: 'FAILURE', title: JOB_NAME, webhookURL: DISCORD_URL
    }
  }
}

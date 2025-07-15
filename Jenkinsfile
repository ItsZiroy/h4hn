@Library("teckdigital") _
def appName = "h4hn"
def gitOpsRepo = "https://github.com/ItsZiroy/gitops"
def localBranchToGitopsValuesPath = [
    'main': 'apps/h4hn/ui/values.yaml',
]

def cmsEndpoint = "https://cms.h4hn.de"

pipeline {
   agent {
    kubernetes {
        inheritFrom "kaniko-template"
    }
  }
    
    stages {
        stage('Build and Tag Image') {
            steps {
                container('kaniko') {
                    script {
                        withCredentials([
                            string(credentialsId: 'teckdigital-service-user-token', variable: 'SERVICE_USER_TOKEN'),
                            string(credentialsId: 'strapi-token', variable: 'STRAPI_TOKEN')
                        ]) {
                            buildDockerImage(buildArgs: [
                                "GITHUB_AUTH_TOKEN=${SERVICE_USER_TOKEN}",
                                "STRAPI_URL=${cmsEndpoint}",
                                "STRAPI_TOKEN=${STRAPI_TOKEN}"
                            ])
                        }
                    }
                }
            }
        }

        stage('Update GitOps') {
            when {
                expression {
                    return localBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                }
            }
            steps {
                script {
                    def valuesPath = localBranchToGitopsValuesPath[getLocalBranchName()]

                    updateGitops(appName: appName, valuesPath: valuesPath, gitOpsRepo: gitOpsRepo, credentialsId: "itsziroy-github-user" , gitUserEmail: "yannik@h4hn.de")
                }
            }
        }
    }
}

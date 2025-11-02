@Library("teckdigital") _
def appName = "h4hn"
def gitOpsRepo = "https://github.com/ItsZiroy/gitops"
def localBranchToGitopsValuesPath = [
    'main': 'apps/h4hn/ui/values.yaml',
]

def standaloneBranchToGitopsValuesPath = [
    'main': 'apps/h4hn/ui-preview/values.yaml',
]

def cmsEndpoint = "https://cms.h4hn.de"
def siteUrl = "https://h4hn.de"

pipeline {
    agent none

    stages {
        stage('Build and Update GitOps') {
            parallel {
                stage('Static Build & Deploy') {
                    agent {
                        kubernetes {
                            inheritFrom "kaniko-template"
                            label "h4hn-static-build-${env.BUILD_NUMBER}"
                        }
                    }
                    stages {
                        stage('Build Static Image') {
                            steps {
                                container('kaniko') {
                                    withCredentials([
                                        string(credentialsId: 'teckdigital-service-user-token', variable: 'SERVICE_USER_TOKEN'),
                                        string(credentialsId: 'strapi-token', variable: 'STRAPI_TOKEN')
                                    ]) {
                                        buildDockerImage(buildArgs: [
                                            "GITHUB_AUTH_TOKEN=${SERVICE_USER_TOKEN}",
                                            "STRAPI_URL=${cmsEndpoint}",
                                            "SITE_URL=${siteUrl}",
                                            "STRAPI_TOKEN=${STRAPI_TOKEN}",
                                            "DRAFT_MODE=false"
                                        ],
                                        repoSuffix: "/static",
                                        imageTag: "${env.GIT_COMMIT.take(7)}-${env.BUILD_NUMBER}"
                                        )
                                    }
                                }
                            }
                        }
                        stage('Update Static GitOps') {
                            when {
                                expression {
                                    return localBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                                }
                            }
                            steps {
                                script {
                                    def valuesPath = localBranchToGitopsValuesPath[getLocalBranchName()]
                                    updateGitops(
                                        imageTag: "${env.GIT_COMMIT.take(7)}-${env.BUILD_NUMBER}",
                                        appName: appName,
                                        valuesPath: valuesPath,
                                        gitOpsRepo: gitOpsRepo,
                                        credentialsId: "h4hn-service-user",
                                        gitUserEmail: "github-bot@h4hn.de"
                                    )
                                }
                            }
                        }
                    }
                }
                
                stage('Standalone Build & Deploy') {
                    agent {
                        kubernetes {
                            inheritFrom "kaniko-template"
                            label "h4hn-standalone-build-${env.BUILD_NUMBER}"
                        }
                    }
                    stages {
                        stage('Build Standalone Image') {
                            steps {
                                container('kaniko') {
                                    withCredentials([
                                        string(credentialsId: 'teckdigital-service-user-token', variable: 'SERVICE_USER_TOKEN'),
                                        string(credentialsId: 'strapi-token', variable: 'STRAPI_TOKEN')
                                    ]) {
                                        buildDockerImage(buildArgs: [
                                            "GITHUB_AUTH_TOKEN=${SERVICE_USER_TOKEN}",
                                            "SITE_URL=${siteUrl}"
                                        ],
                                        dockerFilePath: "Dockerfile.standalone",
                                        repoSuffix: "/standalone",
                                        imageTag: "${env.GIT_COMMIT.take(7)}-${env.BUILD_NUMBER}"
                                        )
                                    }
                                }
                            }
                        }
                        stage('Update Standalone GitOps') {
                            when {
                                expression {
                                    return standaloneBranchToGitopsValuesPath.containsKey(getLocalBranchName())
                                }
                            }
                            steps {
                                script {
                                    def valuesPath = standaloneBranchToGitopsValuesPath[getLocalBranchName()]
                                    updateGitops(
                                        imageTag: "${env.GIT_COMMIT.take(7)}-${env.BUILD_NUMBER}",
                                        appName: appName,
                                        valuesPath: valuesPath,
                                        gitOpsRepo: gitOpsRepo,
                                        credentialsId: "h4hn-service-user",
                                        gitUserEmail: "github-bot@h4hn.de"
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

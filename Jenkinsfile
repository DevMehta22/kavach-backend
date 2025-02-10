pipeline{
    agent any

    stage("Clone"){
        steps{
            echo "Cloning the repository..."
            checkout scm
        }
    }
    stage("Build"){
            steps {
                script {
                    echo "Build in Progress"
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
    }
    stage("Push to dockerhub"){
        steps{
            echo "Push in progess"
            withCredentials([usernamepassword(credentialsId:"dockerhub-credentials")])
        }
    }
}
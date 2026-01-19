docker build  -t registry.digitalocean.com/shopdit/shopdit-web .
docker push registry.digitalocean.com/shopdit/shopdit-web
helm upgrade --install -f ./helm/values-production.yaml shopdit-web-production ./helm
docker rmi $(docker images | grep 'registry.digitalocean.com/shopdit/shopdit-web') -f
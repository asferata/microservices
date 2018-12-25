#!/bin/sh

kubectl delete -f ambassador-service.yaml
kubectl delete -f shopfront-service.yaml
kubectl delete -f usersmanagement-service.yaml
kubectl delete -f ordersmanagement-service.yaml
kubectl delete -f postgres.yaml
kubectl delete -f postgres-secret.yaml
kubectl delete -f postgres-configmap.yaml
kubectl delete -f mongo.yaml
kubectl delete -f mongo-secret.yaml
kubectl delete -f mongo-configmap.yaml
kubectl delete -f local-storage.yaml

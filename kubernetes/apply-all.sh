#!/bin/sh

kubectl apply -f local-storage.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo.yaml
kubectl apply -f postgres-configmap.yaml
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres.yaml
kubectl apply -f ordersmanagement-service.yaml
kubectl apply -f usersmanagement-service.yaml
kubectl apply -f shopfront-service.yaml
kubectl apply -f ambassador-service.yaml

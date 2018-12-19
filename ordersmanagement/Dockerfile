FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8020
EXPOSE 8020

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ordersmanagement/OrdersManagement.csproj ordersmanagement/
RUN dotnet restore ordersmanagement/OrdersManagement.csproj
COPY . .
WORKDIR /src/ordersmanagement
RUN dotnet build OrdersManagement.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish OrdersManagement.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "OrdersManagement.dll"]
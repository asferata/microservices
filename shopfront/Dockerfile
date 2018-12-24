FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8010
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8010

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY shopfront/ShopFront.csproj shopfront/
RUN dotnet restore shopfront/ShopFront.csproj
COPY . .
WORKDIR /src/shopfront
RUN dotnet build ShopFront.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish ShopFront.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "ShopFront.dll"]
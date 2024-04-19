FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /usr/src/app
COPY ./ClientService/*.csproj ./
RUN dotnet restore
COPY ./ClientService .
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/out ./
EXPOSE 7777
ENTRYPOINT ["dotnet", "ClientService.dll"]

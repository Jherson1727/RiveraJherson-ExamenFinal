# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /app

# Copiar archivos y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar todo lo demás y publicar
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine
WORKDIR /app
COPY --from=build /app/out .

# Exponer el puerto y arrancar la app
EXPOSE 80
ENTRYPOINT ["dotnet", "PerformanceApi.dll"]
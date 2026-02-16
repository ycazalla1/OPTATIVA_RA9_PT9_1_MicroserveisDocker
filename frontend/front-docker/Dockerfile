# Build stage : Utilitar Node per compilar l'aplicació Angular.
FROM node:20-alpine as build

# Directori de treball dins del contenidor.
WORKDIR /app

# Copiar els fitxers de dependències.
COPY package*.json ./
# Instal·lar les dependències.
RUN npm install

# Copiar tot el codi font i compilar
COPY . .
# Compilar l'aplicació Angular
RUN npm run build


# Runtime stage : Utilitar Nginx per servir els fitxers estàtics generats.
FROM nginx:alpine

# Copiar els fitxers compilats des de l'etapa de build al directori que Nginx utilitza per servir contingut.
COPY --from=build /app/dist/front-docker/browser /usr/share/nginx/html

# Indicar que el conteidor utilitza el port 80 per servir l'aplicació.
EXPOSE 80

# Arranca Nginx en mode foreground per mantenir el contenidor actiu.
CMD ["nginx", "-g", "daemon off;"]

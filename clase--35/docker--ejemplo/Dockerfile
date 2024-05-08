FROM node
#Definimos una imagen base: NODE. 

WORKDIR /app
#Acá estamos creando una carpeta interna para guardar nuestro proyecto. 

COPY package.json . 
#Copiamos el package.json a la nueva carpeta

RUN npm install
#Acá le decimos que tiene que ejecutarse el npm install en la nueva carpeta app. 

COPY . . 
#Copiamos todo el contenido de mi aplicación. 

EXPOSE 8080
#En que puerto vamos a escuchar. 

CMD [ "npm","start"]
#Tiene que ejecutar "npm start" para que funcione nuestra app.
#No se olviden de configurar el script. 

# --------------------------
# 1. Imagem base (Node LTS)
# --------------------------
FROM node:18

# --------------------------
# 2. Define o diretório de trabalho
# --------------------------
WORKDIR /app

# --------------------------
# 3. Copia e instala dependências
# --------------------------
COPY package*.json ./
RUN npm install --production

# --------------------------
# 4. Copia o restante do código
# --------------------------
COPY . .

# --------------------------
# 5. Define as variáveis de ambiente (opcional)
# --------------------------
# ⚠️ Use apenas valores genéricos aqui! (nada sensível)
# Variáveis secretas serão passadas na hora do deploy
ENV PORT=8080
ENV MONGO_URI=mongodb+srv://pinheiroprogramadorpython_db_user:sTeSPWhkryJ2XyXd@cluster0.nmp2mce.mongodb.net/PinheiroTvOnline?retryWrites=true&w=majority&appName=Cluster0
ENV API_URL = "http://cvc123.com/get.php?username=rdg35839&password=xss93768&type=m3u&output=ts"

# --------------------------
# 6. Expõe a porta (Cloud Run exige 8080)
# --------------------------
EXPOSE 8080

# --------------------------
# 7. Comando para iniciar o app
# --------------------------
CMD ["npm", "start"]

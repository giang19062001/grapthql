server: npm i --save @apollo/server express http cors body-parser nodemon
graphql-ws ws @graphql-tools/schema graphql-subscriptions (khi dùng websocket và Subscription của graphql)

client: npm create vite 
npm install --save-dev eslint-config-react-app eslint@^8.0.0 (https://www.npmjs.com/package/eslint-config-react-app)
react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
graphql-ws (khi dùng websocket và Subscription của graphql)
: npm run dev

firebase: create project
click setting => add your web app
vào authentication => sign-in method => enable Google => save
vào authentication => setting => auuthorized domain => add domain của website => save
npm i  firebase
copy code từ hướng dẫn của firebase

muốn thêm await vào root folder vào ko cần bọc async thì đổi đuôi file từ .js sang .mjs

typeDef mô tả dữ liệu có 3 kiểu
Query : truy vấn dữ liệu
Mutation: cập nhập, xóa dữ liệu
Subscription:  cập nhập dữ liệu realtime 

resolver xữ lí và trả dữ liệu

resolver có 4 kiểu : 
parent: là dữ liệu object  cha của thằng con hiện tại
args: parameter gửi từ client lên server
context: dự liệu mà mình thiết lập global của server
info ://
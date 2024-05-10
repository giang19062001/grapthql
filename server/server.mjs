import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import {typeDefs} from './schemas/index.js'
import {resolvers} from './resolvers/index.js'
import './firebase.js'
import {getAuth} from 'firebase-admin/auth'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express()
const httpServer = http.createServer(app)


const URI = process.env.DB_MONGO

const schema = makeExecutableSchema({typeDefs, resolvers})

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
        {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

await server.start()

//middleware xem token hợp lệ  ko
const authorizationJWT = async (req, res, next) =>{
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1];
  
      getAuth()
        .verifyIdToken(accessToken)
        .then((decodedToken) => {
          res.locals.uid = decodedToken.uid;
          next();
        })
        .catch((err) => {
          console.log({ err });
          return res.status(403).json({ message: 'Forbidden', error: err });
        });
    } else {
      next();
      // return res.status(401).json({ message: 'Unauthorized' });
    }

}

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server,{
    context: async({req, res}) =>{
        return {uid : res.locals.uid}
    }
    // thêm này thì context của resolver của graphql sẽ nhận được data này 
}))

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( async ()=>{
    await new Promise((resolve) => httpServer.listen({port : process.env.PORT || 4000}, resolve))
    console.log('http://localhost:4000/')
})



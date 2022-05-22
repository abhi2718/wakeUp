const express=require('express'),
      app=express(),
      port=process.env.PORT || 8080,
      server=require('http').createServer(app),
      { Server } = require("socket.io"),
      io = new Server(server,{
          cors:{
            orgin:"*",
            method:["GET","POST"],
            allowedHeaders:["my-custom-header"],
            credentials:true
          }
      });
      app.get('/',(req,res)=>{
          res.json({
              success: true
          });
      })
      io.on('connection',socket=>{
        socket.on('join-room',payload=>{
          console.log(payload.roomId);
          socket.join(payload.roomId);
        });
        socket.on('open-app',payload=>{
              socket.to(payload.roomId).emit('open-app',payload);
        });
      });
     
      
      server.listen(port,()=>{
          console.log(`servering on ${port}`);
      });
     
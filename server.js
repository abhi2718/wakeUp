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
        socket.on('join-room',room=>{
          console.log(room);
          socket.join(room);
        });
        //   socket.on('chat',payload=>{
        //       socket.to(payload.room).emit('chat',payload.message);
        //   });
        //   socket.on('cut_call',payload=>{
        //     socket.to(payload.room).emit('cut_call',payload);
        //   })
      });
     
      
      server.listen(port,()=>{
          console.log(`servering on ${port}`);
      });
     
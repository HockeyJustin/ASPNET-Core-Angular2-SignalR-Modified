# ASPNET-Core-Angular2-SignalR-Modified

### This is a modified clone of https://github.com/FabianGosebrink/ASPNETCore-Angular-SignalR-Typescript using, ASP.NET Core, SignalR and Angular with Typescript.

### If you are starting from scratch, the [original](https://github.com/FabianGosebrink/ASPNETCore-Angular-SignalR-Typescript) is much cleaner/tidier than this one :).


## Code 
(Details copied from [original repository](https://github.com/FabianGosebrink/ASPNETCore-Angular-SignalR-Typescript))

Clone this repo and run 

```javascript 
npm start
```

Browse to
```javascript 
http://localhost:8080
```  
(No SignalR but live-reloading)

Or
```javascript 
http://localhost:5000
```
(SignalR but no live-reload)

To see the page then. SignalR is not working there because of CORS-Issues with signalR. Just load the application in Visual Studio and press the Play Button.


If you want to get production builds you can type

```javascript
gulp build:web:prod 
```

to build the production-ready build or type 

```javascript
gulp build:all
```

to get the .dist-folder filled with all the cross-platform builds.

After this you can type 

```csharp
dotnet run
```

to start the ASP.NET Server or just press the Play-Button in Visual Studio.




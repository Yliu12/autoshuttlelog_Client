# ShuttlelogClient

## 



#project Blog [link](https://yingliucapstone.wordpress.com/)


#Preview(Frontend only) [link](http://34.198.142.198:4200/)


## Deploy Instruction
 [Install Node.js](https://nodejs.org/)


clone code

Install Angular CLI
```
npm install -g @angular/cli
```

Go to folder
```
cd autoshuttlelog_Client\
```
Install packages
```
npm i
```


Run develop mode
```
ng serve
```

go to browser and open 

http://localhost:4200/#driver
OR
http://localhost:4200/#manager


build Production

```
npm run sw-build
```

move /dist folder to tomcat webapp root


for ec2 ami server, it's

/usr/share/tomcat8/webapps/Root

#### Restart Tomcat


# docker-js
A  javascript utility library  for docker and docker-compose, it provides a simple javascript wrapper in order to execute docker commands and an api in order to use Docker with a node server. 
It's already in beta version, documentation , examples and functionality will be done soon.  

## Getting Started

```  
npm install --save mydockerjs 
``` 

to use in your projects. 
 
The library provides : 
* docker : a docker js library in order to execute docker commands 
* imageMgr : an image util library to retrieve informations about installed docker images and push / pull images
* dockerCompose : a docker compose library to run docker compose commands and parse json objects in yaml docker-compose syntax   





If you want to test, to edit or to try example:   
``` 
git clone https://github.com/giper45/docker-js.git 
```  

in examples dir you'll find some example:
``` 
cd examples; 
npm install; 
node <namejs> 

```
### Prerequisites

In order to use you should first install docker engine and docker-compose .


### Examples 

All the api provides a simple syntax with callback function and params options : 
```
function nameF(dependentFunctionParameters, callback, paramsInput)
```



#### Docker images   
Import : 
```
const dockerImages = require('mydockerjs').imageMgr
``` 

Get images name : 
```


//Get image names  
dockerImages.getNames(function(err, json) {
        utils.print(err,json)
}, {onlytagged:true})

```


Get detailed list : 
```
//Get detailed list of images in javascript object
dockerImages.getDetailedList(function(err, data) {
        utils.print(err,data)

})

```

Get jsonList: 
```
//Get json list of images
dockerImages.getJSONList(function(err, data) {
        utils.print(err, data)
})

``` 

Remove untagged images : 

```
dockerImages.removeUntagged(function(err, data) {
        utils.print(err, data)
})

```

Each get function receives a callback and a paramsInput 
Available options for the paramsInput are : 
* onlytagged: if true returns only tagged images 
* filterLabel : TBD




### Docker library 

Import : 
```
const dockerJS = require('mydockerjs').docker 

``` 

Get active containers : 
```

  dockerJS.ps(function(err, dockerContainers) {
                                if(err) 
                                        console.log(err) 
                                else 
                                        console.log(dockerContainers)
                        })  


```
Remove all unactive containers : 

```
dockerJS.rmAll(function(err, data) {
        utils.print(err, data) 
})

```
Run a container : 

```
dockerJS.run('hello-world', function(err, data) {
        if(err) 
        {   
                console.log("Some err:") 
                console.log(data) 
        }   

        else { 
                console.log(data)
        }   

})


```

run function accept imageName, callback and paramsInput. 
Available options : 
* detached : if true add -d flag to docker run 
* cmd : add a command to the end docker run  
* name : add a name to running container 

Example : 
```
dockerJS.run('daindragon2/debian_useradd', function(err, data) {
        if(err) 
        {   
                console.log("some error") 
                console.log(err) 
        }   
        else {   
                        console.log("runned") 
                        console.log(data) 
                        //Print running containers
                        dockerJS.ps(function(err, dockerContainers) {
                                if(err) 
                                        console.log(err) 
                                else 
                                        console.log(dockerContainers)
                        })  
                            
            }   

}, {name:"theContainer", detached:true, cmd:'bash'})


```

Docker exec a command : 

```
dockerJS.exec(nameContainer, command, callback, paramsInput) 
```

Available options : 
* detached: if true run the command in detached mode 





## Running the tests

TBD


## License 

MIT Licensed

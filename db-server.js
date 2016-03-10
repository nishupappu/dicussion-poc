var dbServer = require('nb-json-db');
dbServer.rootPath = __dirname;

dbServer.dBFolderName = "data";
dbServer.dBPort = 5654;

dbServer.ModelHash["discussions"] = function (obj, isNew, isUpdate) {
    this.Id = obj["Id"] || dbServer.guid();
    this.Category = obj["Category"];

    this.Content = obj["Content"];
    this.Views=obj["Views"];  

    if(isNew){
        this.CreatedTime = new Date().getTime();
    }else{
        this.CreatedTime = obj["CreatedTime"];
    }

    if(isUpdate){
        this.UpdatedTime = new Date().getTime();
    }else{
        this.UpdatedTime = obj["UpdatedTime"];
    }

    this.ParentId = obj["ParentId"];
};

dbServer.ModelHash["users"]=function(obj,inNew,isUpdate){
    this.Id = obj["Id"] || dbServer.guid();
    this.Username=obj
};

dbServer.init();
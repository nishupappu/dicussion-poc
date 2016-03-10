var dbServer = require('nb-json-db');
dbServer.rootPath = __dirname;

dbServer.dBFolderName = "data";
dbServer.dBPort = 5654;

dbServer.ModelHash["discussions"] = function (obj) {
    this.Id = obj["Id"] || dbServer.guid();
    this.Category = obj["Category"];

    //obj["Content"] = "who are you?";
    this.Content = obj["Content"];

    //obj["Views"] ==> 1
    this.Views= obj["Views"];

    this.ParentId = obj["ParentId"];

    //obj.ParentId and obj["ParentId"] both are same.


    //this stores Array of Users who liked the discussion
    // obj["Likes"] = ["74ecc91ebf0e235874604af915361bf0887", "28b811ec469c03f60b21cf4515361c6f27a"]
    this.Likes = obj["Likes"];
};

dbServer.ModelHash["users"]=function(obj){
    this.Id = obj["Id"] || dbServer.guid();

    this.Username = obj["Username"];
    this.Password = obj["Password"];
};

dbServer.init();
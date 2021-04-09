 const config={
    "type":[
        {"value":"download","name":"下载（大文件）"},
        {"value":"vod","name":"点播（音视频）"},
        {"value":"static","name":"静态（页面、小文件）"},
        {"value":"live","name":"直播"},
        {"value":"live_push","name":"直播-推流"},
        {"value":"live_pull","name":"直播-拉流"}
    ],
    "scope":[
        {"name":"国内","value":"cn"},
        {"name":"海外","value":"abroad"},
        {"name":"全球","value":"all"}
    ],
    
    "backProtocol":[
        {"name":"协议跟随","value":"match"},
        {"name":"HTTP","value":"http"},
        {"name":"HTTPS","value":"https"}
    ],
    "defaultStrategy":{
        "download":"30",
        "static":"7",
        "vod":"30"
    },
    
}
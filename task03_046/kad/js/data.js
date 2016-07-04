var CANVAS_WIDTH = document.getElementsByTagName('body')[0].offsetWidth,  //画布宽度
    CANVAS_HEIGHT = document.getElementsByTagName('body')[0].offsetHeight,
    SIZE = 30, //每格宽度
    MAP={                                   //游戏地图，障碍物1和空地0，
        arr:[],                             //二维数组
        width:CANVAS_WIDTH,                 //地图宽度
        height:CANVAS_HEIGHT,
        rows:parseInt(CANVAS_WIDTH/SIZE)+1,   //地图横行格数
        cols:parseInt(CANVAS_HEIGHT/SIZE)+1
    };

var BgColor = "rgb(255,230,205)",
    WallColor = "rgb(46,30,30)",
    AgentColor = "rgb(68,184,17)",
    FileColor = "rgb(244,175,41)";
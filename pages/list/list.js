var time = require("../../utils/util");

Page({
    data:{
        lists:[
            {
                content:"hello",
                time:Date.now(),
                id:1
            }
        ]
    },
    onLoad(){
        initData(this);
    },
    onShow(){
        initData(this);
    },
    edit(e){
        console.log('edit ===>')
        var id = e.currentTarget.dataset.id;
        console.log(id)
        wx.navigateTo({
            url:"../add/add?id=" + id
        })
    },
    add(){
        console.log('add ====>')
        wx.navigateTo({
            url:"../add/add"
        })
    }
})

function initData(page){
    var arr = wx.getStorageSync('txt');
    if(arr.length){
        arr.forEach((item,i) => {
            var t = new Date(Number(item.time));
            item.time = time.formatTime(t);
        })
        page.setData({
            lists:arr
        })
    }
}

/**
 * Cd 基类
 * */ 
class Cd{
  constructor(){
    this.httpUrl ="http://localhost/pjxt/public";

  }

  /*
   * ajax 网络请求方法
   * headerType 请求header模式
   * parameter 请求参数对象
   * 
   *  
   * */ 
  ajax(headerType,parameter){
    let promise=new Promise((resolve,reject)=>{
      if(headerType=="json"){
        var headers= {
          'Content-Type': 'application/json;'
        };
      }else if(headerType=="encode"){
        var headers={
          'Content-Type': 'application/x-www-form-urlencoded;'
        };
      }
      wx.request({
        url:this.httpUrl+parameter.url,
        header:headers,
        method:parameter.type,
        data:parameter.data,
        dataType:'json',
        respsonseType:'text',
        success(res){
          resolve(res);
        },
        fail(res){
          reject(res);
        }
      });
    });
    return promise;
  }

  /**
   * query 节点查询
   * elements 节点元素
   *  */ 
  query(elements,callBack){
    let q=wx.createSelectorQuery();
    q.select(elements).boundingClientRect();
    q.exec(callBack);
  }

  /**
   * 提示框工具
   * showToast
   * showModel
   * 
   * 
   * */ 
   showTost(title,showTime){
     if(!showTime){
       showTime=1500
     }
     wx.showToast({
       title: title,
       icon:'none',
       mask:true,
       duration:showTime
     })
   }
  showLoading(title){
    wx.showLoading({
      title: title,
      mask: true
    })
  }

}
export{Cd}
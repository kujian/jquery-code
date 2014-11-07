/*方法一： 1,'1' 会被认为是相同的; 所有hash对象,如：{x;1}，{y:1}会被认为是相同的 //10ms */
Array.prototype.unique=function(){
    var newArr=[],obj={};
    for(var i=0,len=this.length;i<len;i++){
        if(!obj[this[i]]){ 
            newArr.push(this[i]);
            obj[this[i]]=true;
        }
    }
    return newArr;
}

/*方法一改进版：所有hash对象,如：{x;1}，{y:1}会被认为是相同的  //30ms*/
Array.prototype.unique=function(){
    var newArr=[],obj={};
    for(var i=0,len=this.length;i<len;i++){
        if(!obj[typeof(this[i])+this[i]]){ 
            newArr.push(this[i]);
            obj[typeof(this[i])+this[i]]=this[i];
        }
    }
    return newArr;
}

/*方法二： 去重结果最好，但耗性能     //250ms*/
Array.prototype.unique=function(){
    var newArr=this.concat();
    for(var i=0,len=newArr.length;i<len;i++) {
        for(var j=i+1,len=newArr.length;j<len;j++) {
            //注意 ===
            if(newArr[i]===newArr[j]) {
                newArr.splice(j,1);
                j--;
            }
        }
    }
    return newArr;
}

/*方法三：  不能去重hash对象  //25ms */
Array.prototype.unique = function(){
    var newArr = []; //一个新的临时数组
    for(var i = 0,len=this.length; i < len; i++){        
        if (newArr.indexOf(this[i]) == -1){    //如果当前数组的第i已经保存进了临时数组，那么跳过,否则把当前项push到临时数组里面
            newArr.push(this[i]);
        }
    }
    return newArr;
}


var arr0=[11,21,221,13,24,"134","1",{x:1,y:1},{name:"pobaby",age:"12",hobby:"football"},{name:"pobaby1",age:"121",hobby:"football1"},{x:134},{y:132},{x:143},{y:3421},"神秘人物", "火柴人技巧格斗", "超音速战场", "小小辛打砖块", "火柴人技巧格斗", "加菲猫超人", "小小辛打砖块", "卑鄙的我2", "电流导线", "飞天手推车","神D秘人物", "火柴人S技巧格斗", "超音SD速战场", "小小SD辛打砖块", "火柴人SD技巧格斗", "加菲S猫超人", "小小DF辛打砖块", "卑鄙的FS我2", "电D流导线", "飞天SD手推车","神秘SD人物", "火柴人技D巧格斗", "超音ASD速战场", "小小辛打SAD砖块", "火柴人技SD巧格斗", "加菲FDS猫超人", "小小辛打SDF砖块", "卑鄙SDF的我2", "电流SDF导线", "飞天手DF推车","神秘SD人物", "火柴人技AS巧格斗", "超音速战FS场", "小小辛SDF打砖块", "火柴人SDF技巧格斗", "加菲SD猫超人",113,231,2221,123,234,"1334","21",{x:13,y:132},{name:"pobaby2",age:"122",hobby:"football2"},{name:"pobaby13",age:"1231",hobby:"football41"},{x:13544},{y:1352},{x:14543},{y:34521},"神秘人sd物", "火柴人技sd巧格斗", "超音速sd战场", "小小辛sd打砖块", "火柴人技巧gw格斗", "加菲猫ui超人", "小小辛yi打砖块", "卑鄙的yi我2", "电流yt导线", "飞天手ytui推车","神Dyu秘人物", "火yui柴人S技yui巧格斗", "超音SDyu速战场", "小小SD辛打砖uyi块", "火柴yui人SD技巧格斗", "加yui菲S猫超人", "小小DF辛打砖ui块", "卑鄙uyi的FS我2", "电D流导yui线", "飞天SD手推uyi车","神i秘SD人物", "火柴人技Dhk巧格斗", "超音ASD速战hk场", "小小辛打SAhkD砖块", "火柴人技SD巧ghk格斗", "加菲FDS猫k超人", "小小辛打SDF砖ytui块", "卑鄙SDF的yui我2", "电流SDyuF导线", "飞天手yuiDF推车","神iy秘SD人hk物", "火柴uyi人技AS巧格hk斗", "超音hg速战FS场", "小小辛SDF打砖hjk块", "火柴人SDF技hj巧格斗", "加菲SDhk猫超人" ];

/*十万个随机数据*/
var arr=[],num;
for(var i = 0; i < 100000; i++){
    num=Math.floor(Math.random()*50);
    arr.push(arr0[num]);
}


var t1= new Date().getTime(); console.log(t1); //开始时间

arr.unique(); //去重

var t2 = new Date().getTime(); console.log(t2); //结束时间

console.log(t2-t1);

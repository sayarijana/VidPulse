export const API_KEY='AIzaSyBO2NuS2SkIrz72ahsEDbvQph8gfhyfbJg'


export const valueConverter=(value) =>{
    if(value >=1000000){
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}
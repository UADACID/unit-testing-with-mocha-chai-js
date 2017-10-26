exports.graphQlToSequelize = function(filter) {

  let newFilter = {};

  function fetchFilter(key, filter, operator){
     const field = key.split('_')[0]?key.split('_')[0]: key;
     let condition = key.split('_')[3] ? key.split('_')[1]+key.split('_')[2]+ key.split('_')[3] :
                     key.split('_')[2] ? key.split('_')[1]+key.split('_')[2]:
                     key.split('_')[1] ? key.split('_')[1]: null;


     const value = filter[key];

     if(condition == 'notin'){
        condition = 'notIn'
      }else if(condition == 'startswith'){
        condition = 'like'
      }else if(condition == 'notstartswith'){
        condition = 'notLike'
      }

      if(condition){
         if(newFilter[field]){
           newFilter[field][condition] = value;
         }else{
           newFilter[field] = {};
           newFilter[field][condition] = value;
         }
       }else{
         newFilter[field] = value;
       }
  }

  for(key in filter){
   if(filter.AND){ //with AND condition
     filter.AND.forEach((obj)=>{
       for(key in obj){
        fetchFilter(key, obj);
       }
     });
   }else if(filter.OR){ //with OR condition
     filter.OR.forEach((obj)=>{
       for(key in obj){
        fetchFilter(key, obj);
       }
     });
     let newFilters = {}
     let newArray = []
     for(i in newFilter ){
       newArray.push({[i]:newFilter[i]})
     }
     newFilters['or']=newArray
     newFilter = newFilters
   }else{ //normal condition
     fetchFilter(key, filter)
   }
  }

  return newFilter
};

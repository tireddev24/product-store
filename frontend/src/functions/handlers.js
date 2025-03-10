  export function getSortedProducts(product, searchval, sortKey, rangeVal){
    if(searchval){
      const p =  product.filter(p => p.name.toLowerCase().includes(searchval.toLowerCase()))
      return p
    }
    if(sortKey.key === 's_price'){
      const p = product.filter(p => p.price >= rangeVal[0] && p.price <= rangeVal[1])
      return p
    }
    if(sortKey.direction === 'asc'){
      if(sortKey.key === 'name' || sortKey.key === 'createdAt'){
        return product.sort((a,b) => a[sortKey.key].localeCompare(b[sortKey.key]))
      }
    return product.sort((a,b) => a[sortKey.key] - b[sortKey.key])
    } 
    return sortKey.key === 'name' || sortKey.key === 'createdAt'?
     product.sort((a,b) => b[sortKey.key].localeCompare(a[sortKey.key]))    
    :
     product.sort((a,b) => b[sortKey.key] - a[sortKey.key])
}



export const  mergeCarts = (dbCart,cookieCart) =>{
    const mergeCart = [{...dbCart}]
    if (cookieCart) {
        cookieCart?.forEach(cookieItem =>{
            const existingItem = mergeCart.find(dbItem => dbItem.card._id.toString() === cookieItem.card._id.toString())
            if(existingItem){
                existingItem.quantity +=cookieItem.quantity
            }else{
                mergeCart.push(cookieItem)
            }
        })
    }
    

}
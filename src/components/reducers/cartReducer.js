
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {
            id: 1,
            title: "Kale and Quinoa Salad with Black Beans",
            readyInMinutes: 50,
            servings: 6,
            quantity: 0,
            image: "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg",
            imageUrls: [
                "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg"
            ]
        },
        {
            id: 2,
            title: "Creamy Avocado Pasta",
            readyInMinutes: 15,
            servings: 2,
            quantity: 0,
            image: "Creamy-Avocado-Pasta-547775.jpg",
            imageUrls: [
                "Creamy-Avocado-Pasta-547775.jpg"
            ]
        },
        {
            id: 3,
            title: "Avocado Toast with Eggs, Spinach, and Tomatoes",
            readyInMinutes: 10,
            servings: 1,
            quantity: 0,
            image: "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg",
            imageUrls: [
                "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg"
            ]
        },
        {
            id: 4,
            title: "Citrus Sesame Kale",
            readyInMinutes: 15,
            servings: 4,
            quantity: 0,
            image: "Citrus-Sesame-Kale-495111.jpg",
            imageUrls: [
                "Citrus-Sesame-Kale-495111.jpg"
            ]
        },
        {
            id: 5,
            title: "Melt In Your Mouth Kale Salad",
            readyInMinutes: 10,
            servings: 2,
            quantity: 0,
            image: "Melt-In-Your-Mouth-Kale-Salad-689502.jpg",
            imageUrls: [
                "Melt-In-Your-Mouth-Kale-Salad-689502.jpg"
            ]
        },
        {
            id: 6,
            title: "Kale Pineapple Smoothie",
            readyInMinutes: 4,
            servings: 1,
            quantity: 0,
            image: "kale-pineapple-smoothie-837136.jpg",
            imageUrls: [
                "kale-pineapple-smoothie-837136.jpg"
            ]
        },
        {
            id: 7,
            title: "Mexican Salad with Lime Dressing",
            readyInMinutes: 15,
            servings: 4,
            quantity: 0,
            image: "Mexican-Salad-with-Lime-Dressing-582897.jpg",
            imageUrls: [
                "Mexican-Salad-with-Lime-Dressing-582897.jpg"
            ]
        },
        {
            id: 8,
            title: "Weekly Meal Plan #17",
            readyInMinutes: 15,
            servings: 6,
            quantity: 0,
            image: "weekly-meal-plan-17-777037.jpg",
            imageUrls: [
                "weekly-meal-plan-17-777037.jpg"
            ]
        },
        {
            id: 9,
            title: "Matcha Green Tea and Pineapple Smoothie",
            readyInMinutes: 10,
            servings: 1,
            quantity: 0,
            image: "matcha-green-tea-and-pineapple-smoothie-801710.jpg",
            imageUrls: [
                "matcha-green-tea-and-pineapple-smoothie-801710.jpg"
            ]
        },
        {
            id: 10,
            title: "Low Carb Frosty",
            readyInMinutes: 5,
            servings: 1,
            quantity: 0,
            image: "low-carb-frosty-812966.jpg",
            imageUrls: [
                "low-carb-frosty-812966.jpg"
            ]
        }
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          console.log(action)
          console.log(state.items[0].id)
          
          let addedItem = state.items.find(item=> item.id === action.recipe_id)
          console.log(state.addedItems)
          console.log(state.items)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.calories 
                  }
        }
         else{
            console.log(addedItem)
            //calculating the total
            let newTotal = state.total + addedItem.calories 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.calories * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.calories
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.calories
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer

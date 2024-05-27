import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-bbee6-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value

    push(shoppingListDB, inputValue);

    console.log(`${inputValue} added to DB`);

    clearInputField();
});

onValue(shoppingListDB, function(snapshot){
    
    if (snapshot.exists()){

        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i];

            addNewItem(currentItem)

        }
    }else{
        shoppingListEl.innerHTML = "No items here... yet"
    } 
} )

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputField(){
    inputFieldEl.value = ""
}

function addNewItem(item){

    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("click", function(){
        let exactLoactionofItemInDB = ref(database, `shoppingList/${itemId}`)
        console.log(itemId)
        remove(exactLoactionofItemInDB)
    })

    shoppingListEl.append(newEl)
}

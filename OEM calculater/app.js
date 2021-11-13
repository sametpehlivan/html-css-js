
async function USDtoTRY(){

    await  fetch('https://metals-api.com/api/latest?access_key=dqv7pzfva2bd1062xegdyv0p8w77ysqdklhyd59znaew329xw4smg2c1po8m&base=USD&symbols=TRY%2CXAG%2CXPD%2CXPT%2CXRH')
    .then((data)=>{return data.json()})
    .then(data=>{ localStorage.setItem('USDtoTRY',data.rates.TRY);})
    .catch(error=>{ 
        if(localStorage.getItem('USDtoTRY')===null){
        localStorage.setItem('USDtoTRY',9);
         }
    console.log(error);
    });
    
}
function uploadHtml(){
    
    const storage= StorageController.check_getLoacalStorage();
    console.log(storage);
    UIController.createProductList(storage);
}
//  STORAGE CONTROLLER

const StorageController=(function(){
    let local_Storage;
    return{
        check_getLoacalStorage:function(){
            if(localStorage.getItem('products')===null){
                local_Storage=[];
            }
            else{
                local_Storage=JSON.parse(localStorage.getItem('products'));
            }
            return local_Storage;
        },
        addLocalStorage:function(product){
            local_Storage=StorageController.check_getLoacalStorage();
            local_Storage.push(product);
            localStorage.setItem('products',JSON.stringify(local_Storage));
        },
        deleteLocalStorage:function(product){
            local_Storage=StorageController.check_getLoacalStorage();
            local_Storage.forEach((element,index)=>{
                if(element.id == product.id){
                    local_Storage.splice(index,1);
                }
            });
            localStorage.setItem('products',JSON.stringify(local_Storage));
        },
        updateLocalStorage:function(product){
            local_Storage=StorageController.check_getLoacalStorage();
            local_Storage.forEach((element,index)=>{
                if(element.id == product.id){
                    local_Storage[index]=product;
                    
                }
                localStorage.setItem('products',JSON.stringify(local_Storage));
            });
        }

    }
})();


//  PRODUCT CONTROLLER

const ProductController=(function( ){
    //private
    const Product =function(id,name,price){
        this.id=id;
        this.name=name;
        this.price=price;
    }
    const data={
        products:StorageController.check_getLoacalStorage(),
        selectedProduct:'',
        totalPrice:0
    }
    
    return{ 
        getProducts:()=>{ return data.products;},
        getData:()=>{return data},
        addProduct:(productName,productPrice)=>{
            let id;
            if(isNaN(parseFloat(productPrice))){
                productPrice=0;
            }
            productPrice=parseFloat(productPrice);
            if(data.products.length>0){
                let flag=data.products.findIndex(product=>product.name === productName);
                if(flag == -1){
                    id=(Math.max.apply(Math, data.products.map(function(o) {
                        return o.id;
                      })) + 1);
                      const newProduct=new Product(id,productName,productPrice);
                      data.products.push(newProduct);
                      return newProduct;
                     
                }
                else{
                    // item is available
                    
                }

            }else{
                id=0;
                const newProduct=new Product(id,productName,productPrice);
                data.products.push(newProduct);
                return newProduct;
            }
            
        },
        getTotal:function(){
            let total=0;
            data.products.forEach(product=>{total+=product.price;});
            data.totalPrice=total;
            return data.totalPrice;
        },
        getProductByid:function(productID){
            const index=data.products.findIndex(product=>product.id == parseFloat (productID));
            return data.products[index];
        },
        getCurrentProduct:function(){
            return data.selectedProduct;
        },
        setCurrentProduct:function(product){
           data.selectedProduct=product;
        },
        updateProduct:function(Name,Price){
            let index=data.products.findIndex(product=>product.id ==  data.selectedProduct.id);
        
            if(index !=-1){
               
                data.products[index].name=Name;
                data.products[index].price=Price;
                StorageController.updateLocalStorage(data.products[index]);
                return data.products[index];
            }
           
        },
        deleteProduct:function(product){
            StorageController.deleteLocalStorage(product);
            data.products.forEach((element,index)=>{
                if(element.id == product.id){
                    data.products.splice(index,1);
            }
        });
           
        }
        
    };
})();


//  UI CONTROLLER

const UIController=(function(){
    const Selectors={
        //table
        productList:'#item-list',
        productListItems:'#item-list tr',
       //inputs
        productName:"#productName",
        productPrice:"#productPrice",
        //buttons
        addButton:"#addBtn",
        saveButton:"#saveBtn",
        deleteButton:"#deleteBtn",
        cancelButton:"#cancelBtn",
        //currency
        totalTRY:"#total-try",
        totalUSD:"#total-usd"

    }
    return{
        createProductList:function(products){
            let html="";
            products.forEach(element => {
                html+=` <tr class="rounded-pill">
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td class="text-end">
                        <i class="fas fa-edit edit-product"></i>
                </td>
            </tr>
                `
            });
            document.querySelector(Selectors.productList).innerHTML=html;
        },
        getSelectors:function(){
            return Selectors;
        },
        addProduct:function(element){
           let html=` <tr>
            <td class="rounded-start">${element.id}</td>
            <td>${element.name}</td>
            <td>${element.price}</td>
            <td class="text-end rounded-end">
                    <i class="fas fa-edit edit-product"></i>
            </td>
        </tr>
            `
            document.querySelector(Selectors.productList).innerHTML+=html;
        },
        clearInputs:function(){
            document.querySelector(Selectors.productName).value="";
            document.querySelector(Selectors.productPrice).value="";
        },
        showTotal:function(totalPrice){
            document.querySelector(Selectors.totalUSD).textContent=totalPrice;
            document.querySelector(Selectors.totalTRY).textContent=totalPrice*localStorage.getItem("USDtoTRY");
        },
        addProductToform:function(){
            console.log(ProductController.getCurrentProduct());
            const selectedProduct=ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value=selectedProduct.name;
            document.querySelector(Selectors.productPrice).value=selectedProduct.price;
           
        },
        updateProduct:function(prd){
            let updatedItem = null;
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function(item){
                if(item.classList.contains("bg-warning")){
                    item.children[1].textContent=prd.name;
                    item.children[2].textContent=prd.price;
                    updatedItem = item;
               
                }
            });
            return updatedItem;
        },
        addingState:function(){
           UIController.clearWarning();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display='inline';
            document.querySelector(Selectors.saveButton).style.display="none";
            document.querySelector(Selectors.deleteButton).style.display="none";
            document.querySelector(Selectors.cancelButton).style.display="none";
        },
        editState:function(tr){
            
           
            UIController.clearWarning();
            tr.classList.add("bg-warning");
            document.querySelector(Selectors.addButton).style.display='none';
            document.querySelector(Selectors.saveButton).style.display="inline";
            document.querySelector(Selectors.deleteButton).style.display="inline";
            document.querySelector(Selectors.cancelButton).style.display="inline";
        },
        clearWarning:function(){
           const items=document.querySelectorAll(Selectors.productListItems);
          items.forEach(item =>{
            if (item.classList.contains("bg-warning")) {
                item.classList.remove("bg-warning");    
            }
          });
        },
        deleteItem:function(){
            const items=document.querySelectorAll(Selectors.productListItems);
            items.forEach(item =>{
              if (item.classList.contains("bg-warning")) {
                  item.remove();
              }
            });
        },
        getItems:function(){
            let html="";
            let storage=check_getLoacalStorage();
            storage.forEach(element => {
                html+=` <tr class="rounded-pill">
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.price}</td>
                <td class="text-end">
                        <i class="fas fa-edit edit-product"></i>
                </td>
            </tr>
                `
            });
            document.querySelector(Selectors.productList).innerHTML=html;
        }
        
       
    }
})();


//  APP CONTROLLER

const AppController=(function(PrdctCtrl,UICtrl,StrCtrl){

    const UISelectors = UICtrl.getSelectors();
    
    // load event listener
    const loadEventListeners = function(){
        //add product event click
        document.querySelector(UISelectors.addButton).addEventListener("click",productAddSubmit);
        //edit product event clik
        document.querySelector(UISelectors.productList).addEventListener("click",productEditSubmit);
        //edit product submit
        document.querySelector(UISelectors.saveButton).addEventListener("click",editProductSubmit);
        //cancel
        document.querySelector(UISelectors.cancelButton).addEventListener("click",cancelUpdate);
        //delete
        document.querySelector(UISelectors.deleteButton).addEventListener("click",deleteItem);
    }
    const productAddSubmit=(e)=>{
        e.preventDefault();
        const productName=document.querySelector(UISelectors.productName).value;
        const productPrice=document.querySelector(UISelectors.productPrice).value;
        if(productPrice !=='' && productName !== '' ){
            //add product
           const newProduct=PrdctCtrl.addProduct(productName,productPrice);
          if (newProduct !== undefined) {
           //add table to element
            UICtrl.addProduct(newProduct);
            StrCtrl.addLocalStorage(newProduct);
          }
          //get total 
          UICtrl.showTotal(PrdctCtrl.getTotal());
        
          //clear input 
          UICtrl.clearInputs();
           
        }
        
    }
    const productEditSubmit=function(e){

        if(e.target.classList.contains('edit-product')){
            const id=e.target.parentNode.parentNode.firstElementChild.textContent;
            //get selected product
            const product =PrdctCtrl.getProductByid(id);
            //set current product
            PrdctCtrl.setCurrentProduct(product);
            //add product To UI
            UICtrl.addProductToform();
          
            const tr=e.target.parentNode.parentNode;
            UICtrl.editState(tr);
        }

        e.preventDefault();
    }
    const editProductSubmit=function(e){
        const productName=document.querySelector(UISelectors.productName).value;
        const productPrice=document.querySelector(UISelectors.productPrice).value;
        if (productName !== '' && productPrice !=='') {
    
           const prd= PrdctCtrl.updateProduct(productName,parseFloat(productPrice));
           //get total 
           UICtrl.showTotal(PrdctCtrl.getTotal());
            
            UICtrl.addingState();
            
           
           
        }
        e.preventDefault();
    }
    const cancelUpdate=function(e){
         
        UICtrl.addingState();
        UICtrl.clearWarning();
     e.preventDefault();   
    }
    const deleteItem=function(e){
        const selectedProduct=PrdctCtrl.getCurrentProduct();
        PrdctCtrl.deleteProduct(selectedProduct);
        
        UICtrl.deleteItem();
        UICtrl.showTotal(PrdctCtrl.getTotal());
        UICtrl.addingState();
        e.preventDefault();      
    }
    
    return {
        init:function(){
            console.log("Starting App...");
      
            UICtrl.addingState();
            
            const products=PrdctCtrl.getProducts(); 
            uploadHtml();
            loadEventListeners();
        }
    }
})(ProductController,UIController,StorageController);


//
async function Start(){
    
    await USDtoTRY();
    
    AppController.init();

}
Start();
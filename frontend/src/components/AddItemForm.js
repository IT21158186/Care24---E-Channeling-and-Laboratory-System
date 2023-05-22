import React,{useState} from "react"
import axios from "axios";
import swal from 'sweetalert'

export default function AddItemForm() {

    const [itemCode, setItemCode] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    //Submit add item form
    const handleForm = (e) => {
        e.preventDefault()

        if (!itemCode) {
            swal({  
                title: " Oops!",
                text: " Enter the Item/Service Code. ",  
                icon: "error",  
                button: "OK",  
              });
        } if (!description) {
            swal({  
                title: " Oops!",
                text: " Enter the Item/Service Description. ",  
                icon: "error",  
                button: "OK",  
              });
        }if (!price) {
            swal({  
                title: " Oops!",
                text: " Enter the price. ",  
                icon: "error",  
                button: "OK",  
              });
        } else {
            const newItem = {
                itemCode,
                description,
                price,
            }

            axios.post('http://localhost:8070/catalog/add', newItem).then(()=>{
                swal({
                    title: "Item Added!",
                    text: "The new Item/Service added to the Database.",
                    icon: "success",
                    button: "OK",
                  });
            }).catch((err) => {
                swal({
                    title: "Error!",
                    text: "Something went wrong, check your connection!",
                    icon: "error",
                    button: "Ok",
                  });
            })
        }
    }

    return(
        <><div className='dashboard'>
        <div className='dashboard-app'>
          <div className='dashboard-content'>
            <div>
                <h1>Thathsara S.M.K</h1>
                <h1>ITP Oroject</h1>
                <h1>SLIIT</h1>
            </div>
            <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
            <form onSubmit={handleForm}>
            <h1 className="font-bold uppercase tracking-wide text-xl mb-10 flex">Add Item/Service</h1>
                <div className="flex flex-col">
                    <label htmlFor="itemCode">Service/Item Code</label>
                    <input type="text" name="itemCode" id="itemCode" placeholder="Enter Item Code" value={itemCode}
                    onChange={(e) => setItemCode(e.target.value)} /> 
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" placeholder="Enter Description" value={description}
                    onChange={(e) => setDescription(e.target.value)} /> 
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" id="price" placeholder="Enter Price" value={price}
                    onChange={(e) => setPrice(e.target.value)} /> 
                </div>

                <button type="submit" className="bg-black mb-5 bg-yellow-500 text-white font-bold py-2 px-8 rounded shadow
                border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-300">
                    Add Item
                </button>
            </form>
            </main></div></div></div>
        </>
    )
}
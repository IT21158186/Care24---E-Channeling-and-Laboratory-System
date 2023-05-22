import React, { useState, useEffect } from "react"
import axios from "axios"
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import { v4 as uuidv4 } from "uuid"
import swal from 'sweetalert'


export default function TableForm({
    invoiceNumber,
    itemCode,
    setItemCode,
    description,
    setDescription,
    price,
    setPrice,
    quantity,
    setQuantity,
    amount,
    setAmount,
    list,
    setList,
    total,
    setTotal
}) {
    const [isEditing, setIsEditing] = useState(false)

    //Submit invoice form function
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!quantity) {
            swal({  
                title: " Oops!",
                text: " Fill the required input fields. ",  
                icon: "error",  
                button: "OK",  
            });
        } else {
            
            const newItems = {
                id: uuidv4(),
                invoiceNumber,
                itemCode,
                description,
                quantity,
                price,
                amount,
            }
            setItemCode("")
            setDescription("")
            setQuantity("")
            setPrice("")
            setAmount("")
            setList([...list, newItems])
            setIsEditing(false)
            console.log(list)

            if (!description) {
                //fetch data from the database
                axios.post('http://localhost:8070/catalog/get/:id', description).then(()=>{
                    alert('Description Added')
                }).catch((err) => {
                    alert(err)
                })
            }

            if (!price) {
                //fetch data from the database
                axios.post('http://localhost:8070/catalog/get/:id', price).then(()=>{
                    alert('Price Added')
                }).catch((err) => {
                    alert(err)
                })
            }

            axios.post('http://localhost:8070/invoice/add', newItems).then(()=>{
                alert('Item Added')
            }).catch((err) => {
                alert(err)
            })
            
        }
    }

    // calculate amount function
    useEffect(() =>{
        const calculateAmount = (_amount) => {
            setAmount(quantity * price)
        }

        calculateAmount(amount)
    }, [amount, price, quantity, setAmount])

    //calculate total amount
    useEffect(() => {
        let rows = document.querySelectorAll(".amount")
        let sum = 0
        
        for(let i = 0; i < rows.length; i++) {
            if(rows[i].className === "amount"){
                sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
                setTotal(sum)
            }
        }
    })

    //edite function
    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id)
        setList(list.filter((row) => row.id !== id))
        setIsEditing(true)
        setDescription(editingRow.description)
        setItemCode(editingRow.itemCode)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)
    } 

    //delete function
    const deleteRow = (id) => {
        setList(list.filter((row) => row.id !== id))

        // delete data
        /*axios
            .delete("http://localhost:8070/invoice/delete/" + id)
            .then(() => {
                setList(list.filter((row) => row._id !== id));
                alert("Deleted Successfully");
            })
            .catch((err) => {
                alert(err.message);
            });*/
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="flex flex-col md:mt-16">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="description" placeholder="Enter Description" value={description}
                    onChange={(e) => setDescription(e.target.value)} /> 
                </div>

                <div className="md:grid grid-cols-4 gap-10">
                    <div className="flex flex-col">
                        <label htmlFor="itemCode">Service/Item Code</label>
                        <input type="text" name="itemCode" id="itemCode" placeholder="Enter Service/Item Code" value={itemCode}
                        onChange={(e) => setItemCode(e.target.value)} /> 
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" placeholder="Enter Price" value={price}
                        onChange={(e) => setPrice(e.target.value)} /> 
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" name="quantity" id="quantity" placeholder="Enter Quantity" value={quantity}
                        onChange={(e) => setQuantity(e.target.value)} /> 
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="amount">Amount</label>
                        <p>{amount}</p> 
                    </div>
                    <button type="submit" className="bg-black mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow
                    border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                        {isEditing ? "Edit" : "Service/Item +"}
                    </button>
                </div>
            </form>

            {/* table items */}
            <table width="100%" className="mb-10">
                        <thead>
                            <tr className="bg-gray-100 p-1">
                                <td className="font-bold">Service/Item Code</td>
                                <td className="font-bold">Description</td>
                                <td className="font-bold">Price</td>
                                <td className="font-bold">Qty</td>
                                <td className="font-bold">Amount</td>
                            </tr>
                        </thead>
                {list.map(({ id, itemCode, description, quantity, price, amount}) => (
                    <React.Fragment key={id}>
                        <tbody>
                            <tr>
                                <td>{itemCode}</td>
                                <td>{description}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                                <td className="amount">{amount}</td>
                                <td><button onClick={() => deleteRow(id)}>
                                    <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => editRow(id)}>
                                        <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                ))}
            </table>

            <div>
                <h2 className="text-gray-800 text-4xl font-bold">Rs. {total.toLocaleString()}</h2>
            </div>
        </>
    )
}
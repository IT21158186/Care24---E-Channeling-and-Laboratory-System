import { useState, useRef, useEffect } from "react";
import React from "react";
import ClientDetails from "./ClientDetails";
import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
/*import Notes from "./components/Notes";*/
import Table from "./Table";
import TableForm from "./TableForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactToPrint from "react-to-print";
import axios from "axios"
import swal from 'sweetalert'



function Invoice() {
    const [showInvoice, setShowInvoice] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [clientName, setClientName] = useState("")
    const [clientAddress, setClientAddress] = useState("")
    const [clientPhone, setClientPhone] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    /*const [notes, setNotes] = useState("")*/
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [itemCode, setItemCode] = useState("")
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
  
    const componentRef = useRef()
  
    const handlePrint = () => {
      window.print()
    }
  
    //submit client data
    const submitInvoice = (e) => {
      e.preventDefault()
  
      const newInvoice = {
        clientName,
        clientAddress,
        clientPhone,
        clientEmail,
        invoiceNumber,
        invoiceDate,
        total
      }

      if (clientPhone.length == 10) {
        axios.post('http://localhost:8070/customer/add', newInvoice).then(()=>{
        swal({  
          title: " Added!",
          text: " Invoice Added. ",  
          icon: "success",  
          button: "OK",  
        });
      }).catch((err) => {
        alert(err)
      })
    }else {
      alert("error")
    }
      }
  
      
  
    useEffect(() => {
      setInvoiceNumber(Math.floor(Math.random() * 999999) + 1);
    }, []);
  
    return (
      <div>
      <div className='container dashboard'>
                <div className='dashboard-app'>
                <div className='dashboard-content'>
        <div className="md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
          <h1>Thathsara S.M.K</h1>
          <h1>ITP project 2023</h1>
          <h1>SLIIT</h1>
        </div>
        <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
          {showInvoice ? (
            <>
              <button onClick={() => setShowInvoice(false)}
              className="bg-black ml-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2
              border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Edit Info
              </button>
  
              <div ref={componentRef} className="p-5">
                <Header handlePrint={handlePrint} />
  
                <MainDetails name={name} address={address} />
  
                <ClientDetails clientName={clientName} clientAddress={clientAddress} clientPhone={clientPhone} clientEmail={clientEmail} invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} />
  
                <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} />
              
                <Table
                  itemCode={itemCode}
                  description={description}
                  price={price}
                  quantity={quantity}
                  amount={amount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                />
                
                {/*<Notes notes={notes} />*/}
  
                <Footer name={name} address={address} email={email} phone={phone} />
              </div>
  
              <ReactToPrint trigger={() => 
                <button className="bg-black ml-5 bg-green-500 text-white font-bold py-2 px-8 rounded shadow border-2
                border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300">
                  Print/Download
                </button>} content={() => componentRef.current}
              />
            </>
          ) : (
              <>
                <div className="flex flex-col justify-center">
                  <form onSubmit={submitInvoice}>
                  <article className="md:grid grid-cols-2 gap-10">
                    <div className="flex flex-col">
                      <label htmlFor="name">Your name</label>
                      <input type="text" name="name" id="name" placeholder="Enter your name" autoComplete="off"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <label htmlFor="address">Your EID</label>
                      <input type="text" name="address" id="address" placeholder="Enter your EID" autoComplete="off"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </article>
  
                  <article className="md:grid grid-cols-2 gap-10">
                    <div className="flex flex-col">
                      <label htmlFor="email">Your email</label>
                      <input type="text" name="email" id="email" placeholder="Enter your email" autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <label htmlFor="phone">Your phone Number</label>
                      <input type="text" name="phone" id="phone" placeholder="Enter your phone number" autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </article>
  
                  <article className="md:grid grid-cols-1 gap-10 md:mt-10">
                    <div className="flex flex-col">
                      <label htmlFor="clientName">Customer Name</label>
                      <input type="text" name="email" id="clientName" placeholder="Enter Customer Name" autoComplete="off"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                  </article>
  
                  <article className="md:grid grid-cols-3 gap-10">
                    <div className="flex flex-col">
                      <label htmlFor="clientAddress">Customer Address</label>
                      <input type="text" name="clientAddress" id="clientAddress" placeholder="Enter Customer Address" autoComplete="off"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <label htmlFor="clientPhone">Customer Phone Number</label>
                      <input type="text" name="clientPhone" id="clientPhone" placeholder="Enter Customer Phone Number" autoComplete="off"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <label htmlFor="clientEmail">Customer Email</label>
                      <input type="text" name="clientEmail" id="clientEmail" placeholder="Enter Customer Email" autoComplete="off"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                  </article>
  
                  <article className="md:grid grid-cols-2 gap-10 md:mt-10">
                    <div className="flex flex-col">
                      <label htmlFor="invoiceNumber">Invoice Number</label>
                      <p>{invoiceNumber}</p>
                    </div>
  
                    <div className="flex flex-col">
                      <label htmlFor="invoiceDate">Invoice Date</label>
                      <input type="date" name="invoiceDate" id="invoiceDate" placeholder="Enter Customer Address" autoComplete="off"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                      />
                    </div>
                  </article>
                  <button type="submit" className="mr-5 bg-yellow-500 text-white font-bold py-2 px-8 mt-5 rounded shadow
                  border-2 bg-black border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition-all duration-300">
                    save
                  </button>
                  </form>
  
                  {/* This is our table */}
                  <article>
                      <TableForm
                      invoiceNumber={invoiceNumber}
                      itemCode={itemCode}
                      setItemCode={setItemCode}
                      description={description}
                      setDescription={setDescription}
                      price={price}
                      setPrice={setPrice}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      amount={amount}
                      setAmount={setAmount}
                      list={list}
                      setList={setList}
                      total={total}
                      setTotal={setTotal}
                    />
                  </article>
  
                  {/*<label htmlFor="clientAddress">Additional Notes</label>
                  <textarea name="notes" id="notes" cols="30" rows="10" placeholder="Additional notes to the client"
                  value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>*/}
  
                  <button onClick={() => setShowInvoice(true)}
                  className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500
                  hover:bg-transparent bg-black hover:text-blue-500 transition-all duration-300">
                    Preview Invoice
                  </button>
                </div>
              </>
            )}
        </main>
      <div/></div></div></div></div>
    );
  }
  
  export default Invoice;
  
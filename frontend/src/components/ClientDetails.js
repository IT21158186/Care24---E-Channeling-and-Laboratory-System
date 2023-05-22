import React from "react";
export default function ClientDetails({clientName, clientAddress, clientPhone, clientEmail, invoiceNumber, invoiceDate}) {
    return(
        <>
            <article className="my-5 md:grid grid-cols-2 gap-10">
                <section className="mt-5">
                    <h2 className="text-xl uppercase">{clientName}</h2>
                    <p>{clientAddress}</p>
                    <p>{clientPhone}</p>
                    <p>{clientEmail}</p>
                </section>
                <ul>
                    <li className="p-1 flex items-end justify-end mt-5">
                        <span className="font-bold">Invoice Number: </span> {invoiceNumber}
                    </li>
                    <li className="p-1 flex items-end justify-end">
                        <span className="font-bold">Invoice Date: </span> {invoiceDate}
                    </li>
                </ul>
            </article>
        </>
    )
}
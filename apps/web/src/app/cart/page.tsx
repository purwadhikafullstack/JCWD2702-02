"use client"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter()

    return (
        <div>
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="p-5 text-left">Product</th>
                                <th className="p-5 text-right">Quantity</th>
                                <th className="p-5 text-right">Price</th>
                                <th className="p-5">Action</th>
                            </tr>
                        </thead>
                        <tbody>


                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="card p-5">
                        <ul>
                            <li>
                                <div className="pb-3 text-xl">

                                </div>
                            </li>
                            <li>
                                <button
                                    onClick={() => router.push('/shipping')}
                                    className="primary-button w-full"
                                >
                                    Proceed to checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
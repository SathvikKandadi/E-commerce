import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Shoe {
    _id?: string,
    img: string,
    title: string,
    brand: string,
    price: string,
    sizes: number[],
}

interface Order {
    _id?: string,
    shoe: Shoe,
    quantity: number,
}

function Cart() {

    const [cart, setCart] = useState<Order[]>([]);
    const session = useSession();
    const router = useRouter();
    // const apiUrl = process.env.NEXT_APP_API_URL || 'http://localhost:3000';
    const apiUrl ="";

    useEffect(() => {
        if (session.data) {
            const username = session.data.user?.name;

            const fetchData = async () => {
                try {
                    const resp = await axios.get(`${apiUrl}/api/cart/${username}`);
                    setCart(resp.data.cart);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            };
            fetchData();
        }
    }, [session.data]);

    return (


        <div className="m-10">
            {
                (session.data) ?
                    <div>
                        <div className="text-3xl font-bold">Your Cart</div>
                        {
                            (cart.length === 0) ?
                                <div>
                                    <div className="mt-6">Continue browsing <Link href="/"><span className="text-red-500 text-md">here</span></Link>. </div>
                                    <div className="mt-6">Cart is empty</div>
                                </div>
                                :
                                <div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1 mt-10 mb-8"></div>
                                        <div className="grid grid-cols-3 mt-10 mb-8">
                                            <div className="font-bold ">Price</div>
                                            <div className="font-bold ">Quantity</div>
                                            <div className="font-bold ">Total</div>
                                        </div>
                                        {
                                            cart.map((order) => (
                                                <>
                                                    <div className="col-span-2">
                                                        <hr className="border-t-1 border-slate-600" />
                                                    </div>


                                                    <div className="grid grid-cols-2">
                                                        <div className="col-span-1"><img src={order.shoe.img}></img></div>
                                                        <div className="col-span-1">
                                                            <div className="text-red-500 font-bold m-1">{order.shoe.title}</div>
                                                            <div className="text-sm m-1">{`UK ${order.shoe.sizes[0]}`}</div>
                                                            <button className="text-red-500 text-sm m-1" onClick={() => removeShoe(order.shoe.title)}>Remove</button>
                                                        </div>
                                                    </div>
                                                    {/* Shoe details */}
                                                    <div className="grid grid-cols-3">
                                                        <div className="font-bold col-span-1">{order.shoe.price}</div>
                                                        <div>
                                                            <input className="border border-solid border-gray-400 border-1 p-2 w-1/3" type="number" value={order.quantity}></input>
                                                        </div>
                                                        <div className="col-span-1 font-bold">{convertNumberToString(convertStringToNumber(order.shoe.price) * order.quantity)}</div>
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>


                                    <div className="flex flex-row justify-end">
                                        <div>
                                            <div >Subtotal <span className="font-bold ml-4">{calculateSubTotal()}</span></div>
                                            <div>Taxes and <span className="text-red-500">shipping</span> calculated at checkout</div>
                                            <div className="mt-4">
                                                <button className="text-red-500 border-2 border-red-500 p-4 m-1" onClick={() => router.push("/")}>CONTINUE SHOPPING</button>
                                                <button className="text-slate-50 border-2 border-red-600 p-4 m-1 bg-red-600">CHECK OUT</button>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                        }

                    </div>
                    :
                    <div className="m-10 ">
                        <div className="m-2 text-2xl font-bold">You are not logged in</div>
                        <div className="m-2">Login <Link href="/signin"><span className="text-red-500 text-md">here</span></Link>. </div>
                        <div className="m-2">Continue browsing <Link href="/"><span className="text-red-500 text-md">here</span></Link>. </div>
                    </div>
            }
        </div>




    )

    async function removeShoe(title: string) {
        // console.log(title);
        const resp = await axios.post(`${apiUrl}/api/cart/product/${title}`,
            {
                username: session.data?.user?.name,
            }
        )
        setCart(resp.data.cart);
    }

    function convertStringToNumber(inputString: string): number {

        // Removing Decimals points
        const stringWithoutDecimalSeparator = inputString.split('.')[1];

        // Removing Comma's
        const stringWithoutComma = stringWithoutDecimalSeparator.replace(/,/g, '');

        // Removing Whitespaces
        const stringWithoutWhitespace = stringWithoutComma.replace(/\s/g, '');

        // Converting the string to Numeric
        const numericValue = parseFloat(stringWithoutWhitespace);

        // Check if the parsing was successful
        if (!isNaN(numericValue)) {
            return numericValue;
        } else {
            console.error(`Failed to convert string "${inputString}" to a number.`);
            return 0;
        }

    }

    function convertNumberToString(inputNumber: number): string {
        const formattedString = inputNumber.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return formattedString.replace('₹', 'Rs. ');
    }

    function calculateSubTotal(): string {
        let subTotal = 0;
        cart.map((order) => {
            subTotal += convertStringToNumber(order.shoe.price) * order.quantity;
        })
        return convertNumberToString(subTotal);
    }


}

export default Cart
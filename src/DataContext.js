import axios from "axios";
import React, { createContext, useCallback, useState, useMemo, useReducer } from "react";



/**======================
 *!    Initial State
*========================**/
let initialState = {
      earphones: [],
      headphones: [],
      speakers: [],
      loading: false,
      item_total: 0,
      grand_total: 0,
      quantity: 0,
      cart: [],
}




/**------------------------------------------------------------------------
 **                           Reducer Functions
 *?  A Collection of functions that operates on data 
 *@param action.type used in switch statements
 *@param action.payload used as arguments to feed initial state veriable  
 *@return return state
 *------------------------------------------------------------------------**/
const reducer = (state, action) => {
      switch (action.type) {
            case "GET_EARPHONE": {
                  let earphones = action.payload.filter((item) => item.category === "earphones")
                  // console.log("reduced to earphones:", earphones);
                  return { ...state, earphones }
            }
            case "GET_HEADPHONE": {
                  let headphones = action.payload.filter((item) => item.category === "headphones");
                  // console.log("reduced to headphones:", headphones);
                  return { ...state, headphones };
            }
            case "GET_SPEAKER": {
                  let speakers = action.payload.filter((item) => item.category === "speakers");
                  // console.log("reduced to speakers:", speakers);
                  return { ...state, speakers };
            }

            case "ADD_TO_CART": {
                  let item = action.payload
                  // adding item into card array
                  let cart = [...state.cart, item]
                  // console.log("cart value will be", cart);
                  return { ...state, cart };
            }
            case "CART_INC":
                  return state;
            case "CART_DEC":
                  return state;
            case "CART_REMOVE":
                  return state;
            case "CART_CLEAR":
                  return state;
            case "GRAND_TOTAL":
                  console.log("length", state.cart.length);
                  let { grand_total, quantity } = state.cart.reduce((accum, item) => {
                        // Get the quantity of the current item
                        let quantity = state.cart.filter((obj) => obj.slug === item.slug).length;

                        // must be to pure function
                        // Multiply the price of the current item by its quantity and add it to the accumulator
                        function calcAccum(price, quantity) {
                              let item_total = price * quantity;
                              return {
                                    grand_total: item_total,
                                    quantity: quantity
                              }
                        }
                        let res = calcAccum(item.price, quantity);
                        accum = res
                        return accum;
                  }, { grand_total: 0, quantity: 0 });

                  return { ...state, grand_total, quantity };

            case "LOADING":
                  return { ...state, lodaing: action.payload }
            default:
                  break;
      }
}


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
      let [allData, setAllData] = useState({});
      const [state, dispatch] = useReducer(reducer, initialState);
      const url = "http://localhost:5555/api/allproducts";

      /**========================================================================
       **                           DISPATCHER FUNCTIONS
      *?  What does it do?
      * A collection of function declaration, which will trigger reducer().
      *@param name type  
      *@param name type  
      *@return type
      *========================================================================**/
      const getearphone = (data) => { dispatch({ type: "GET_EARPHONE", payload: data }) }
      const getheadphone = (data) => { dispatch({ type: "GET_HEADPHONE", payload: data }) }
      const getspeaker = (data) => { dispatch({ type: "GET_SPEAKER", payload: data }) }
      const increase = (id) => { dispatch({ type: "CART_INC", payload: id }) }
      const decrease = (id) => { dispatch({ type: "CART_DEC", payload: id }) }
      const remove = (id) => { dispatch({ type: "CART_REMOVE", payload: id }) }
      const clearcart = () => { dispatch({ type: "CART_CLEAR" }) }
      const addtocart = (item) => { dispatch({ type: "ADD_TO_CART", payload: item }) }



      const getData = useCallback(() => {
            console.log("context called");
            dispatch({ type: "LOADING", payload: true })
            axios.get(url).then(
                  (response) => {
                        setAllData(response.data)
                        // console.log("allData:::", response.data);
                        dispatch({ type: "LOADING", payload: false })
                        getearphone(response.data)
                        getheadphone(response.data)
                        getspeaker(response.data)


                  }
            ).catch((e) => { console.log("axiosError::", e) })
      }, [])
      getData()

      const stored = useMemo(
            () => ({
                  earphones: state.earphones,
                  headphones: state.headphones,
                  speakers: state.speakers,
                  loading: state.loading,
                  item_total: state.item_total,
                  grand_total: state.grand_total,
                  quantity: state.quantity,
                  cart: state.cart,
            }), [state.earphones, state.headphones, state.speakers, state.loading, state.item_total, state.quantity, state.grand_total, state.cart,]
      )

      // console.log("stored val", stored);
      return (
            <DataContext.Provider value={[stored, increase, decrease, addtocart, remove, clearcart]}>
                  {children}
            </DataContext.Provider>
      )

}

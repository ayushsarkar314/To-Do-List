import { createContext, useContext } from "react";

export const todocontext = createContext({
    todosarray : [
       {
         id : 1,
         todotext : "msg",
         checked : false
       }
    ],
    addTodo : () => {},
    removeTodo : () => {},
    updateTodo : () => {},
    toggleChecker : () => {}
});

export const Todocontextprovider = todocontext.Provider;

export default function useTodo(){
    return useContext(todocontext)
}
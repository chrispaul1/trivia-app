import React, { useEffect, useRef } from "react";
export function useOnClickOutside(ref, handler){

    useEffect(()=>{
        function handleClickOutside(event){

            if (ref.current && !ref.current.contains(event.target)) {

                if (!document.contains(event.target)) return;

                handler(event)
                return
            }

        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)

    },[ref,handler])
}
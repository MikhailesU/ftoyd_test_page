import { useEffect, useState } from "react";

export default function useScreenSize(sizes: number[]) {
    const [size, setSize] = useState({ width: 0, height: 0 })
    
    const SetProcess = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })

        document.documentElement.style.setProperty("--screen-factor", (() => {
            let factor;
            for (let s of sizes) {
                if (size.width <= s) {
                    factor = ((size.width / s).toFixed(4));
                    break
                }
                else continue;
            }
            if (factor) return factor;
            else return (size.width / sizes[sizes.length - 1]).toFixed(4);
        })().toString());
    }

    useEffect(() => SetProcess(), [size])

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {

        window.onresize = () => SetProcess()
        return null
    }
}

"use client";

import "./styles.css";
import { Palette, Sun, CircleHalf, Clipboard } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

export default function IlluminationConfig() {
    const ref = useRef<HTMLDivElement>(null);
    const [hue, setHue] = useState("180");
    const [saturation, setSaturation] = useState("100");
    const [brightness, setBrightness] = useState("50");

    useEffect(() => {
        const className = ref.current?.classList[ref.current?.classList.length - 1];
        if (className?.includes('hsl')) {
            ref.current?.classList.remove(className as string);
            ref.current?.classList.add(`hsl(${hue},${saturation}%,${brightness}%)`);
        }
    }, [hue, brightness, saturation]);

    return (
        <div className="w-[430px] h-[930px] bg-[#151515] shadow-md rounded-md relative overflow-hidden">
            <div 
                ref={ref}
                style={{
                    background: `hsl(${hue},${saturation}%,${brightness}%)`,
                    boxShadow: `0px 0px 53px 13px hsl(${hue},${saturation}%,${brightness}%)`,
                }}
                className={`h-[846px] w-[846px] top-[-496px] left-[calc(50%-846px/2+12px)] absolute rounded-full`}
            ></div>
            <div className="h-2/3 mt-[455px] mb-20 mx-[3.375rem]">
                <h1 className="text-white background-picker text-[32px] leading-[38px] font-light">Ajustes de Iluminação</h1>
                <div className="flex flex-col gap-[82px]">
                    <div className="text-white flex gap-4 mt-20 items-center justify-center">
                        <Palette width={24} height={24} />
                        <input
                            name="hue"
                            style={{
                                accentColor: `hsl(${hue},100%,50%)`
                            }}
                            className="flex-1 appearance-none h-[5px] focus:border-white rounded-md track-hue"
                            type="range" 
                            min="0" 
                            max="360" 
                            defaultValue={180} 
                            value={hue}
                            onChange={(event) => setHue(event.target.value)} />
                        <Clipboard width={24} height={24} className="cursor-pointer" onClick={() => navigator.clipboard.writeText(`hsl(${hue}, ${brightness}%, ${saturation}%)`)} />
                    </div>
                    <div className="text-white flex gap-4 items-center justify-center">
                        <Sun width={24} height={24} />
                        <input
                            name="brightness"
                            className="flex-1 appearance-none h-[5px] accent-white focus:border-white rounded-md"
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={100}
                            value={brightness}
                            onChange={(event) => setBrightness(event.target.value)} />
                        <span>{brightness}%</span>
                    </div>
                    <div className="text-white flex gap-4 items-center justify-center">
                        <CircleHalf width={24} height={24} />
                        <input
                            name="saturation"
                            className="flex-1 appearance-none h-[5px] accent-white focus:border-white rounded-md"
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={50}
                            value={saturation}
                            onChange={(event) => setSaturation(event.target.value)} />
                        <span>{saturation}%</span>
                    </div>
                </div>
            </div>
        </div>
    )   
}
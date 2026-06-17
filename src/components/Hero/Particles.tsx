'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const GOLDS=['rgba(255,235,120,.72)','rgba(245,210,60,.68)','rgba(255,248,170,.60)','rgba(201,168,76,.75)','rgba(240,200,80,.65)','rgba(220,180,55,.58)','rgba(255,225,100,.70)']

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const c=ref.current; if(!c) return
    const els:HTMLDivElement[]=[]
    for(let i=0;i<52;i++){
      const el=document.createElement('div')
      const isRect=Math.random()>.42
      const col=GOLDS[Math.floor(Math.random()*GOLDS.length)]
      const dur=Math.random()*8+12, delay=Math.random()*18-9
      const left=Math.random()*100
      const w=Math.random()*4+2.5, h=isRect?Math.random()*9+5:w
      el.style.cssText=`position:absolute;width:${w}px;height:${h}px;border-radius:${isRect?'1.5px':'50%'};background:${col};left:${left}%;top:-20px;animation:confettiFall ${dur}s ${delay}s linear infinite;filter:drop-shadow(0 0 2px rgba(245,210,60,.4));`
      c.appendChild(el); els.push(el)
    }
    return ()=>els.forEach(el=>el.remove())
  },[])
  return <div ref={ref} className={styles.particles} aria-hidden="true"/>
}

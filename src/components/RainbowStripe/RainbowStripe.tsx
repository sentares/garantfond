export default function RainbowStripe() {
  const colors = ['#C42020','#CC3A18','#DC5C10','#C9A84C','#1B3E8F','#2455B0']
  return (
    <div style={{height:'4px',display:'flex'}}>
      {colors.map(c=><div key={c} style={{flex:1,background:c}}/>)}
    </div>
  )
}

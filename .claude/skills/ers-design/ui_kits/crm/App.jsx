function App(){
  const [tab,setTab]=React.useState('home');
  const screens={home:window.Home,tickets:window.Tickets,calls:window.Calls,chats:window.Chats,history:window.History};
  const Screen=screens[tab];
  return (<div style={{display:'flex',height:'100vh',background:'var(--bg-canvas)',fontFamily:'var(--font-sans)',overflow:'hidden'}}>
    <window.Sidebar active={tab} onNav={setTab}/>
    <div style={{flex:1,overflowY:'auto'}}><Screen/></div>
  </div>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

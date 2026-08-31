function Home(){
  const {StatCard,Tabs,Badge,Avatar,ProgressBar}=window.CRMDesignSystem_14b93b;
  const [range,setRange]=React.useState('День');
  const upcoming=[
    {time:'10:30',title:'Звонок с клиентом ООО «Вектор»',type:'Звонок',person:'Мария Соколова'},
    {time:'11:00',title:'Обращение №85374 — согласовать возврат',type:'Обращение',person:'Артём Ким'},
    {time:'13:15',title:'Групповой чат — интеграция API',type:'Чат',person:'Ольга Новак'},
    {time:'15:00',title:'Обращение №85401 — уточнить детали заказа',type:'Обращение',person:'Иван Петров'},
  ];
  return (<div style={{padding:32,display:'flex',flexDirection:'column',gap:24}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div>
        <div style={{font:'var(--text-display)',fontWeight:800,color:'var(--text-primary)'}}>Доброе утро, Иван</div>
        <div style={{font:'var(--text-body)',color:'var(--text-secondary)',marginTop:4}}>31 августа 2026 · 12 из 15 сотрудников на месте</div>
      </div>
      <Tabs items={['День','Неделя','Месяц']} active={range} onChange={setRange}/>
    </div>
    <div style={{display:'flex',gap:16}}>
      <div className="lift" style={{flex:1}}><StatCard label="Активных обращений" value="128" delta="12% за неделю" deltaDirection="up" trend={[40,52,48,60,55,70,66,80]}/></div>
      <div className="lift" style={{flex:1}}><StatCard label="Звонков сегодня" value="342" delta="5% за неделю" deltaDirection="up" trend={[60,55,62,58,70,65,74,78]}/></div>
      <div className="lift" style={{flex:1}}><StatCard label="Открытых чатов" value="47" delta="2% за неделю" deltaDirection="down" trend={[70,65,68,60,58,55,50,48]}/></div>
      <div className="lift" style={{flex:1}}><StatCard label="Среднее время ответа" value="4.8м" delta="8% за неделю" deltaDirection="down" accent="var(--danger)" trend={[30,35,40,38,45,50,55,60]}/></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:16}}>
      <div className="lift" style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',padding:20,boxShadow:'var(--shadow-card)'}}>
        <div style={{font:'var(--text-h3)',color:'var(--text-primary)',fontWeight:700,marginBottom:16}}>Нагрузка по отделам</div>
        {[['Продажи',82,'var(--accent)'],['Поддержка',56,'var(--success)'],['Техотдел',34,'var(--warning)']].map(([n,v,c])=>(
          <div key={n} style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',font:'var(--text-body-sm)',color:'var(--text-secondary)',marginBottom:6}}><span>{n}</span><span>{v}%</span></div>
            <ProgressBar value={v} color={c}/>
          </div>))}
      </div>
      <div className="lift" style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',padding:20,boxShadow:'var(--shadow-card)'}}>
        <div style={{font:'var(--text-h3)',color:'var(--text-primary)',fontWeight:700,marginBottom:16}}>Мои ближайшие</div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {upcoming.map((u,i)=>(<div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{font:'var(--text-body-sm)',color:'var(--text-tertiary)',width:44}}>{u.time}</div>
            <Avatar name={u.person} size={28}/>
            <div style={{flex:1}}>
              <div style={{font:'var(--text-body-sm)',color:'var(--text-primary)'}}>{u.title}</div>
              <Badge tone="neutral" style={{marginTop:4}}>{u.type}</Badge>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  </div>);
}
window.Home=Home;

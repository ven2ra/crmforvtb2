function Calls(){
  const {Icon,Avatar,AvatarStack,Badge,Tabs,IconButton,Button,Dialog,Select,Input}=window.CRMDesignSystem_14b93b;
  const [range,setRange]=React.useState('Дни');
  const [view,setView]=React.useState('Текущие');
  const [wrapup,setWrapup]=React.useState(null);
  const ongoing=[
    {name:'Софья Хайес',duration:'04:38',incoming:24,pending:0,team:['Иван Петров','Артём Ким'],id:'35374'},
    {name:'Оуэн Дарнелл',duration:'3ч 10м',incoming:10,pending:4,team:['Мария Соколова'],id:'98745'},
    {name:'Эмма Ларкин',duration:'6ч 29м',incoming:29,pending:8,team:['Ольга Новак','Дарья Лис'],id:'85427'},
  ];
  const starting=['Лиам Грейсон','Мия Дженнингс'];
  const history=[
    {id:'35001',name:'Пётр Абрамов',agent:'Иван Петров',date:'31.08.2026 09:14',duration:'06:22',result:'Решено',rec:true,ticket:'85374'},
    {id:'34988',name:'ООО «Вектор»',agent:'Мария Соколова',date:'30.08.2026 17:02',duration:'02:10',result:'Перенос',rec:true,ticket:null},
    {id:'34970',name:'Кузнецов Д.И.',agent:'Артём Ким',date:'30.08.2026 11:40',duration:'11:05',result:'Не решено',rec:false,ticket:'85198'},
    {id:'34955',name:'ИП Соколова',agent:'Ольга Новак',date:'29.08.2026 15:22',duration:'03:48',result:'Решено',rec:true,ticket:null},
  ];
  const resultTone={'Решено':'success','Не решено':'danger','Перенос':'warning'};
  return (<div style={{padding:32,display:'grid',gridTemplateColumns:'2.4fr 1fr',gap:20}}>
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{font:'var(--text-display)',fontWeight:800,color:'var(--text-primary)'}}>Звонки</div>
        <div style={{display:'flex',gap:10}}>
          <Tabs items={['Текущие','История']} active={view} onChange={setView}/>
          {view==='Текущие'&&<Tabs items={['Дни','Недели','Месяцы']} active={range} onChange={setRange}/>}
        </div>
      </div>
      {view==='Текущие'?(<React.Fragment>
        <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',padding:20,height:180,display:'flex',alignItems:'flex-end',gap:6,boxShadow:'var(--shadow-card)'}}>
          {[40,55,30,70,90,60,45,75,50,65,80,35].map((h,i)=>(<div key={i} style={{flex:1,height:h+'%',background:'var(--grad-accent)',borderRadius:6,opacity:h>75?1:.55,boxShadow:h>75?'var(--shadow-glow-accent)':'none',transition:'opacity .2s'}}/>))}
        </div>
        <div style={{font:'var(--text-h3)',fontWeight:700,color:'var(--text-primary)'}}>Текущие звонки</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14}}>
          {ongoing.map(c=>(<div key={c.id} className="lift" style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',padding:16,display:'flex',flexDirection:'column',gap:10,boxShadow:'var(--shadow-card)'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={c.name} status="busy"/><div><div style={{font:'var(--text-body-sm)',color:'var(--text-primary)',fontWeight:600}}>{c.name}</div><div style={{font:'var(--text-caption)',color:'var(--text-tertiary)'}}>{c.duration}</div></div></div>
            <div style={{display:'flex',gap:14,font:'var(--text-caption)',color:'var(--text-secondary)',alignItems:'center'}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:4}}><Icon name="phone" size={12}/>{c.incoming}</span>
              <span style={{display:'inline-flex',alignItems:'center',gap:4}}><Icon name="clock" size={12}/>{c.pending}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <AvatarStack names={c.team} size={22}/>
              <span style={{font:'var(--text-caption)',color:'var(--text-tertiary)'}}>ID {c.id}</span>
            </div>
            <Button variant="secondary" size="sm" onClick={()=>setWrapup(c)}>Завершить звонок</Button>
          </div>))}
        </div>
      </React.Fragment>):(
        <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'90px 1.4fr 1fr 1.2fr 90px 110px 90px',gap:12,padding:'12px 20px',font:'var(--text-caption)',color:'var(--text-tertiary)',borderBottom:'1px solid var(--border-subtle)'}}>
            <span>Запись</span><span>Клиент</span><span>Оператор</span><span>Дата</span><span>Длит.</span><span>Итог</span><span>Тикет</span>
          </div>
          {history.map(h=>(<div key={h.id} className="row-hover" style={{display:'grid',gridTemplateColumns:'90px 1.4fr 1fr 1.2fr 90px 110px 90px',gap:12,padding:'14px 20px',alignItems:'center',borderBottom:'1px solid var(--border-subtle)',font:'var(--text-body-sm)',color:'var(--text-primary)'}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:6,color:h.rec?'var(--accent-hover)':'var(--text-tertiary)'}}><Icon name="video" size={14}/>{h.rec?'есть':'нет'}</span>
            <span>{h.name}</span>
            <span style={{color:'var(--text-secondary)'}}>{h.agent}</span>
            <span style={{color:'var(--text-tertiary)'}}>{h.date}</span>
            <span style={{color:'var(--text-tertiary)'}}>{h.duration}</span>
            <Badge tone={resultTone[h.result]} dot>{h.result}</Badge>
            {h.ticket?<Badge tone="accent">№{h.ticket}</Badge>:<span style={{color:'var(--text-tertiary)'}}>—</span>}
          </div>))}
        </div>
      )}
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <div>
        <div style={{font:'var(--text-h3)',fontWeight:700,color:'var(--text-primary)',marginBottom:12}}>Начинаются звонки</div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {starting.map(n=>(<div key={n} style={{display:'flex',alignItems:'center',gap:10,background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-md)',padding:10}}><Avatar name={n} size={30}/><span style={{font:'var(--text-body-sm)',color:'var(--text-primary)',flex:1}}>{n}</span><IconButton icon={<Icon name="phone"/>}/></div>))}
        </div>
      </div>
      <div>
        <div style={{font:'var(--text-h3)',fontWeight:700,color:'var(--text-primary)',marginBottom:12}}>На перерыве</div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {[['Джек Линтон','00:17'],['Самуэль Уотерс','06:09'],['Генри Мерсер','10:40']].map(([n,t])=>(<div key={n} style={{display:'flex',alignItems:'center',gap:10,background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-md)',padding:10}}><Avatar name={n} size={30} status="offline"/><span style={{font:'var(--text-body-sm)',color:'var(--text-primary)',flex:1}}>{n}</span><Badge tone="warning">{t}</Badge></div>))}
        </div>
      </div>
    </div>
    <Dialog open={!!wrapup} title={wrapup?'Завершение звонка — '+wrapup.name:''} onClose={()=>setWrapup(null)}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Select options={[{value:'ok',label:'Решено'},{value:'no',label:'Не решено'},{value:'later',label:'Перенос'}]} value="ok"/>
        <Input placeholder="Комментарий по звонку"/>
        <div style={{display:'flex',gap:8,justifyContent:'space-between',marginTop:8}}>
          <Button variant="ghost">Создать обращение из звонка</Button>
          <div style={{display:'flex',gap:8}}>
            <Button variant="ghost" onClick={()=>setWrapup(null)}>Отмена</Button>
            <Button variant="primary" onClick={()=>setWrapup(null)}>Сохранить</Button>
          </div>
        </div>
      </div>
    </Dialog>
  </div>);
}
window.Calls=Calls;

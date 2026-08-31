function Tickets(){
  const {Tabs,Input,Select,Button,Badge,Avatar,Dialog}=window.CRMDesignSystem_14b93b;
  const [filter,setFilter]=React.useState('Все');
  const [open,setOpen]=React.useState(false);
  const [form,setForm]=React.useState({fio:'',agreement:'',topic:'',essence:'',sd:''});
  const topics=['Возврат средств','Доставка','Технический сбой','Изменение условий договора','Претензия по качеству'];
  const rows=[
    {id:'85374',fio:'Соколова Мария Игоревна',agreement:'СГ-2291/24',topic:'Возврат средств',sd:'SD-771204',status:'В работе',owner:'Мария Соколова',date:'31.08.2026'},
    {id:'85401',fio:'Иванов Артём Сергеевич',agreement:'СГ-0187/25',topic:'Доставка',sd:'Запрос в ПП',status:'Новое',owner:'Артём Ким',date:'31.08.2026'},
    {id:'85212',fio:'ООО «Технополис» (Волков Н.П.)',agreement:'СГ-4402/23',topic:'Технический сбой',sd:'SD-770988',status:'Закрыто',owner:'Ольга Новак',date:'29.08.2026'},
    {id:'85198',fio:'Петрова Елена Викторовна',agreement:'СГ-3310/24',topic:'Претензия по качеству',sd:'Запрос в ПП',status:'В работе',owner:'Иван Петров',date:'28.08.2026'},
  ];
  const toneMap={'Новое':'accent','В работе':'warning','Закрыто':'success'};
  const submit=()=>{setOpen(false);setForm({fio:'',agreement:'',topic:'',essence:'',sd:''});};
  return (<div style={{padding:32,display:'flex',flexDirection:'column',gap:20}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{font:'var(--text-display)',fontWeight:800,color:'var(--text-primary)'}}>Обращения</div>
      <Button variant="primary" onClick={()=>setOpen(true)}>+ Новое обращение</Button>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Tabs items={['Все','Новые','В работе','Закрытые']} active={filter} onChange={setFilter}/>
      <Input icon="search" placeholder="Поиск по ФИО или номеру соглашения" style={{width:300}}/>
    </div>
    <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-xl)',overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:'80px 1.6fr 1fr 1.2fr 1fr 110px 90px',gap:12,padding:'12px 20px',font:'var(--text-caption)',color:'var(--text-tertiary)',borderBottom:'1px solid var(--border-subtle)'}}>
        <span>№</span><span>ФИО клиента</span><span>№ соглашения</span><span>Тематика</span><span>№ SD</span><span>Статус</span><span>Дата</span>
      </div>
      {rows.map(r=>(<div key={r.id} className="row-hover" style={{display:'grid',gridTemplateColumns:'80px 1.6fr 1fr 1.2fr 1fr 110px 90px',gap:12,padding:'14px 20px',alignItems:'center',borderBottom:'1px solid var(--border-subtle)',font:'var(--text-body-sm)',color:'var(--text-primary)'}}>
        <span style={{color:'var(--text-tertiary)'}}>{r.id}</span>
        <div style={{display:'flex',alignItems:'center',gap:8}}><Avatar name={r.owner} size={22}/><span>{r.fio}</span></div>
        <span style={{color:'var(--text-secondary)'}}>{r.agreement}</span>
        <span style={{color:'var(--text-secondary)'}}>{r.topic}</span>
        <span style={{color:r.sd==='Запрос в ПП'?'var(--text-tertiary)':'var(--text-primary)'}}>{r.sd}</span>
        <Badge tone={toneMap[r.status]} dot>{r.status}</Badge>
        <span style={{color:'var(--text-tertiary)'}}>{r.date}</span>
      </div>))}
    </div>
    <Dialog open={open} title="Новое обращение" onClose={()=>setOpen(false)} style={{width:480}}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Input label="ФИО клиента" placeholder="Иванов Иван Иванович" value={form.fio} onChange={e=>setForm({...form,fio:e.target.value})}/>
        <Input label="Номер соглашения" placeholder="СГ-0000/00" value={form.agreement} onChange={e=>setForm({...form,agreement:e.target.value})}/>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <span style={{font:'var(--text-body-sm)',color:'var(--text-secondary)',fontWeight:600}}>Тематика обращения</span>
          <Select options={topics.map(t=>({value:t,label:t}))} value={form.topic||topics[0]} onChange={v=>setForm({...form,topic:v})}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          <span style={{font:'var(--text-body-sm)',color:'var(--text-secondary)',fontWeight:600}}>Суть обращения</span>
          <textarea placeholder="Опишите суть обращения клиента..." value={form.essence} onChange={e=>setForm({...form,essence:e.target.value})} style={{width:'100%',minHeight:90,background:'var(--bg-surface-2)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-md)',padding:10,color:'var(--text-primary)',font:'var(--text-body-sm)',resize:'vertical'}}/>
        </div>
        <Input label="Номер SD" placeholder="Если нет — оставьте пустым" value={form.sd} onChange={e=>setForm({...form,sd:e.target.value})}/>
        {!form.sd&&<span style={{font:'var(--text-caption)',color:'var(--text-tertiary)'}}>Без номера SD будет автоматически подставлено: «Запрос в ПП»</span>}
        <div style={{display:'flex',gap:8,justifyContent:'flex-end',marginTop:8}}>
          <Button variant="ghost" onClick={()=>setOpen(false)}>Отмена</Button>
          <Button variant="primary" onClick={submit}>Создать</Button>
        </div>
      </div>
    </Dialog>
  </div>);
}
window.Tickets=Tickets;

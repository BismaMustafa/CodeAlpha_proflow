import TaskCard from './TaskCard'

export default function Column({ title, tasks }) {
  return (
    <div className="w-[320px] bg-slate-900 rounded-3xl border border-slate-800 p-5">
      <h2 className="text-xl font-bold mb-5">{title}</h2>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </div>
    </div>
  )
}
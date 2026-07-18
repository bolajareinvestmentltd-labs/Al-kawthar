'use client';

export const LearningPath = () => {
  const paths = [
    { id: 1, title: 'Tajweed Fundamentals', status: 'Active' },
    { id: 2, title: 'Memorization Journey', status: 'Locked' }
  ];

  return (
    <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
      <h2 className="text-lg font-serif text-indigo-900 mb-4">Quran Learning Path</h2>
      <div className="space-y-3">
        {paths.map((path) => (
          <div key={path.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-sm font-medium">{path.title}</span>
            <span className={`text-[10px] px-2 py-1 rounded ${path.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
              {path.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

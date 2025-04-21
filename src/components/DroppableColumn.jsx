import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] p-4 rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-200 ${
        isOver ? "bg-indigo-100 border-indigo-300" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;

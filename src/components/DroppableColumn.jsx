import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] p-4 rounded shadow transition-all ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      {children}
    </div>
  );
};

export default DroppableColumn;

import { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

type Props = {
  id: string;
  customizing: boolean;
  label?: string;
  children: ReactNode;
};

export default function SortableSection({ id, customizing, label, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {customizing && (
        <div className="absolute -left-3 -top-3 z-10 flex items-center gap-2 rounded-md border border-dashed border-[hsl(var(--elka-red))]/60 bg-background/95 px-2 py-1 shadow-sm backdrop-blur">
          <button
            {...attributes}
            {...listeners}
            className="flex cursor-grab items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--elka-red))] active:cursor-grabbing"
            aria-label={`Déplacer la section ${label ?? id}`}
          >
            <GripVertical className="h-3.5 w-3.5" />
            {label ?? "Section"}
          </button>
        </div>
      )}
      <div className={customizing ? "rounded-lg ring-2 ring-dashed ring-[hsl(var(--elka-red))]/40 ring-offset-2 ring-offset-background" : ""}>
        {children}
      </div>
    </div>
  );
}

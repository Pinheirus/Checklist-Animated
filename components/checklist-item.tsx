"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface Task {
  id: string;
  content: string;
  completed: boolean;
}

interface ChecklistItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function ChecklistItem({ task, onToggle, onDelete }: ChecklistItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group mb-2 flex items-center rounded-lg border bg-card p-3 shadow-sm transition-colors hover:bg-accent ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-3 cursor-grab text-muted-foreground"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      
      <Checkbox
        checked={task.completed}
        onCheckedChange={onToggle}
        className="mr-3"
      />
      
      <motion.span
        layout
        className={`flex-1 text-sm ${
          task.completed
            ? "text-muted-foreground line-through"
            : "text-foreground"
        }`}
      >
        {task.content}
      </motion.span>
      
      <button
        onClick={onDelete}
        className="ml-2 hidden text-muted-foreground transition-colors hover:text-destructive group-hover:block"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
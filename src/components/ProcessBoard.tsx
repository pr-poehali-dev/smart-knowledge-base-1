import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type NodeType = "start" | "end" | "process" | "decision" | "document" | "connector";

interface BoardNode {
  id: string;
  type: NodeType;
  label: string;
  x: number;
  y: number;
  color: string;
}

interface BoardEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

interface ProcessBoardProps {
  onClose: () => void;
  onSave: (nodes: BoardNode[], edges: BoardEdge[]) => void;
  initialNodes?: BoardNode[];
  initialEdges?: BoardEdge[];
}

const nodeTypeConfig: Record<NodeType, { label: string; shape: string; color: string; icon: string }> = {
  start: { label: "Начало", shape: "rounded-full", color: "#10b981", icon: "Play" },
  end: { label: "Конец", shape: "rounded-full", color: "#ef4444", icon: "Square" },
  process: { label: "Процесс", shape: "rounded-lg", color: "#6366f1", icon: "Box" },
  decision: { label: "Решение", shape: "rotate-45", color: "#f59e0b", icon: "GitBranch" },
  document: { label: "Документ", shape: "rounded-lg", color: "#3b82f6", icon: "FileText" },
  connector: { label: "Разветвление", shape: "rounded-lg", color: "#8b5cf6", icon: "Share2" },
};

const aiProcessTemplates = [
  {
    name: "Онбординг сотрудника",
    nodes: [
      { id: "n1", type: "start" as NodeType, label: "Новый сотрудник", x: 100, y: 80, color: "#10b981" },
      { id: "n2", type: "process" as NodeType, label: "Оформление документов", x: 300, y: 80, color: "#6366f1" },
      { id: "n3", type: "decision" as NodeType, label: "Документы в порядке?", x: 500, y: 80, color: "#f59e0b" },
      { id: "n4", type: "process" as NodeType, label: "Обучение и инструктаж", x: 700, y: 80, color: "#6366f1" },
      { id: "n5", type: "process" as NodeType, label: "Испытательный срок", x: 900, y: 80, color: "#6366f1" },
      { id: "n6", type: "end" as NodeType, label: "Сотрудник принят", x: 1100, y: 80, color: "#ef4444" },
    ],
    edges: [
      { id: "e1", from: "n1", to: "n2" },
      { id: "e2", from: "n2", to: "n3" },
      { id: "e3", from: "n3", to: "n4", label: "Да" },
      { id: "e4", from: "n4", to: "n5" },
      { id: "e5", from: "n5", to: "n6" },
    ],
  },
  {
    name: "Согласование договора",
    nodes: [
      { id: "n1", type: "start" as NodeType, label: "Заявка на договор", x: 100, y: 150, color: "#10b981" },
      { id: "n2", type: "process" as NodeType, label: "Подготовка проекта", x: 300, y: 150, color: "#6366f1" },
      { id: "n3", type: "document" as NodeType, label: "Проект договора", x: 500, y: 150, color: "#3b82f6" },
      { id: "n4", type: "decision" as NodeType, label: "Согласовано?", x: 700, y: 150, color: "#f59e0b" },
      { id: "n5", type: "process" as NodeType, label: "Подписание", x: 900, y: 150, color: "#6366f1" },
      { id: "n6", type: "end" as NodeType, label: "Договор заключён", x: 1100, y: 150, color: "#ef4444" },
    ],
    edges: [
      { id: "e1", from: "n1", to: "n2" },
      { id: "e2", from: "n2", to: "n3" },
      { id: "e3", from: "n3", to: "n4" },
      { id: "e4", from: "n4", to: "n5", label: "Да" },
      { id: "e5", from: "n5", to: "n6" },
    ],
  },
  {
    name: "Обработка заявки клиента",
    nodes: [
      { id: "n1", type: "start" as NodeType, label: "Заявка клиента", x: 100, y: 200, color: "#10b981" },
      { id: "n2", type: "process" as NodeType, label: "Регистрация заявки", x: 300, y: 200, color: "#6366f1" },
      { id: "n3", type: "decision" as NodeType, label: "Тип заявки?", x: 500, y: 200, color: "#f59e0b" },
      { id: "n4", type: "process" as NodeType, label: "Обработка менеджером", x: 700, y: 120, color: "#6366f1" },
      { id: "n5", type: "process" as NodeType, label: "Обработка техподдержкой", x: 700, y: 280, color: "#6366f1" },
      { id: "n6", type: "process" as NodeType, label: "Ответ клиенту", x: 950, y: 200, color: "#8b5cf6" },
      { id: "n7", type: "end" as NodeType, label: "Заявка закрыта", x: 1150, y: 200, color: "#ef4444" },
    ],
    edges: [
      { id: "e1", from: "n1", to: "n2" },
      { id: "e2", from: "n2", to: "n3" },
      { id: "e3", from: "n3", to: "n4", label: "Продажи" },
      { id: "e4", from: "n3", to: "n5", label: "Техн." },
      { id: "e5", from: "n4", to: "n6" },
      { id: "e6", from: "n5", to: "n6" },
      { id: "e7", from: "n6", to: "n7" },
    ],
  },
];

let nodeCounter = 100;

export default function ProcessBoard({ onClose, onSave, initialNodes = [], initialEdges = [] }: ProcessBoardProps) {
  const [nodes, setNodes] = useState<BoardNode[]>(initialNodes);
  const [edges, setEdges] = useState<BoardEdge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [dragging, setDragging] = useState<{ id: string; ox: number; oy: number } | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const addNode = (type: NodeType) => {
    const cfg = nodeTypeConfig[type];
    nodeCounter++;
    const newNode: BoardNode = {
      id: `node-${nodeCounter}`,
      type,
      label: cfg.label,
      x: 200 + Math.random() * 300,
      y: 150 + Math.random() * 150,
      color: cfg.color,
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode.id);
  };

  const deleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.from !== id && e.to !== id));
    if (selectedNode === id) setSelectedNode(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (connectingFrom) {
      if (connectingFrom !== id) {
        const newEdge: BoardEdge = { id: `edge-${Date.now()}`, from: connectingFrom, to: id };
        setEdges((prev) => [...prev, newEdge]);
      }
      setConnectingFrom(null);
      return;
    }
    setSelectedNode(id);
    const node = nodes.find((n) => n.id === id)!;
    setDragging({ id, ox: e.clientX - node.x, oy: e.clientY - node.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    setNodes((prev) => prev.map((n) =>
      n.id === dragging.id
        ? { ...n, x: e.clientX - dragging.ox, y: e.clientY - dragging.oy }
        : n
    ));
  }, [dragging]);

  const handleMouseUp = () => setDragging(null);

  const startEditing = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    setEditingNode(id);
    setEditLabel(node.label);
  };

  const finishEditing = () => {
    if (!editingNode) return;
    setNodes((prev) => prev.map((n) => n.id === editingNode ? { ...n, label: editLabel } : n));
    setEditingNode(null);
  };

  const loadTemplate = (template: typeof aiProcessTemplates[0]) => {
    setNodes(template.nodes);
    setEdges(template.edges);
    setShowAiPanel(false);
  };

  const generateWithAI = async () => {
    if (!aiTopic.trim()) return;
    setAiGenerating(true);
    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 2000));
    // Use first template as demo AI result
    const tpl = aiProcessTemplates[0];
    setNodes(tpl.nodes.map((n) => ({ ...n, label: n.label })));
    setEdges(tpl.edges);
    setAiGenerating(false);
    setShowAiPanel(false);
  };

  // Calculate edge path between nodes
  const getEdgePath = (from: BoardNode, to: BoardNode) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const mx = from.x + dx / 2;
    return `M ${from.x + 60} ${from.y + 20} C ${mx} ${from.y + 20} ${mx} ${to.y + 20} ${to.x} ${to.y + 20}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Icon name="GitBranch" className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Доска бизнес-процессов</span>
        </div>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        {/* Node types */}
        <div className="flex items-center gap-1 flex-wrap">
          {(Object.entries(nodeTypeConfig) as [NodeType, typeof nodeTypeConfig[NodeType]][]).map(([type, cfg]) => (
            <button
              key={type}
              onClick={() => addNode(type)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all hover:shadow-sm"
              style={{
                backgroundColor: cfg.color + "15",
                borderColor: cfg.color + "40",
                color: cfg.color,
              }}
              title={`Добавить: ${cfg.label}`}
            >
              <Icon name={cfg.icon as "Play"} className="w-3 h-3" />
              {cfg.label}
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        {/* Tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setConnectingFrom(connectingFrom ? null : "select")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
              connectingFrom
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            )}
          >
            <Icon name="ArrowRight" className="w-3 h-3" />
            {connectingFrom ? "Выберите цель..." : "Соединить"}
          </button>
        </div>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        {/* AI */}
        <button
          onClick={() => setShowAiPanel(!showAiPanel)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
        >
          <Icon name="Sparkles" className="w-3 h-3" />
          Создать с ИИ
        </button>

        <div className="ml-auto flex items-center gap-2">
          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <Icon name="ZoomOut" className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(2, z + 0.1))} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <Icon name="ZoomIn" className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => { setNodes([]); setEdges([]); }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
            title="Очистить доску"
          >
            <Icon name="Trash2" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSave(nodes, edges)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Icon name="Save" className="w-3.5 h-3.5" />
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Icon name="X" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Panel */}
      {showAiPanel && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Icon name="Sparkles" className="w-4 h-4 text-violet-600" />
            Генерация бизнес-процесса с помощью ИИ
          </p>
          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-64">
              <label className="block text-xs text-gray-500 mb-1">Опишите процесс</label>
              <input
                value={aiTopic}
                onChange={(e) => setAiTopic(e.target.value)}
                placeholder="Например: процесс найма сотрудника, обработка претензии клиента..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <button
              onClick={generateWithAI}
              disabled={aiGenerating || !aiTopic.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-colors"
            >
              {aiGenerating ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 animate-spin" />
                  Генерирую...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="w-4 h-4" />
                  Создать
                </>
              )}
            </button>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Или выберите готовый шаблон:</p>
            <div className="flex gap-2 flex-wrap">
              {aiProcessTemplates.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => loadTemplate(tpl)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 rounded-lg transition-colors border border-gray-200"
                >
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={boardRef}
        className="flex-1 overflow-hidden relative bg-gray-50 cursor-default"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Icon name="GitBranch" className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">Доска пустая</p>
              <p className="text-gray-400 text-sm mt-1">Добавьте блоки из панели инструментов или создайте с ИИ</p>
            </div>
          </div>
        )}

        <div style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: "0 0" }}>
          {/* SVG edges */}
          <svg
            ref={svgRef}
            className="absolute inset-0 pointer-events-none"
            style={{ width: "3000px", height: "2000px" }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M 0 0 L 6 3 L 0 6 z" fill="#6366f1" />
              </marker>
            </defs>
            {edges.map((edge) => {
              const from = nodes.find((n) => n.id === edge.from);
              const to = nodes.find((n) => n.id === edge.to);
              if (!from || !to) return null;
              return (
                <g key={edge.id}>
                  <path
                    d={getEdgePath(from, to)}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    opacity="0.7"
                  />
                  {edge.label && (
                    <text
                      x={(from.x + to.x) / 2 + 60}
                      y={(from.y + to.y) / 2 + 15}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#6366f1"
                      fontWeight="600"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const cfg = nodeTypeConfig[node.type];
            const isSelected = selectedNode === node.id;
            const isEditing = editingNode === node.id;
            return (
              <div
                key={node.id}
                className="absolute select-none"
                style={{ left: node.x, top: node.y }}
                onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              >
                <div
                  className={cn(
                    "relative flex flex-col items-center justify-center px-4 py-2.5 shadow-md cursor-grab active:cursor-grabbing transition-all",
                    node.type === "start" || node.type === "end" ? "rounded-full min-w-[80px]" : "rounded-xl min-w-[120px]",
                    isSelected ? "ring-2 ring-offset-2" : ""
                  )}
                  style={{
                    backgroundColor: node.color + "20",
                    border: `2px solid ${node.color}`,
                    ringColor: node.color,
                    minWidth: node.type === "start" || node.type === "end" ? "80px" : "120px",
                  }}
                >
                  <Icon name={cfg.icon as "Play"} className="w-4 h-4 mb-0.5" style={{ color: node.color }} />
                  {isEditing ? (
                    <input
                      autoFocus
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onBlur={finishEditing}
                      onKeyDown={(e) => e.key === "Enter" && finishEditing()}
                      className="text-xs text-center bg-transparent outline-none w-24 font-medium"
                      style={{ color: node.color }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span
                      className="text-xs font-semibold text-center leading-tight max-w-[100px]"
                      style={{ color: node.color }}
                      onDoubleClick={() => startEditing(node.id)}
                    >
                      {node.label}
                    </span>
                  )}

                  {/* Node actions */}
                  {isSelected && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white rounded-lg shadow-md border border-gray-200 px-1.5 py-1">
                      <button
                        onClick={() => startEditing(node.id)}
                        className="p-0.5 text-gray-500 hover:text-indigo-600 rounded"
                        title="Редактировать"
                      >
                        <Icon name="Edit2" className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => { setConnectingFrom(node.id); setSelectedNode(null); }}
                        className="p-0.5 text-gray-500 hover:text-emerald-600 rounded"
                        title="Соединить"
                      >
                        <Icon name="ArrowRight" className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteNode(node.id)}
                        className="p-0.5 text-gray-500 hover:text-red-600 rounded"
                        title="Удалить"
                      >
                        <Icon name="Trash2" className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connecting hint */}
        {connectingFrom && connectingFrom !== "select" && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="ArrowRight" className="w-4 h-4" />
            Кликните по целевому блоку для соединения
            <button onClick={() => setConnectingFrom(null)} className="ml-2 text-white/70 hover:text-white">
              <Icon name="X" className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom info */}
      <div className="bg-white border-t border-gray-100 px-4 py-2 flex items-center gap-4 text-xs text-gray-400">
        <span>{nodes.length} блоков</span>
        <span>·</span>
        <span>{edges.length} связей</span>
        <span>·</span>
        <span>Двойной клик — редактировать</span>
        <span>·</span>
        <span>Перетащите блок для перемещения</span>
      </div>
    </div>
  );
}

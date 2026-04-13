import type { Template } from "../../../types/templateTypes";

type Props = {
  item: Template;
  onUse: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

function IconBtn({
  children,
  label,
  onClick,
  danger = false,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`cursor-pointer w-8 h-8 rounded-lg border grid place-items-center bg-white
      ${danger ? "border-[#fecaca]" : "border-[#e5e7eb]"} `}
    >
      {children}
    </button>
  );
}

export default function TemplateCard({
  item,
  onUse,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white border border-[#ececec] rounded-2xl overflow-hidden shadow-sm">
      <div className="h-[210px] w-full bg-[#f3f4f6]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="text-[16px] font-extrabold text-[#111827]">
          {item.title}
        </div>
        <div className="text-[12px] text-[#6b7280] mt-0">
          {item.fieldsText}
        </div>

        <div className="mt-2 flex items-center justify-between text-[12px] text-[#6b7280]">
          
          <div>{item.date}</div>
        </div>

        <div className="w-full h-[1px] bg-gray-500 my-4"></div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onUse(item.id)}
            className="cursor-pointer flex-1 h-8 rounded-lg bg-[#eef2ff] text-[#374151] font-medium text-[12px]"
          >
            Use Template
          </button>

          <IconBtn label="Edit" onClick={() => onEdit(item.id)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20h9"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconBtn>

          <IconBtn label="Delete" onClick={() => onDelete(item.id)} danger>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 6V4h8v2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 6l1 16h8l1-16" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
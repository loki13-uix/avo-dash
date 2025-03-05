export function DropIndicator() {
  return (
    <div
      className={`
        absolute z-10 pointer-events-none
        w-full
        bg-grey-2
        h-2 rounded-md
        left-0 right-0
        border border-dashed border-purple-primary
        before:content-['']
        before:absolute before:inset-0
        before:bg-grey-2
        before:blur-[6px] before:opacity-70
      `}
    />
  )
}

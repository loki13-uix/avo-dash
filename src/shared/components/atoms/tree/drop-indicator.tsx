import type { Edge } from '@/shared/components/atoms/tree';
import type { CSSProperties, HTMLAttributes } from 'react';

type Orientation = 'horizontal' | 'vertical';

const edgeToOrientationMap: Record<Edge, Orientation> = {
	top: 'horizontal',
	bottom: 'horizontal',
	left: 'vertical',
	right: 'vertical',
};

const orientationStyles: Record<
	Orientation,
	HTMLAttributes<HTMLElement>['className']
> = {
	horizontal: 'h-[4px] left-0 right-0',
	vertical: 'w-[4px] top-0 bottom-0',
};

const edgeStyles: Record<Edge, HTMLAttributes<HTMLElement>['className']> = {
	top: 'top-[--line-offset]',
	right: 'right-[--line-offset]',
	bottom: 'bottom-[--line-offset]',
	left: 'left-[--line-offset]',
};

/**
 * Glowing drop indicator with dotted border
 */
export function DropIndicator({ edge, gap }: { edge: Edge; gap: string }) {
	const lineOffset = `calc(-0.5 * ${gap})`;
	const orientation = edgeToOrientationMap[edge];

	return (
		<div
			style={
				{
					'--line-offset': lineOffset,
				} as CSSProperties
			}
			className={`
        absolute z-10 pointer-events-none
		max-w-96
        bg-grey-2
        h-2 rounded-md
        ${orientationStyles[orientation]} 
        ${edgeStyles[edge]}
        border border-dotted border-purple-primary
        before:content-['']
        before:absolute before:inset-0
        before:bg-grey-2
        before:blur-[6px] before:opacity-70
      `}
		/>
	);
}

'use client';
import type React from 'react';
import type { IconName } from '@/constants/icons';
import { iconRegistry } from '@/constants/icons';
import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName;
	size?: number | string;
	color?: string;
	style?: React.CSSProperties;
}
export const Icon: React.FC<IconProps> = ({
	name,
	size,
	color,
	className,
	style,
	...props
}) => {
	const IconComponent = iconRegistry.get(name);

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}

	return (
		<IconComponent
			width={size}
			height={size}
			fill={color}
			className={cn('icon inline-block align-middle', className)}
			style={style}
			{...props}
		/>
	);
};

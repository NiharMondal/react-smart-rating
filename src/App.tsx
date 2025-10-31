"use client";
import React, { useState, useRef } from "react";
import { Star } from "lucide-react";

export interface RatingStarProps {
	totalStars?: number;
	initialRating?: number;
	readOnly?: boolean;
	onChange?: (rating: number) => void;
	icon?: React.ElementType;
	activeColor?: string;
	inactiveColor?: string;
	size?: number;
	step?: number; // e.g., 0.5 or 0.1
}

export const ReactSmartRating: React.FC<RatingStarProps> = ({
	totalStars = 5,
	initialRating = 0,
	readOnly = false,
	onChange,
	icon: Icon = Star,
	activeColor = "#facc15",
	inactiveColor = "#d1d5db",
	size = 24,
	step = 0.5,
}) => {
	const [hovered, setHovered] = useState<number | null>(null);
	const [rating, setRating] = useState(initialRating);
	const containerRef = useRef<HTMLDivElement>(null);

	const roundToPrecision = (value: number) => {
		const res = Math.round(value / step) * step;

		return parseFloat(res.toFixed(2));
	};

	const handleClick = (
		event: React.MouseEvent<HTMLDivElement>,
		index: number
	) => {
		if (readOnly) return;

		const rect = event.currentTarget.getBoundingClientRect();
		const clickX = event.clientX - rect.left;
		const width = rect.width;

		const fraction = clickX / width;
		const newRating = roundToPrecision(index - 1 + fraction);

		setRating(newRating);
		onChange?.(newRating);
	};

	const handleMouseMove = (
		event: React.MouseEvent<HTMLDivElement>,
		index: number
	) => {
		if (readOnly) return;

		const rect = event.currentTarget.getBoundingClientRect();
		const moveX = event.clientX - rect.left;
		const width = rect.width;

		const fraction = moveX / width;
		const hoverValue = roundToPrecision(index - 1 + fraction);
		setHovered(hoverValue);
	};

	const handleMouseLeave = () => {
		if (readOnly) return;
		setHovered(null);
	};

	const displayRating = hovered ?? rating;

	return (
		<div
			ref={containerRef}
			className="flex items-center space-x-1 select-none"
		>
			{Array.from({ length: totalStars }, (_, i) => {
				const index = i + 1;
				const diff = displayRating - index;
				let fillPercentage = 0;

				if (diff >= 0) fillPercentage = 100;
				else if (diff > -1) fillPercentage = (displayRating - i) * 100;

				return (
					<div
						key={index}
						className="relative inline-block"
						onMouseMove={(e) => handleMouseMove(e, index)}
						onMouseLeave={handleMouseLeave}
						onClick={(e) => handleClick(e, index)}
						style={{
							width: size,
							height: size,
							cursor: readOnly ? "default" : "pointer",
						}}
					>
						{/* Inactive icon */}
						<Icon
							size={size}
							color={inactiveColor}
							className="absolute top-0 left-0"
						/>

						{/* Active overlay (fractionally clipped) */}
						<div
							className="absolute top-0 left-0 overflow-hidden"
							style={{
								width: `${fillPercentage}%`,
								height: "100%",
							}}
						>
							<Icon
								size={size}
								color={activeColor}
								fill={activeColor}
								className="absolute top-0 left-0"
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ReactSmartRating;
